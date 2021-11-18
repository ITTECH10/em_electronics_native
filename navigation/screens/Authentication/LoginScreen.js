import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'

const LoginScreen = () => {
    return (
        <Layout style={styles.screen}>
            <Text>LoginScreen</Text>
        </Layout>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
