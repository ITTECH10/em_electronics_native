import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { Layout } from '@ui-kitten/components'
import { renderSettingsScreenItem } from '../../components/UI/PROFILE/SettingsScreenItem'
import SettingsItemDataProvider from '../../utils/DataProviders/SettingsItemDataProvider'
import Logout from '../../components/UI/AGNOSTIC/Logout'

const DATA = new SettingsItemDataProvider().getData()

const SettingsScreen = ({ navigation }) => {
    return (
        <Layout style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={renderSettingsScreenItem}
                key={item => item.id}
            />
            <Logout navigation={navigation} />
        </Layout >
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        // flex: 1
    }
})
