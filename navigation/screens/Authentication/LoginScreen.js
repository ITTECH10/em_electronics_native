import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { Button, Layout, Input, useTheme } from '@ui-kitten/components'
import AdaptiveText from '../../../constants/components/AdaptiveText'
import Alert from '../../../constants/components/Alert'
import { useAppContext } from '../../../context/AppContext'
import axios from 'axios'
// import { storeString } from './../../../utils/StoreDataToStorage'

const LoginScreen = ({ navigation }) => {
    const theme = useTheme()
    // const { setAuthenticated, setToken } = useAppContext()
    const [errors, setErrors] = React.useState({
        message: ''
    })

    const [fields, setFields] = React.useState({
        email: '',
        password: ''
    })

    const handleChange = (name) => (value) => {
        setFields({ ...fields, [name]: value });
    };

    const loginHandler = () => {
        // setGeneralAppLoading(true)
        const data = { ...fields }

        axios.post('/users/login', data)
            .then(async res => {
                if (res.status === 201) {
                    // setAuthenticated(true)
                    // await storeString('token', res.data.token)
                    // setToken(res.data.token)
                }
            }).catch(err => {
                setErrors({
                    message: err.response.data.message
                })
                console.log(err)
            })
    }

    return (
        <Layout style={{ flex: 1 }}>
            <Layout style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Layout style={{ width: '100%', height: 240, marginTop: 80 }}>
                    <Image resizeMode="contain" style={{ height: '100%', width: '100%' }} source={require('./../../../assets/images/app-logo.png')} />
                </Layout>

                <Layout style={{ width: '80%', marginTop: 20, justifyContent: 'flex-end' }}>
                    <Layout>
                        <Alert
                            message={errors.message}
                            setMessage={setErrors}
                            severity={theme['color-danger-600']}
                        />
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
                        <Button disabled={Object.values(fields).some(el => el === '')} size="medium" onPress={loginHandler}>
                            Prijava
                        </Button>
                        <AdaptiveText onPress={() => navigation.navigate('Signup')} style={{ textAlign: 'center', marginTop: 3 }} color={theme['color-primary-default']}>
                            Nemate račun? Registracija
                        </AdaptiveText>
                        <AdaptiveText
                            onPress={() => navigation.navigate('ForgotPassword')}
                            style={{ textAlign: 'center', marginTop: 3 }}
                            color={theme['color-primary-default']}>
                            Zaboravili ste lozinku?
                        </AdaptiveText>
                    </Layout>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})
