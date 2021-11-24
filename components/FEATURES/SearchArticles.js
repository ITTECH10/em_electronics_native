import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Input, useTheme } from '@ui-kitten/components'
import { SearchIcon } from '../UI/ICONS/icons'

const SearchArticles = ({ setQuery }) => {
    const theme = useTheme()
    const [inputColor, setInputColor] = React.useState('#fff')

    return (
        <Layout style={styles.container}>
            <Input
                placeholder="Pretražite artikle..."
                style={{ borderColor: inputColor, backgroundColor: '#fff' }}
                accessoryRight={SearchIcon}
                size="large"
                onChangeText={(text) => setQuery(text)}
                onFocus={() => setInputColor(theme['color-success-500'])}
                onBlur={() => setInputColor('#fff')}
            />
        </Layout>
    )
}

export default SearchArticles

const styles = StyleSheet.create({
    container: {}
})
