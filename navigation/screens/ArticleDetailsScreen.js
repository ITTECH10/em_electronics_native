import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { Layout, Button, Icon, Text, useTheme } from '@ui-kitten/components'
import { useAppContext } from './../../context/AppContext'

const SearchIcon = (props) => (
    <Icon {...props}
        name="arrow-left-bold"
        pack="material-community"
        style={[props.style, { width: 30, height: 30, color: '#fff' }]}
    />
)
const ArticleDetailsScreen = ({ navigation, route }) => {
    const theme = useTheme(theme)
    const [activeSwitchBtn, setActiveSwitchBtn] = React.useState(0)
    const { articles } = useAppContext()

    const selectedArticleId = route.params.articleId
    const foundArticle = articles.find(article => article.articleId === selectedArticleId)
    const { articleId, codedNumber, number, name, image } = foundArticle

    return (
        <Layout style={styles.screen}>
            <Layout style={styles.article}>
                <Layout style={styles.articleBgContainer}>
                    <Image
                        source={{ uri: 'https://images.pexels.com/photos/552789/pexels-photo-552789.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }}
                        // source={{ uri: image }}
                        style={styles.articleBgImage}
                    />
                    <Layout style={styles.articleContent}>
                        <Layout style={styles.articleNavigation}>
                            <Button
                                accessoryLeft={SearchIcon}
                                style={styles.buttonBack}
                                size="tiny"
                                appearance="ghost"
                                onPress={() => navigation.goBack()}
                            />
                        </Layout>
                        <Text
                            category="h5"
                            style={styles.articleTitle}
                        >
                            {name}
                        </Text>
                        {/* <Text
                            category="h5"
                            style={styles.articleTitle}
                        >
                            Encounter 2016
                        </Text> */}
                        <Layout style={styles.articleHeaderBtns}>
                            <Button
                                style={{ ...styles.buttonSaveEvent, ...styles.headerBtn }}
                                appearance="outline"
                                size="medium"
                            >
                                IZMJENA
                            </Button>
                            <Button
                                style={{ ...styles.buttonBuyTicket, ...styles.headerBtn }}
                                appearance="outline"
                                size="medium"
                            >
                                NEŠTO
                            </Button>
                        </Layout>
                    </Layout>
                </Layout>
                <Layout level='2' style={styles.articleInfoSwitcher}>
                    <Button
                        style={{ ...styles.switchBtnAbout, ...styles.switchBtn }}
                        appearance="ghost"
                        status={activeSwitchBtn === 0 ? 'primary' : 'basic'}
                        onPress={() => setActiveSwitchBtn(0)}
                    >
                        O ARTIKLU
                    </Button>
                    <Button
                        style={{ ...styles.switchBtnDescription, ...styles.switchBtn }}
                        appearance="ghost"
                        status="basic"
                        status={activeSwitchBtn === 1 ? 'primary' : 'basic'}
                        onPress={() => setActiveSwitchBtn(1)}
                    >
                        OPIS
                    </Button>
                </Layout>
            </Layout>
        </Layout>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    article: {
        height: '100%'
    },
    articleBgContainer: {
        height: 230,
        backgroundColor: 'grey'
    },
    articleBgImage: {
        height: '100%',
        opacity: .8
    },
    articleContent: {
        // height: '27%',
        backgroundColor: 'transparent',
        position: 'absolute',
        width: '100%'
    },
    articleNavigation: {
        alignItems: 'flex-start',
        backgroundColor: 'transparent'
    },
    buttonBack: {
        top: 4
    },
    articleTitle: {
        textAlign: 'center',
        color: '#eee',
        fontFamily: 'roboto-bold'
    },
    articleHeaderBtns: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginTop: 20
    },
    headerBtn: {
        width: '36%'
    },
    buttonSaveEvent: {
        marginRight: 6
    },
    buttonBuyTicket: {
        marginLeft: 6
    },
    articleInfoSwitcher: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    switchBtn: {
        width: '36%'
    }
})

export default ArticleDetailsScreen