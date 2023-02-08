import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Register } from ".";
import theme from "../../global/styles/theme";
import { ThemeProvider } from "styled-components/native";

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn()
  }
})


const Providers : React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    { children }
  </ThemeProvider>
)

describe("Register screen", () => {
  it("should be open category modal when user clicks on the category button", async () => {
    const { getByTestId } = render(
      <Register />,
      {
        wrapper: Providers
      }
    )

    const categoryModal = getByTestId("modal-category");
    const buttonCategory = getByTestId("button-category");

    fireEvent.press(buttonCategory);

    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    }, { timeout: 1200 })
  });
})
