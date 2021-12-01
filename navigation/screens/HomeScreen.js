import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout } from '@ui-kitten/components'
import ArticleList from './../../components/UI/ARTICLES/ArticleList'
import AddArticleModal from '../../components/UI/ARTICLES/AddArticleModal'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppContext } from './../../context/AppContext'
import { SearchIcon } from './../../components/UI/ICONS/icons'
import AdaptiveInput from '../../constants/components/AdaptiveInput'

const HomeScreen = () => {
    const [modalOpen, setModalOpen] = React.useState(false)
    const { setArticles, articles } = useAppContext()
    const [searchQuery, setSearchQuery] = React.useState('')

    const queryChangeHandler = (text) => {
        setSearchQuery(text)
    }

    const loadLocalStoredArticles = React.useCallback(async () => {
        const jsonValue = await AsyncStorage.getItem('articles')
        if (jsonValue !== null) {
            setArticles(JSON.parse(jsonValue))
        }
    }, [])

    const queriedArticles = articles.filter(article => article.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) || article.codedNumber.toLowerCase().includes(searchQuery.toLowerCase().trim()))

    React.useEffect(() => {
        loadLocalStoredArticles()
        // if (connectionStatus) {
        //     getAllArticlesFromDb()
        // }
    }, [loadLocalStoredArticles])

    return (
        <Layout style={styles.screen}>
            <AdaptiveInput
                changeTextHandler={queryChangeHandler}
                severity='color-success-500'
                icon={SearchIcon}
                placeholder="Pretražite artikle..."
                size="large"
            />
            <ArticleList
                articles={searchQuery !== '' ? queriedArticles : articles}
                setArticles={setArticles}
            />
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
