import React from 'react'
import { StyleSheet } from 'react-native'
import { Modal } from '@ui-kitten/components'

const AdaptiveModal = ({ children, visible, setVisible, style }) => {
    return (
        <Modal
            visible={visible}
            setVisible={setVisible}
            style={{ ...styles.modal, ...style }}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}
        >
            {children}
        </Modal>
    )
}

export default AdaptiveModal

const styles = StyleSheet.create({
    modal: {},
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, .5)'
    }
})
