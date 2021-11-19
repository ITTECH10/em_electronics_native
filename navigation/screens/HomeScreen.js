import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout } from '@ui-kitten/components'
import ArticleList from './../../components/UI/ARTICLES/ArticleList'
import SearchArticles from './../../components/FEATURES/SearchArticles'
import AddArticle from './../../components/FEATURES/AddArticle'

const HomeScreen = () => {
    return (
        <Layout style={styles.screen}>
            <SearchArticles />
            <ArticleList />
            <AddArticle />
        </Layout>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        margin: 5
    }
})
