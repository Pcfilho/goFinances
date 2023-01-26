//@ts-nocheck
import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export function Profile() {
 return (
    <View>
        <Text testID='title'>Perfil</Text>

        <TextInput 
            testID='input-name'
            placeholder='Nome'
            autoCorrect={false}
            value="Paulo"
        />

        <TextInput 
            testID='input-surname'
            placeholder='Sobrenome'
            value="Barroso"
        />

        <Button 
            testID='save-button'
            title='Salvar'
            onPress={() => {}}
        />
    </View>
 );
};