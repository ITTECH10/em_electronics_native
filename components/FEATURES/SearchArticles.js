import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Input } from '@ui-kitten/components'
import { SearchIcon } from '../UI/ICONS/icons'

const SearchArticles = ({ setQuery }) => {
    return (
        <Layout style={styles.container}>
            <Input
                placeholder="Pretražite artikle..."
                accessoryRight={SearchIcon}
                size="large"
                onChangeText={(text) => setQuery(text)}
            />
        </Layout>
    )
}

export default SearchArticles

const styles = StyleSheet.create({
    container: {}
})
