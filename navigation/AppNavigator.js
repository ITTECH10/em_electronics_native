import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeIcon, TrendsIcon, ProfileIcon, SettingsIcon } from './../components/UI/ICONS/icons'

// SCREENS
import SignupScreen from './screens/Authentication/SignupScreen'
import LoginScreen from './screens/Authentication/LoginScreen'
// import TrendsScreen from './screens/TrendsScreen';
// import MyProfileScreen from './screens/MyProfileScreen';
import HomeScreen from './screens/HomeScreen';
import ArticleDetailsScreen from './screens/ArticleDetailsScreen';
import EditArticleScreen from './screens/EditArticleScreen';
import SettingsScreen from './screens/SettingsScreen'
import ForgotPasswordScreen from './screens/Authentication/ForgotPasswordScreen'
import ResetPasswordScreen from './screens/Authentication/ResetPasswordScreen'
// import EditProfileScreen from './screens/EditProfileScreen'

const { Navigator, Screen } = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
                name="ArticleDetails"
                component={ArticleDetailsScreen}
            />
            <Stack.Screen
                name="EditArticle"
                component={EditArticleScreen}
                options={{ headerShown: true, headerTitle: 'Izmjena Artikla' }}
            />
        </Stack.Navigator>
    );
}

// function TrendsStackNavigator() {
//     return (
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="TrendsScreen" component={TrendsScreen} />
//         </Stack.Navigator>
//     );
// }

// function ProfileStackNavigator() {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen name="Profile" options={{ headerShown: false }} component={MyProfileScreen} />
//             <Stack.Screen name="Settings" options={{ headerTitle: 'Postavke' }} component={SettingsScreen} />
//             <Stack.Screen name="EditProfile" options={{ headerTitle: 'Uređivanje Profila' }} component={EditProfileScreen} />
//         </Stack.Navigator>
//     );
// }

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title='Artikli' icon={HomeIcon} />
        {/* <BottomNavigationTab title='Nešto' icon={TrendsIcon} /> */}
        <BottomNavigationTab title='Postavke' icon={SettingsIcon} />
    </BottomNavigation>
);

const TabNavigator = () => (
    <Navigator screenOptions={{ headerShown: false }} tabBar={props => <BottomTabBar {...props} />}>
        <Screen name='Measurements' component={HomeStackNavigator} />
        {/* <Screen name='Trends' component={TrendsStackNavigator} /> */}
        <Screen name='Settings' component={SettingsScreen} />
    </Navigator>
);

const AuthStackNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Signup' component={SignupScreen} />
        <Stack.Screen
            name='ForgotPassword'
            component={ForgotPasswordScreen}
            options={{ headerShown: true, headerTitle: '' }}
        />
        <Stack.Screen
            name='ResetPassword'
            component={ResetPasswordScreen}
            options={{ headerShown: true, headerTitle: '' }}
        />
    </Stack.Navigator>
)

export const AppNavigator = () => (
    <NavigationContainer>
        <TabNavigator />
    </NavigationContainer>
);

export const AuthNavigator = () => (
    <NavigationContainer>
        <AuthStackNavigator />
    </NavigationContainer>
)