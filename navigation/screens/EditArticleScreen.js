import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Text, Input, Button, useTheme } from '@ui-kitten/components'
import { useAppContext } from './../../context/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedInputValues = {
            ...state.inputValues,
            [action.input]: action.value
        }

        const updatedValidations = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }

        let updatedFormIsValid = true

        for (let key in updatedValidations) {
            updatedFormIsValid = updatedFormIsValid && updatedValidations[key]
        }

        return {
            inputValues: updatedInputValues,
            inputValidities: updatedValidations,
            formIsValid: updatedFormIsValid
        }
    }
}

const EditArticleScreen = ({ navigation, route }) => {
    const theme = useTheme()
    const [formState, dispatch] = React.useReducer(formReducer, {
        inputValues: {
            articleId: '',
            name: '',
            number: '',
            codedNumber: ''
        },
        inputValidities: {
            articleId: false,
            name: false,
            number: false,
            codedNumber: false
        },
        formIsValid: false
    })

    const { articles, setArticles } = useAppContext()
    const foundArticleId = route.params.articleId
    const foundArticleIndex = articles.findIndex(article => article.articleId === foundArticleId)

    const updatedArticles = [...articles]
    const foundArticle = updatedArticles[foundArticleIndex]

    const textChangeHandler = (inputIdentifier, text) => {
        let isValid = false

        if (text.trim().length > 0) {
            isValid = true
        } else {
            isValid = false
        }

        dispatch({
            type: FORM_INPUT_UPDATE,
            value: text,
            isValid,
            input: inputIdentifier
        })
    }

    const handleSubmit = async () => {
        try {
            const {
                articleId,
                name,
                number,
                codedNumber
            } = formState.inputValues

            foundArticle.articleId = articleId || foundArticle.articleId
            foundArticle.name = name || foundArticle.name
            foundArticle.number = number || foundArticle.number
            foundArticle.codedNumber = codedNumber || foundArticle.codedNumber

            await AsyncStorage.setItem('articles', JSON.stringify(updatedArticles))
            setArticles(updatedArticles)
            navigation.goBack()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Layout style={styles.screen}>
            <Layout style={styles.container}>
                <Layout style={styles.formGroup}>
                    <Layout style={{ ...styles.formHeader, backgroundColor: theme['color-success-500'] }}>
                        <Text
                            category="h6"
                            style={{ color: theme['color-basic-100'] }}
                        >
                            Izmjenite detalje artikla...
                        </Text>
                        <Text
                            style={{ color: theme['color-basic-100'], position: 'absolute', top: 5, right: 10 }}
                        >
                            X
                        </Text>
                    </Layout>

                    <Layout style={styles.content}>
                        <Input
                            placeholder={`ID: ${foundArticle.articleId}`}
                            disabled
                            style={{ ...styles.input, marginTop: 15 }}
                            status={!formState.inputValidities.articleId ? 'danger' : 'basic'}
                            onChangeText={textChangeHandler.bind(this, 'articleId')}
                        />
                        <Input
                            placeholder={`Naziv: ${foundArticle.name}`}
                            style={styles.input}
                            onChangeText={textChangeHandler.bind(this, 'name')}
                            status={!formState.inputValidities.name ? 'danger' : 'basic'}
                        />
                        <Input
                            placeholder={`Broj: ${foundArticle.number}`}
                            style={styles.input}
                            onChangeText={textChangeHandler.bind(this, 'number')}
                            status={!formState.inputValidities.number ? 'danger' : 'basic'}
                        />
                        <Input
                            placeholder={`Šifra: ${foundArticle.codedNumber}`}
                            style={styles.input}
                            onChangeText={textChangeHandler.bind(this, 'codedNumber')}
                            status={!formState.inputValidities.codedNumber ? 'danger' : 'basic'}
                        />
                    </Layout>

                    <Layout style={styles.formFooter}>
                        <Button
                            size="medium"
                            status="danger"
                            style={{ ...styles.cancelBtn, ...styles.footerBtn }}
                            onPress={() => navigation.navigate('Home')}
                        >
                            IZAĐI
                        </Button>
                        <Button
                            size="medium"
                            status="success"
                            style={{ ...styles.saveBtn, ...styles.footerBtn }}
                            onPress={handleSubmit}
                        // disabled={!formState.formIsValid}
                        >
                            GOTOVO
                        </Button>
                    </Layout>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default EditArticleScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    container: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20
    },
    formGroup: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 3,
        overflow: 'hidden'
    },
    formHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    content: {
        paddingHorizontal: 20
    },
    input: {
        marginBottom: 10
    },
    formFooter: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 5,
        paddingBottom: 15
    },
    footerBtn: {
        width: '35%',
        borderWidth: 0
    },
    cancelBtn: {
        marginRight: 5
    },
    saveBtn: {
        marginLeft: 5
    }
})
