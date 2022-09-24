import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9
})`
  background: ${({ theme }) => theme.colors.shape};
  height: ${RFValue(46)}px;
  border-radius: 5px;
  flex-direction: row;
  margin-bottom: 16px;
  align-items: center;
`

export const ImageContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: ${RFValue(16)}px;
  border-color: ${({ theme }) => theme.colors.background};
  border-right-width: 1px;
`

export const Text = styled.Text`
  flex: 1;
  text-align: center;
  font-size: ${RFValue(13)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`

export const FooterWrapper = styled.View`
  margin-top: ${RFPercentage(-4)}px;
  
  padding: 0px 32px;
  justify-content: space-between;
`