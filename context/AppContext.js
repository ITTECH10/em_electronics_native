import React, { useContext } from 'react'

const AppContext = React.createContext()

export const useAppContext = () => {
    return useContext(AppContext)
}

const AppContextProvider = ({ children }) => {
    const value = {
        authenticated: true
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
