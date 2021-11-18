import React from 'react'
import { Layout, Spinner } from '@ui-kitten/components'

const LoadingIndicator = () => {
    return (
        <Layout style={{ flex: 1, flexWrap: 'nowrap', justifyContent: 'center', 'alignItems': 'center' }}>
            <Spinner size="giant" />
        </Layout>
    )
}

export default LoadingIndicator
