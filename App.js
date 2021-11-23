import React from 'react';
import 'react-native-gesture-handler';
import axios from 'axios'
import * as eva from '@eva-design/eva';
import AppContextProvider, { useAppContext } from './context/AppContext';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './theme.json'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import { MaterialCommunityIconsPack } from './assets/icons/material-community-pack'
import { AppNavigator, AuthNavigator } from './navigation/AppNavigator';
import SafeArea from './constants/components/SafeArea';
import StatusBar from './constants/components/StatusBar';
import LoadingIndicator from './constants/components/LoadingIndicator'

// DEVELOPMENT // OFFICE
axios.defaults.baseURL = 'http://192.168.100.14:8000/api/v1'

// DEVELOPMENT // HOME
// axios.defaults.baseURL = 'http://192.168.0.12:8000/api/v1'

// PRODUCTION
// axios.defaults.baseURL = 'https://scallow.herokuapp.com/api/v1'

const App = () => {
  const [fontsLoaded, setFontsLoaded] = React.useState(false)
  const { authenticated, generalAppLoading, checkForToken, checkConnectionAvailability } = useAppContext()

  const loadFonts = async () => {
    await Font.loadAsync({
      'roboto-thin': require('./assets/fonts/Roboto-Thin.ttf'),
      'roboto-light': require('./assets/fonts/Roboto-Light.ttf'),
      'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
    })
  }

  // React.useEffect(() => {
  //   checkForToken()
  // }, [checkForToken])

  React.useEffect(() => {
    checkConnectionAvailability()
  }, [checkConnectionAvailability])

  const navigatorToRender = authenticated ? (
    <AppNavigator />
  ) : (
    <AuthNavigator />
  )

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={err => console.log(err)}
      />
    )
  }

  return (
    <SafeArea>
      <StatusBar />
      {!generalAppLoading ? navigatorToRender : <LoadingIndicator />}
    </SafeArea>
  )
}

export default () => (
  <AppContextProvider>
    <IconRegistry icons={MaterialCommunityIconsPack} />
    <ApplicationProvider
      {...eva}
      theme={{ ...eva.light, ...theme }}
    >
      <App />
    </ApplicationProvider>
  </AppContextProvider>
);