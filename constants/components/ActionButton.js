import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, useTheme } from '@ui-kitten/components'

const ActionButton = ({ handlePress, icon, style, severity }) => {
    const theme = useTheme()

    return (
        <Button
            style={{
                ...styles.button,
                ...style,
                backgroundColor: theme[severity]
            }}
            onPress={handlePress}
            accessoryRight={icon}
        />
    )
}

export default ActionButton

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 120,
        position: 'absolute',
        bottom: 10,
        right: 10,
        borderWidth: 0
    }
})
