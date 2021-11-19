import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Icon, useTheme } from '@ui-kitten/components'

export const PlusIcon = (props) => (
    <Icon {...props}
        name="file-plus"
        pack="material-community"
        style={[props.style, { width: 25, height: 25 }]}
    />
)

const AddArticle = () => {
    const theme = useTheme()

    return <Button
        accessoryRight={PlusIcon}
        style={{ ...styles.button }}
        status="info"
    />
}

export default AddArticle

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 120,
        position: 'absolute',
        bottom: 10,
        right: 15,
        borderWidth: 0
    }
})
