import React, { useContext } from 'react'
import { clearAll, getGeneralData } from './../utils/StoreToStorage'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

const AppContext = React.createContext()

export const useAppContext = () => {
    return useContext(AppContext)
}

const AppContextProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = React.useState(false)
    const [generalAppLoading, setGeneralAppLoading] = React.useState(false)
    const [token, setToken] = React.useState()

    const logout = () => {
        clearAll()
        setToken(undefined)
        setGeneralAppLoading(true)

        setTimeout(() => {
            setAuthenticated(false)
            setGeneralAppLoading(false)
        }, 2000)
    }

    const checkForToken = React.useCallback(async () => {
        const foundToken = await getGeneralData('token')
        if (!foundToken) return

        if (foundToken) {
            const decodedToken = jwtDecode(foundToken)
            setToken(foundToken)

            if (new Date(decodedToken.exp) * 1000 < new Date()) {
                logout()
            }

            axios.defaults.headers.common['Authorization'] = foundToken
            setAuthenticated(true)
        }
    }, [token])

    const value = {
        authenticated,
        setAuthenticated,
        setToken,
        logout,
        generalAppLoading,
        checkForToken
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
