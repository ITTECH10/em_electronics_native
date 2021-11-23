import React, { useContext } from 'react'
import NetInfo from '@react-native-community/netinfo';
import { clearAll, getGeneralData, removeFew } from './../utils/StoreToStorage'
// import jwtDecode from 'jwt-decode'
import axios from 'axios'

const AppContext = React.createContext()

export const useAppContext = () => {
    return useContext(AppContext)
}

const AppContextProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = React.useState(true)
    const [connectionStatus, setConnectionStatus] = React.useState()
    const [generalAppLoading, setGeneralAppLoading] = React.useState(false)
    const [token, setToken] = React.useState()
    const [articles, setArticles] = React.useState([])
    const [dbArticles, setDbArticles] = React.useState([])

    // console.log(serverState)

    // const DB_MISSING_ARTICLES = dbArticles.map(dbArticle => {
    //     return articles.filter(article => +dbArticle.articleId !== +article.articleId)
    // }).flat();

    const checkConnectionAvailability = React.useCallback(() => {
        return NetInfo.addEventListener(state => {
            const { isConnected } = state

            if (isConnected) {
                setConnectionStatus(true)
            } else {
                setConnectionStatus(false)
            }
        })
    }, [connectionStatus])

    const getAllArticlesFromDb = React.useCallback(() => {
        axios('/articles').then(res => {
            if (res.status === 200) {
                setDbArticles(res.data.articles)
            }
        }).catch(err => {
            // console.log(err)
        })
    }, [])

    const logout = () => {
        removeFew(['token'])
        setToken(undefined)
        setGeneralAppLoading(true)

        setTimeout(() => {
            setAuthenticated(false)
            setGeneralAppLoading(false)
        }, 2000)
    }

    // const checkForToken = React.useCallback(async () => {
    //     const foundToken = await getGeneralData('token')
    //     if (!foundToken) return

    //     if (foundToken) {
    //         const decodedToken = jwtDecode(foundToken)
    //         setToken(foundToken)

    //         if (new Date(decodedToken.exp) * 1000 < new Date()) {
    //             logout()
    //         }

    //         axios.defaults.headers.common['Authorization'] = foundToken
    //         setAuthenticated(true)
    //     }
    // }, [token])

    const value = {
        authenticated,
        setAuthenticated,
        setToken,
        logout,
        generalAppLoading,
        // checkForToken,
        checkConnectionAvailability,
        connectionStatus,
        articles,
        setArticles,
        dbArticles,
        setDbArticles,
        getAllArticlesFromDb
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
