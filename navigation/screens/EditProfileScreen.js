import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Layout, Button, Text, Input } from '@ui-kitten/components'
import { useAppContext } from '../../context/AppContext'
import axios from 'axios'
import { MaleIcon, FemaleIcon, PersonIcon, EmailIcon } from './../../components/UI/ICONS/icons'

const EditProfileScreen = ({ navigation }) => {
    // const { logedCustomer, setLogedCustomer } = useAppContext()
    // const { gender, firstName, lastName, email } = logedCustomer
    const [selectedGender, setSelectedGender] = React.useState('Her')
    const [fields, setFields] = React.useState({
        firstName: '',
        lastName: ''
    })

    const handleChange = (name) => (value) => {
        setFields({ ...fields, [name]: value });
    };

    const handleSubmit = () => {
        const data = { ...fields, gender: selectedGender }

        axios.put('/users/me/edit', data)
            .then(res => {
                if (res.status === 200) {
                    // setLogedCustomer({
                    //     ...res.data.user,
                    //     fullName: `${res.data.user.firstName} ${res.data.user.lastName}`
                    // })
                    navigation.goBack()
                }
            }).catch(err => {
                console.log(err.response)
            })
    }

    return (
        <Layout style={{ flex: 1 }}>
            <Layout style={styles.contentContainer}>
                <Layout style={styles.imageBox}>
                    {/* {gender === 'herr' ?
                        <Image
                            style={styles.profileBlankImage}
                            source={require('./../../assets/images/male-avatar.jpg')}
                            resizeMode="contain"
                        /> :
                        <Image
                            style={styles.profileBlankImage}
                            source={require('./../../assets/images/female-avatar.jpg')}
                            resizeMode="contain"
                        />} */}
                    <Image
                        style={styles.profileBlankImage}
                        source={require('./../../assets/images/male-avatar.jpg')}
                        resizeMode="contain"
                    />
                </Layout>
                <Layout style={styles.genderRow}>
                    <TouchableOpacity
                        style={styles.genderColumn}
                    >
                        <Button
                            accessoryRight={MaleIcon}
                            appearance={selectedGender === 'herr' ? 'outline' : 'ghost'}
                            onPress={() => setSelectedGender('herr')}
                        />
                        <Text category="s2">
                            Herr
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.genderColumn}
                    >
                        <Button
                            accessoryRight={FemaleIcon}
                            appearance={selectedGender === 'frau' ? 'outline' : 'ghost'}
                            onPress={() => setSelectedGender('frau')}
                        />
                        <Text category="s2">
                            Frau
                        </Text>
                    </TouchableOpacity>
                </Layout>

                <Layout style={styles.inputContainer}>
                    <Input
                        accessoryLeft={PersonIcon}
                        // placeholder={firstName}
                        placeholder="John"
                        label="Vorname"
                        style={styles.input}
                        onChangeText={handleChange('firstName')}
                    />
                    <Input
                        accessoryLeft={PersonIcon}
                        // placeholder={lastName}
                        placeholder="Doe"
                        label="Nachname"
                        style={styles.input}
                        onChangeText={handleChange('lastName')}
                    />
                    <Input
                        accessoryLeft={EmailIcon}
                        // placeholder={email}
                        placeholder="john@testing.com"
                        label="Email"
                        style={styles.input}
                        disabled
                    />
                </Layout>
                <Button
                    size="medium"
                    style={{ width: '80%' }}
                    onPress={handleSubmit}
                >GOTOVO</Button>
            </Layout>
        </Layout>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    contentContainer: {
        marginVertical: 10,
        alignItems: 'center'
    },
    imageBox: {
        alignItems: 'center',
        height: 70,
        width: '100%',
        marginVertical: 10
    },
    profileBlankImage: {
        height: '100%',
        width: '100%'
    },
    genderRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    genderColumn: {
        alignItems: 'center',
        marginHorizontal: 80
    },
    inputContainer: {
        marginTop: 20,
        width: '80%'
    },
    input: {
        marginBottom: 10
    }
})
