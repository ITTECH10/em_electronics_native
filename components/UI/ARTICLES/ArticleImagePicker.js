import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from '@ui-kitten/components'

const ArticleImagePicker = () => {
    return <Button
        size="medium"
        style={styles.addImageBtn}
    >
        DODAJ SLIKU
    </Button>
}

export default ArticleImagePicker

const styles = StyleSheet.create({
    addImageBtn: {
        marginBottom: 10
    }
})
