import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Input } from '@ui-kitten/components'
import { SearchIcon } from '../UI/ICONS/icons'

const SearchArticles = () => {
    return (
        <Layout style={styles.container}>
            <Input
                placeholder="Pretražite artikle..."
                accessoryRight={SearchIcon}
                size="large"
            />
        </Layout>
    )
}

export default SearchArticles

const styles = StyleSheet.create({
    container: {}
})
