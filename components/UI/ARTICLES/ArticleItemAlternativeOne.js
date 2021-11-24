import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Layout, Button, Text, useTheme } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native';
import { DeleteIcon } from './../ICONS/icons'

const ArticleItemAlternativeOne = ({ article, modalOpen, setModalOpen, setSelectedArticle }) => {
    const theme = useTheme()
    const navigation = useNavigation()

    const articleSelectionHandler = (clickedArticle) => {
        setSelectedArticle(clickedArticle)
        setModalOpen(true)
    }

    return (
        <Layout style={styles.article}>
            <TouchableOpacity
                activeOpacity={.7}
                style={styles.articleContainer}
                onPress={() => navigation.navigate('ArticleDetails', { articleId: article.articleId })}
            >
                <Layout style={styles.articleRow}>
                    <Layout style={styles.articleImageBox}>
                        <Image
                            style={styles.articleImage}
                            source={{ uri: article.image }}
                            resizeMode="cover"
                        />
                    </Layout>
                    <Layout style={styles.articleContent}>
                        <Text
                            style={styles.articleTitleMain}
                            category="h5"
                            numberOfLines={2}
                            ellipsizeMode="tail"
                        >
                            {article.name}
                        </Text>
                        <Text
                            style={{ ...styles.articleTitleSub, color: theme['color-basic-500'] }}
                            category="s2"
                            numberOfLines={7}
                            ellipsizeMode="tail"
                        >
                            Šifra: {article.codedNumber}
                        </Text>
                        <Button
                            style={{ width: 100, borderWidth: 0, position: 'absolute', bottom: 0 }}
                            status="success"
                            onPress={() => navigation.navigate('ArticleDetails', { articleId: article.articleId })}
                        >
                            DETALJI
                        </Button>
                        <Button
                            style={{ width: 45, borderWidth: 0, position: 'absolute', bottom: -2, left: 105 }}
                            status="danger"
                            appearance="outline"
                            accessoryRight={DeleteIcon}
                            onPress={() => articleSelectionHandler(article)}
                        />
                    </Layout>
                </Layout>
            </TouchableOpacity>
        </Layout >
    )
}

export default ArticleItemAlternativeOne

const styles = StyleSheet.create({
    article: {
        margin: 5,
        minHeight: 200
    },
    articleContainer: {
        padding: 10,
        borderRadius: 10,
        overflow: 'hidden',
        borderColor: '#eee',
        borderWidth: 1
    },
    articleRow: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        // backgroundColor: 'rgba(150,150,150, .4)',
    },
    articleImageBox: {
        height: 200,
        width: '40%',
        borderRadius: 10,
        overflow: 'hidden'
    },
    articleImage: {
        height: '100%'
    },
    articleContent: {
        backgroundColor: 'transparent',
        // justifyContent: 'space-between',
        marginLeft: 10
    },
    articleTitleMain: {
        fontFamily: 'roboto-bold',
        width: 200
    },
    articleTitleSub: {
        width: 200
    }
})
