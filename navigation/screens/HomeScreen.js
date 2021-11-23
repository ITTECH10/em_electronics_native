import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout } from '@ui-kitten/components'
import ArticleList from './../../components/UI/ARTICLES/ArticleList'
import SearchArticles from './../../components/FEATURES/SearchArticles'
import AddArticleModal from '../../components/UI/ARTICLES/AddArticleModal'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppContext } from './../../context/AppContext'

const HomeScreen = () => {
    const [modalOpen, setModalOpen] = React.useState(false)
    const { setArticles, getAllArticlesFromDb, connectionStatus } = useAppContext()

    const loadLocalStoredArticles = React.useCallback(async () => {
        const jsonValue = await AsyncStorage.getItem('articles')
        if (jsonValue !== null) {
            setArticles(JSON.parse(jsonValue))
        }
    }, [])

    React.useEffect(() => {
        loadLocalStoredArticles()
        if (connectionStatus) {
            getAllArticlesFromDb()
        }
    }, [loadLocalStoredArticles, getAllArticlesFromDb, connectionStatus])

    return (
        <Layout style={styles.screen}>
            <SearchArticles />
            <ArticleList />
            <AddArticleModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
            />
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
