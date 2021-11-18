import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout } from '@ui-kitten/components'
import AdaptiveText from './AdaptiveText'

const Alert = ({ message, setMessage, severity, style }) => {
    const [visible, setVisible] = React.useState(false)
    let alertTimeout

    React.useEffect(() => {
        setVisible(true)

        alertTimeout = setTimeout(() => {
            setVisible(false)

            // FOR ERROR ALERTS SUPPORT
            setMessage({
                message: ''
            })
        }, 5000)

        return () => {
            clearTimeout(alertTimeout)
        }
    }, [message])

    return (
        message !== '' && visible &&
        <Layout style={{ ...styles.content, ...style, backgroundColor: severity }}>
            <AdaptiveText>
                {message}
            </AdaptiveText>
        </Layout>
    )
}

export default Alert

const styles = StyleSheet.create({
    content: {
        minHeight: 50,
        marginBottom: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }
})
