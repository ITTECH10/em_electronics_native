import React from 'react'
import { Layout, Button, Text, useTheme } from '@ui-kitten/components';
import PrimaryColorView from './../../constants/components/PrimaryColorView'
import { View, Image } from 'react-native';
import AdaptiveText from './../../constants/components/AdaptiveText'
// import { useAppContext } from './../../context/AppContext'
import { NotificationsBellIcon, EditIcon, FaqIcon, HelpIcon, AddMemberIcon, SettingsIcon } from './../../components/UI/ICONS/icons'

const MyProfileScreen = ({ navigation }) => {
    const theme = useTheme()
    // const { logedCustomer, mostRecentRecording } = useAppContext()
    // const { currentWeight } = mostRecentRecording
    // const { email, fullName, gender } = logedCustomer

    return (
        <Layout style={{ flex: 1 }}>
            <PrimaryColorView style={{ height: '22%' }}>
                <View style={{ alignItems: 'flex-end', marginRight: -5 }}>
                    <Button
                        size="large"
                        accessoryLeft={NotificationsBellIcon}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }}>
                    <View style={{ height: 70, width: 70 }}>
                        {/* {gender === 'herr' ?
                            <Image
                                source={require('./../../assets/images/male-avatar.jpg')}
                                style={{ height: '100%', width: '100%', borderRadius: 140 }} />
                            :
                            <Image
                                source={require('./../../assets/images/female-avatar.jpg')}
                                style={{ height: '100%', width: '100%', borderRadius: 140 }} />} */}
                        <Image
                            source={require('./../../assets/images/male-avatar.jpg')}
                            style={{ height: '100%', width: '100%', borderRadius: 140 }} />
                    </View>
                    <View style={{ marginLeft: 20, marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <AdaptiveText category="h5" style={{ fontFamily: 'roboto-bold' }}>
                                John Doe
                            </AdaptiveText>
                            <Button
                                style={{ marginLeft: 5 }}
                                size="medium"
                                accessoryRight={EditIcon}
                                onPress={() => navigation.navigate('EditProfile')}
                            >
                                Uredi
                            </Button>
                        </View>
                        <View>
                            <AdaptiveText category="s2">
                                {/* {email} */}
                                John@testing.com
                            </AdaptiveText>
                        </View>
                    </View>
                </View>
            </PrimaryColorView>

            <Layout style={{ flexDirection: 'row', justifyContent: 'space-evenly', borderBottomColor: '#eee', borderBottomWidth: 2, paddingBottom: 15 }}>
                <Layout style={{ alignItems: 'center' }}>
                    <Button
                        accessoryRight={FaqIcon}
                        appearance="ghost"
                        size="large"
                    />
                    <Text category="s2">
                        X
                    </Text>
                </Layout>
                <Layout style={{ alignItems: 'center' }}>
                    <Button
                        accessoryRight={HelpIcon}
                        appearance="ghost"
                        size="large"
                    />
                    <Text category="s2">
                        X
                    </Text>
                </Layout>
                <Layout style={{ alignItems: 'center' }}>
                    <Button
                        accessoryRight={AddMemberIcon}
                        appearance="ghost"
                        size="large"
                    />
                    <Text category="s2">
                        X
                    </Text>
                </Layout>
                <Layout style={{ alignItems: 'center' }}>
                    <Button
                        onPress={() => navigation.navigate('Settings')}
                        accessoryRight={SettingsIcon}
                        appearance="ghost"
                        size="large"
                    />
                    <Text category="s2">
                        Postavke
                    </Text>
                </Layout>
            </Layout>

            <Layout style={{ marginTop: 7 }}>
                <Layout style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                    <Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Layout style={{ height: 50, width: 50 }}>
                            {/* {gender === 'herr' ?
                                <Image style={{ height: '100%', width: '100%', borderRadius: 100 }} source={require('./../../assets/images/male-avatar.jpg')} />
                                : <Image style={{ height: '100%', width: '100%', borderRadius: 100 }} source={require('./../../assets/images/female-avatar.jpg')} />} */}
                            <Image
                                source={require('./../../assets/images/male-avatar.jpg')}
                                style={{ height: '100%', width: '100%', borderRadius: 140 }} />
                        </Layout>
                        <Layout style={{ marginLeft: 5 }}>
                            <Text>
                                John Doe
                            </Text>
                            <Text category="label" style={{ color: theme['color-basic-500'] }}>
                                Oct 8, 2021
                            </Text>
                        </Layout>
                    </Layout>
                    <Layout style={{ alignItems: 'center' }}>
                        <AdaptiveText
                            style={{ marginBottom: 3, fontFamily: 'roboto-bold' }}
                            color={theme['color-primary-default']}
                            category="h6"
                        >
                            {/* {currentWeight ? currentWeight : 0}kg */}
                            X
                        </AdaptiveText>
                        <Button size="tiny">Primarni Korisnik</Button>
                    </Layout>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default MyProfileScreen