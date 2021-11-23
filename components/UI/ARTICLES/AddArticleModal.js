import React from 'react'
import { StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Image } from 'react-native'
import { Layout, Text, Button, Input, useTheme } from '@ui-kitten/components'
import AdaptiveModal from './../../../constants/components/AdaptiveModal'
import AddArticle from './../../FEATURES/AddArticle'
import * as ImagePicker from 'expo-image-picker';
import { useAppContext } from './../../../context/AppContext'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'
const RESET_FORM_STATE = 'RESET_FORM_STATE'

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedInputValues = {
            ...state.inputValues,
            [action.input]: action.value
        }

        const updatedValidations = {
            ...state.inputValidations,
            [action.input]: action.isValid
        }

        let updatedFormIsValid = true

        for (let key in updatedValidations) {
            updatedFormIsValid = updatedFormIsValid && updatedValidations[key]
        }

        return {
            inputValues: updatedInputValues,
            inputValidations: updatedValidations,
            formIsValid: updatedFormIsValid
        }
    }

    if (action.type === RESET_FORM_STATE) {
        return {
            inputValues: {
                articleId: '',
                name: '',
                number: '',
                codedNumber: ''
            },
            inputValidations: {
                articleId: false,
                name: false,
                number: false,
                codedNumber: false
            },
            formIsValid: false
        }
    }

    return state
}

const AddArticleModal = ({ modalOpen, setModalOpen }) => {
    const { connectionStatus, articles, setArticles } = useAppContext()

    const [image, setImage] = React.useState(null);
    const [base64Image, setBase64Image] = React.useState(null);
    const theme = useTheme()

    const [formState, dispatch] = React.useReducer(formReducer, {
        inputValues: {
            articleId: '',
            name: '',
            number: '',
            codedNumber: ''
        },
        inputValidations: {
            articleId: false,
            name: false,
            number: false,
            codedNumber: false
        },
        formIsValid: false
    })

    const resetStateHandler = () => {
        dispatch({ type: RESET_FORM_STATE })
        setModalOpen(false)
        setImage(null)
    }

    const textChangeHandler = (inputIdentifier, text) => {
        let isValid = false

        if (text.trim().length > 0) {
            isValid = true
        } else {
            isValid = false
        }

        dispatch({
            type: 'FORM_INPUT_UPDATE',
            input: inputIdentifier,
            isValid: isValid,
            value: text
        })
    }

    const pickImageHandler = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Da biste dodali sliku artikla, morate omogućiti pristup vašoj galeriji!');
            } else {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    quality: 1,
                    base64: true
                });

                if (!result.cancelled) {
                    setImage(result.uri);
                    setBase64Image(`data:image/jpg;base64,${result.base64}`)
                }
            }
        }
    }

    const handleSubmit = async () => {
        // BASED ON CONNECTION STATUS DO NEXT THINGS
        // 1) IF THERE IS AN INTERNET CONNECTION STORE ARTICLE ON LOCAL DEVICE AND DB
        if (connectionStatus) {
            const data = new FormData();

            data.append('file', base64Image)
            data.append('upload_preset', 'dn9yispt3')
            data.append("cloud_name", "dn9yispt3")

            // STORE TO CLOUDINARY
            fetch("https://api.cloudinary.com/v1_1/dn9yispt3/upload", {
                method: "post",
                body: data
            }).then(res => res.json()).
                then(data => {
                    // STORE TO DB
                    if (data.secure_url) {
                        const postData = {
                            ...formState.inputValues,
                            image: data.secure_url
                        }

                        axios.post('/articles', postData).then(res => {
                            if (res.status === 201) {
                                setModalOpen(false)
                                setImage(null)
                                setBase64Image(null)
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    } else {
                        return
                    }
                }).catch(err => {
                    alert("An Error Occured While Uploading")
                    console.log(err)
                })
        }

        // 2) IF NOT STORE ONLY ON LOCAL DEVICE
        try {
            const localDeviceData = {
                ...formState.inputValues,
                image: image
            }

            // const jsonValue = JSON.stringify(localDeviceData)
            const updatedArticles = [...articles, localDeviceData]
            setArticles(updatedArticles)

            await AsyncStorage.setItem('articles', JSON.stringify(updatedArticles))
            setModalOpen(false)
            setImage(null)
        } catch (e) {
            console.log(e)
            alert('Dogodila se greška...')
        }
    }

    return (
        <>
            <AddArticle
                onPressHandler={() => setModalOpen(true)}
            />
            <AdaptiveModal
                visible={modalOpen}
                setVisible={resetStateHandler}
                style={styles.modal}
            >
                <Layout style={styles.formGroup}>
                    <Text
                        category="h5"
                        style={{ textAlign: 'center', marginBottom: 6 }}
                    >
                        Novi Artikal
                    </Text>
                    <ScrollView>
                        <KeyboardAvoidingView
                            behavior="padding"
                            keyboardVerticalOffset={260}
                        >
                            <Input
                                placeholder="ID Artikla"
                                keyboardType="numeric"
                                status={!formState.inputValidations.articleId ? 'danger' : 'basic'}
                                style={styles.input}
                                onChangeText={textChangeHandler.bind(this, 'articleId')}
                            />
                            <Input
                                placeholder="Naziv Artikla"
                                status={!formState.inputValidations.name ? 'danger' : 'basic'}
                                onChangeText={textChangeHandler.bind(this, 'name')}
                                style={styles.input}
                            />
                            <Input
                                placeholder="Broj Artikla"
                                status={!formState.inputValidations.number ? 'danger' : 'basic'}
                                onChangeText={textChangeHandler.bind(this, 'number')}
                                style={styles.input}
                                keyboardType="numeric"
                            />
                            <Input
                                placeholder="Šifra Artikla"
                                status={!formState.inputValidations.codedNumber ? 'danger' : 'basic'}
                                onChangeText={textChangeHandler.bind(this, 'codedNumber')}
                                style={styles.input}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                    <Button
                        size="medium"
                        style={styles.addImageBtn}
                        onPress={pickImageHandler}
                    >
                        {!image ? 'DODAJ SLIKU' : 'PROMJENI SLIKU'}
                    </Button>
                    <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        {image && <Text category="h6" style={{ textAlign: 'center', fontFamily: 'roboto-bold', marginBottom: 5 }}>Izabrana slika</Text>}
                        {image && <Image source={{ uri: image }} style={{ width: '100%', height: 200, borderRadius: 13, marginBottom: 10 }} resizeMode="stretch" />}
                    </Layout>
                    <Layout style={styles.modalActions}>
                        <Button
                            size="medium"
                            style={{ ...styles.btn, backgroundColor: theme['color-danger-700'] }}
                            onPress={resetStateHandler}
                        >
                            IZAĐI
                        </Button>
                        <Button
                            size="medium"
                            status="info"
                            style={styles.btn}
                            disabled={!formState.formIsValid || !image}
                            onPress={handleSubmit}
                        >
                            GOTOVO
                        </Button>
                    </Layout>
                </Layout>
            </AdaptiveModal>
        </>
    )
}

export default AddArticleModal

const styles = StyleSheet.create({
    modal: {
        width: 350
    },
    formGroup: {
        padding: 20
    },
    input: {
        marginBottom: 10
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn: {
        width: '48%',
        borderWidth: 0
    },
    addImageBtn: {
        marginBottom: 10
    }
})
