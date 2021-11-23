import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { Layout, Button, Icon, Text, useTheme } from '@ui-kitten/components'
import { useAppContext } from './../../context/AppContext'
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchIcon = (props) => (
    <Icon {...props}
        name="arrow-left-bold"
        pack="material-community"
        style={[props.style, { width: 30, height: 30, color: '#fff' }]}
    />
)

const PhotoIcon = (props) => (
    <Icon {...props}
        name="camera"
        pack="material-community"
        style={[props.style, { width: 25, height: 25 }]}
    />
)

const ArticleDetailsScreen = ({ navigation, route }) => {
    const theme = useTheme(theme)
    const [activeSwitchBtn, setActiveSwitchBtn] = React.useState(0)
    const [image, setImage] = React.useState(null);
    const [base64Image, setBase64Image] = React.useState(null);

    const { articles, setArticles } = useAppContext()
    const selectedArticleId = route.params.articleId
    // const foundArticle = articles.find(article => article.articleId === selectedArticleId)

    const foundArticleIndex = articles.findIndex(article => article.articleId === selectedArticleId)
    const foundArticle = articles[foundArticleIndex]

    const { articleId, codedNumber, number, name, image: selectedImage } = foundArticle

    const pickImageHandler = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Da biste dodali sliku artikla, morate omogućiti pristup vašoj galeriji!');
            } else {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    quality: 1,
                    base64: true
                });

                if (!result.cancelled) {
                    try {
                        foundArticle.image = result.uri

                        const updatedArticles = [...articles]
                        updatedArticles[foundArticleIndex] = foundArticle
                        await AsyncStorage.setItem('articles', JSON.stringify(updatedArticles))

                        setArticles(updatedArticles)
                        setImage(result.uri);
                        setBase64Image(`data:image/jpg;base64,${result.base64}`)
                    } catch (e) {
                        console.log(e)
                    }
                }
            }
        }
    }

    return (
        <Layout style={styles.screen}>
            <Layout style={styles.article}>
                <Layout style={styles.articleBgContainer}>
                    <Image
                        source={{ uri: image ? image : selectedImage }}
                        // source={{ uri: selectedImage }}
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
                                onPress={() => navigation.navigate('EditArticle')}
                            >
                                IZMJENA
                            </Button>
                            <Button
                                style={{ ...styles.buttonBuyTicket, ...styles.headerBtn }}
                                appearance="outline"
                                size="medium"
                                accessoryLeft={PhotoIcon}
                                onPress={pickImageHandler}
                            />
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