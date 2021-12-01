import React from 'react'
import { StyleSheet } from 'react-native'
import { Input, useTheme } from '@ui-kitten/components'

const AdaptiveInput = (props) => {
    const theme = useTheme()
    const { changeTextHandler, initialColor = '#fff', icon, severity, style } = props
    const [inputColor, setInputColor] = React.useState(initialColor)

    return (
        <Input
            style={{ ...styles.input, ...style, borderColor: inputColor, backgroundColor: initialColor }}
            accessoryRight={icon}
            onChangeText={changeTextHandler}
            onFocus={() => setInputColor(theme[severity])}
            onBlur={() => setInputColor(initialColor)}
            {...props}
        />
    )
}

export default AdaptiveInput

const styles = StyleSheet.create({
    input: {}
})
