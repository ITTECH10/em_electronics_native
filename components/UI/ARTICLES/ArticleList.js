import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import ArticleItemAlternativeOne from './ArticleItemAlternativeOne'
import AdaptiveModal from './../../../constants/components/AdaptiveModal'
import { Layout, Text, Button } from '@ui-kitten/components'
// import ArticleDataProvider from './../../../utils/DataProviders/ArticleDataProvider'
// const articleData = new ArticleDataProvider().getArticles()
import AsyncStorage from '@react-native-async-storage/async-storage';

const ArticleList = ({ articles, setArticles }) => {
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false)
    const [selectedArticle, setSelectedArticle] = React.useState({})

    const deleteArticleHandler = async () => {
        try {
            const updatedArticles = articles.filter(article => article.articleId !== selectedArticle.articleId)
            await AsyncStorage.setItem('articles', JSON.stringify(updatedArticles))

            setArticles(updatedArticles)
            setDeleteModalOpen(false)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <AdaptiveModal
                visible={deleteModalOpen}
                setVisible={setDeleteModalOpen}
                style={{ width: '80%' }}
            >
                <Layout style={{ padding: 10 }}>
                    <Text style={{ textAlign: 'center' }} category="s2">
                        Upozorenje! Ako obrišete ovaj artikal nemate mogućnost
                        da ga povratite!
                    </Text>

                    <Layout style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                        <Button status="danger" style={{ marginRight: 5 }} onPress={deleteArticleHandler}>
                            OBRIŠI
                        </Button>
                        <Button status="info" onPress={() => setDeleteModalOpen(false)}>
                            NAZAD
                        </Button>
                    </Layout>
                </Layout>
            </AdaptiveModal>
            <FlatList
                data={articles}
                keyExtractor={item => item.articleId}
                // numColumns={2}
                renderItem={itemData =>
                    <ArticleItemAlternativeOne
                        article={itemData.item}
                        modalOpen={deleteModalOpen}
                        setModalOpen={setDeleteModalOpen}
                        setSelectedArticle={setSelectedArticle}
                    />}
            />
        </>
    )
}

export default ArticleList

const styles = StyleSheet.create({

})
