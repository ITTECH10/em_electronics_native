import React from "react";
import { StyleSheet } from 'react-native'
import { Layout, Text } from "@ui-kitten/components";

const TrendsScreen = () => {
    return (
        <Layout style={styles.screen}>
            <Text>TrendsScreen</Text>
        </Layout>
    );
}

export default TrendsScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
