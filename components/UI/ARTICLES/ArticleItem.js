import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Layout, Text, Button } from '@ui-kitten/components'

const ArticleItem = ({ article }) => {
    return (
        <Layout style={styles.card}>
            <TouchableOpacity>
                <Layout style={styles.cardImageBox}>
                    <Image
                        style={styles.cardImage}
                        source={{ uri: article.image }}
                        resizeMode="cover"
                    />
                </Layout>
                <Text category="h5" style={styles.cardTitle}>
                    {article.name}
                </Text>
                <Layout style={styles.cardDetails}>
                    <Layout style={styles.cardDetailsRow}>
                        <Text category="s2">ID:</Text>
                        <Text category="s2">{article.articleId}</Text>
                    </Layout>
                    <Layout style={styles.cardDetailsRow}>
                        <Text category="s2">BROJ:</Text>
                        <Text category="s2">{article.number}</Text>
                    </Layout>
                    <Layout style={styles.cardDetailsRow}>
                        <Text category="s2">ŠIFRA:</Text>
                        <Text category="s2">{article.codedNumber}</Text>
                    </Layout>
                </Layout>
                <Button style={styles.cardBtn}>
                    VIŠE
                </Button>
            </TouchableOpacity>
        </Layout>
    )
}

export default ArticleItem

const styles = StyleSheet.create({
    card: {
        height: 320,
        width: 180,
        margin: 10,
        borderRadius: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#eee'
    },
    cardImageBox: {
        width: '100%',
        height: '55%'
    },
    cardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15
    },
    cardContent: {
        minHeight: '45%'
    },
    cardTitle: {
        textAlign: 'center'
    },
    cardDetailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardBtn: {
        marginTop: 8
    }
})