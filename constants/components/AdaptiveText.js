import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, useTheme } from '@ui-kitten/components'

const AdaptiveText = (props) => {
    const theme = useTheme()

    return (
        <Text
            {...props}
            style={{ ...props.style, ...styles.root, color: props.color ? props.color : theme['color-basic-default'] }}
        >
            {props.children}
        </Text>
    )
}

export default AdaptiveText

const styles = StyleSheet.create({
    root: {}
})
