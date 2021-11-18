import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'

const SignupScreen = () => {
    return (
        <Layout style={styles.screen}>
            <Text>SignupScreen</Text>
        </Layout>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
