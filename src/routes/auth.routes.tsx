import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { View, Text } from 'react-native'

import { SignIn } from '../screens/SignIn';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
    return (
        <Navigator
            initialRouteName='SignIn'
            screenOptions={{
                headerShown: false,
            }}>
            <Screen 
                name="SignIn"
                component={SignIn}
            />
        </Navigator>
    )
}