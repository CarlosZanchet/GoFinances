import styled from 'styled-components/native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'
import { DataListProps } from '.'
import { FlatList, FlatListProps, TouchableOpacity } from 'react-native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
`;

export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 24px;
  margin-top: ${getStatusBarHeight() + RFValue(28)}px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 4px;
`;

export const User = styled.View`
  margin-left: 17px;
`;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};  
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(17)}px;
  font-family: ${({ theme }) => theme.fonts.bold};    
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary}; 
  font-size: ${RFValue(20)}px;
`;

export const LogoutButton = styled.TouchableOpacity`

`

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24}
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`;

export const Transactions = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: ${RFPercentage(12)}px;
`;

export const Title = styled.Text`
  margin-bottom: 16px;
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.regular};   
`;

export const TransactionList = styled(
  FlatList as new (
    props: FlatListProps<DataListProps>
  ) => FlatList<DataListProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})``;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const TransactionsBlank = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const TransactionsBlanckText = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text}
`

export const IconBlank = styled(Feather)`
  font-size: 100px;
  color: ${({ theme }) => theme.colors.text}
`
export const ThemeButton = styled(Feather)`
  font-size: 100px;
  color: ${({ theme }) => theme.colors.text}
`

export const IconTheme = styled(MaterialCommunityIcons)`
  color: ${({ theme }) => theme.colors.shape}; 
  font-size: ${RFValue(20)}px;
`



