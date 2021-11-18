import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'

const MyProfileScreen = () => {
    return (
        <Layout style={styles.screen}>
            <Text>MyProfileScreen</Text>
        </Layout>
    )
}

export default MyProfileScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
