import React from 'react'
import { StyleSheet } from 'react-native'
import { useTheme, Layout } from '@ui-kitten/components'

const PrimaryColorView = ({ children, style }) => {
    const theme = useTheme()

    return (
        <Layout style={{ ...style, backgroundColor: theme['color-primary-default'] }}>
            {children}
        </Layout>
    )
}

export default PrimaryColorView

const styles = StyleSheet.create({
    container: {}
})
