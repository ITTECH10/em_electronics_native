import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from '@ui-kitten/components'
import { useAppContext } from './../../../context/AppContext'

const Logout = () => {
    const { logout } = useAppContext()

    return (
        <Button
            appearance="ghost"
            size="medium"
            onPress={logout}
        >
            ODJAVA
        </Button>
    )
}

export default Logout

const styles = StyleSheet.create({})
