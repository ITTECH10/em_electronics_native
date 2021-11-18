import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'

const ResetPasswordScreen = () => {
    return (
        <Layout style={styles.screen}>
            <Text>ResetPasswordScreen</Text>
        </Layout>
    )
}

export default ResetPasswordScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
