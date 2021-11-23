import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import ArticleItem from './ArticleItem'
// import ArticleDataProvider from './../../../utils/DataProviders/ArticleDataProvider'
import { useAppContext } from './../../../context/AppContext'

// const articleData = new ArticleDataProvider().getArticles()

const ArticleList = () => {
    const { articles } = useAppContext()

    return (
        <FlatList
            data={articles}
            keyExtractor={item => item.articleId}
            numColumns={2}
            renderItem={itemData =>
                <ArticleItem
                    article={itemData.item}
                />}
        />
    )
}

export default ArticleList

const styles = StyleSheet.create({})
