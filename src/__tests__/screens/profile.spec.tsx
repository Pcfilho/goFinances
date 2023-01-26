import React from "react";
import { render } from '@testing-library/react-native';

import { Profile } from "../../screens/Profile";

describe('Profile', () => {
    it('should be rendering Profile screen', () => {
        render(<Profile />);
    })
    
    it('should be showing user input name placholder correctly', () => {
        const { getByPlaceholderText } = render(<Profile />);
    
        const inputName = getByPlaceholderText('Nome');
    
        expect(inputName.props.placeholder).toBeTruthy();
    })
    
    it('should be loading user data', () => {
        const { getByTestId } = render(<Profile />);
    
        const inputName = getByTestId('input-name');
        const inputSurname = getByTestId('input-surname');
    
        expect(inputName.props.value).toEqual('Paulo')
        expect(inputSurname.props.value).toEqual('Barroso')
    })
    
    it('should be rendering title', () => {
        const { getByTestId } = render(<Profile />);
    
        const title = getByTestId('title');
    
        expect(title.props.children).toContain('Perfil')
    })
})

