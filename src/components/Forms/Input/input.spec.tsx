import React from 'react';
import { render } from '@testing-library/react-native';
import { Input } from '.';
import { ThemeProvider } from 'styled-components/native'
import theme from '../../../global/styles/theme';

const Providers: React.FC = ({ children }) => (
    <ThemeProvider theme={theme}>
        { children }
    </ThemeProvider>
)

describe('Input Component', () => {
    it('must have border when active', () => {
        const { getByTestId } = render(
            <Input 
                testID='input' 
                active 
            />,
            {
                wrapper: Providers
            }
        );

        const inputComponent = getByTestId('input')
        
        expect(inputComponent.props.style[0].borderColor).toEqual('#e83f5b')
    })
})