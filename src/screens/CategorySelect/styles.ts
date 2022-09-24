import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Feather } from '@expo/vector-icons'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

interface CategoryProps {
  isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;
  background: ${({ theme }) => theme.colors.primary};

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`

export const Title = styled.Text`
  font-family:  ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
`

export const CategoryValues = styled.View<CategoryProps>`
  width: 100%;
  flex: 1;
  flex-direction: row;
  align-items: center;
`

export const Category = styled.TouchableOpacity<CategoryProps>`
  padding: ${RFValue(15)}px;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  margin: 4px 0px;
  background: ${({ isActive, theme }) => isActive ? theme.colors.secondary_light : theme.colors.shape };
`

export const Icon = styled(Feather)<CategoryProps>`
  font-size: ${RFValue(20)}px;
  margin-right: 16px;
  color: ${({ isActive, theme }) => isActive ? theme.colors.secondary : theme.colors.text };;
`

export const Name = styled.Text<CategoryProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ isActive, theme }) => isActive ? theme.colors.secondary : theme.colors.text };
`

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`
export const ListCategory = styled.View`
  padding: 5px 10px;
  width: 100%;
  flex: 1;
`
