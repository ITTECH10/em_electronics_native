import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'

const ForgotPasswordScreen = () => {
    return (
        <Layout style={styles.screen}>
            <Text>ForgotPasswordScreen</Text>
        </Layout>
    )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
