import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import ArticleItem from './ArticleItem'
// import ArticleDataProvider from './../../../utils/DataProviders/ArticleDataProvider'
// const articleData = new ArticleDataProvider().getArticles()

const ArticleList = ({ articles }) => {

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
