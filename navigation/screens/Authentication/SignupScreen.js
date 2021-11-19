import React from 'react'
import { StyleSheet, Image, ScrollView, KeyboardAvoidingView, Keyboard } from 'react-native'
import { Button, Layout, Input, useTheme, Select, SelectItem } from '@ui-kitten/components'
import AdaptiveText from '../../../constants/components/AdaptiveText'
import axios from 'axios'
import { useAppContext } from '../../../context/AppContext'
// import { storeString } from './../../../utils/StoreDataToStorage'
import Alert from '../../../constants/components/Alert'

const data = [
    'Muško',
    'Žensko'
]

const SignupScreen = ({ navigation }) => {
    // const { setAuthenticated, setToken } = useAppContext()
    const [keyboardVisible, setKeyboardVisible] = React.useState(false)
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0)
    const displayedItem = data[selectedItemIndex.row]

    const theme = useTheme()
    const [fields, setFields] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = React.useState({
        message: ''
    })

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const passwordEqualityHandler = (password, candidatePassword) => {
        return password === candidatePassword
    }

    React.useEffect(() => {
        const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(prevState => !prevState)
        })

        const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false)
        })

        return () => {
            keyboardDidShow.remove()
            keyboardDidHide.remove()
        }
    })

    const handleChange = (name) => (value) => {
        setFields({ ...fields, [name]: value });
    };

    const signupHandler = () => {
        const data = { ...fields, gender: displayedItem.toLowerCase() }
        if (!passwordEqualityHandler(data.password, data.confirmPassword)) {
            setErrors({
                message: 'Passwörter stimmen nicht überein!!'
            })
            return
        }

        if (!validateEmail(data.email)) {
            setErrors({
                message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein!'
            })
            return
        }

        axios.post('/users/signup', data)
            .then(async res => {
                if (res.status === 201) {
                    // setAuthenticated(true)
                    // await storeString('token', res.data.token)
                    // setToken(res.data.token)
                }
            }).catch(err => {
                if (err.response.data.error.isOperational) {
                    setErrors({
                        message: err.response.data.message
                    })
                }
                // console.log(err.response.data)
            })
    }

    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
                <Layout style={{ width: '100%', height: 240, marginTop: 70 }}>
                    <Image resizeMode="contain" style={{ height: '100%', width: '100%' }} source={require('./../../../assets/images/app-logo.png')} />
                </Layout>
                <KeyboardAvoidingView
                    enabled={keyboardVisible}
                    behavior="padding"
                    keyboardVerticalOffset={-360}
                >
                    <Layout style={{ width: '100%', marginTop: 20 }}>
                        <Alert
                            message={errors.message}
                            setMessage={setErrors}
                            severity={theme['color-danger-600']}
                        />
                        <Input
                            placeholder="Ime"
                            onChangeText={handleChange('firstName')}
                            size="large"
                            style={{ marginBottom: 10, width: "80%" }}
                        />
                        <Input
                            placeholder="Prezime"
                            onChangeText={handleChange('lastName')}
                            size="large"
                            style={{ marginBottom: 10 }}
                        />
                        <Select
                            placeholder="Spol"
                            size="large"
                            value={displayedItem}
                            selectedIndex={selectedItemIndex}
                            onSelect={index => setSelectedItemIndex(index)}
                            style={{ marginBottom: 10 }}
                        >
                            <SelectItem title="Muško" />
                            <SelectItem title="Žensko" />
                        </Select>
                        <Input
                            placeholder="E-mail"
                            onChangeText={handleChange('email')}
                            size="large"
                            style={{ marginBottom: 10 }}
                        />
                        <Input
                            placeholder="Lozinka"
                            onChangeText={handleChange('password')}
                            size="large"
                            style={{ marginBottom: 10 }}
                            secureTextEntry
                        />
                        <Input
                            placeholder="Potvrdite lozinku"
                            onChangeText={handleChange('confirmPassword')}
                            size="large"
                            style={{ marginBottom: 20 }}
                            secureTextEntry
                        />
                        <Button disabled={Object.values(fields).some(el => el === '' || !displayedItem)} size="medium" onPress={signupHandler}>
                            Prijava
                        </Button>
                        <AdaptiveText onPress={() => navigation.navigate('Login')} style={{ textAlign: 'center', marginTop: 3 }} color={theme['color-primary-default']}>
                            Već imate račun? Prijava
                        </AdaptiveText>
                    </Layout>
                </KeyboardAvoidingView>
            </ScrollView>
        </Layout >
    )
}

export default SignupScreen

const styles = StyleSheet.create({})
