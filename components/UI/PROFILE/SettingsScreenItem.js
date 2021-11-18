import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Layout, Text, Button } from '@ui-kitten/components'
import { RightArrowIcon } from '../ICONS/icons'
import { useNavigation } from '@react-navigation/native'

const SettingsScreenItem = ({ title, icon, screenName }) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigation.navigate(screenName)} style={styles.itemContainer}>
            <Layout style={styles.itemContainerFirstFlex}>
                <Button
                    appearance="ghost"
                    accessoryLeft={icon}
                    status="basic"
                    size="tiny"
                />
                <Text
                    category="s2"
                    style={styles.itemContainerTitle}
                >{title}
                </Text>
            </Layout>
            <Layout>
                <Button
                    appearance="ghost"
                    accessoryRight={RightArrowIcon}
                    status="basic"
                />
            </Layout>
        </TouchableOpacity>
    )
}

export const renderSettingsScreenItem = ({ item }) => (
    <SettingsScreenItem
        title={item.title}
        icon={item.icon}
        screenName={item.screenName}
    />
);

export default SettingsScreenItem

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        marginVertical: 8
    },
    itemContainerFirstFlex: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemContainerTitle: {
        marginBottom: 2
    }
})
