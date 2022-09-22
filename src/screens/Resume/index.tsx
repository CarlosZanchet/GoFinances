
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useCallback, useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { VictoryPie } from 'victory-native';
import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';
import { currencyFormat } from '../../utils/Utils';
import { addMonths, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChartContainer, Container, Content, Header, LoadingContainer, Month, MonthSelect, MonthSelectButton, MonthSelectIcon, Title } from './styles';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const dataKey = '@gofinances:transactions'

interface TransactionData {
  type: 'positive' | 'negative'
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  totalFormatted: string;
  total: number;
  color: string;
  percent: string;
}

export function Resume() {
  const theme = useTheme()

  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])
  
  function handleDateChange(action: 'next' | 'prev') {
    if(action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1))
    } else {
      setSelectedDate(subMonths(selectedDate, 1))
    }
  }

  async function loadData() {
    setIsLoading(true)
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives: TransactionData[] = responseFormatted
    .filter((expensive: TransactionData) => 
      expensive.type === 'negative' 
      && new Date(expensive.date).getMonth() === selectedDate.getMonth() 
      && new Date(expensive.date).getFullYear() === selectedDate.getFullYear() 
    )
    ;

    const expensivesTotal = expensives.reduce((acc: number, item: TransactionData) => {
      return acc + Number(item.amount)
    }, 0)

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;
      expensives.forEach((expensive: TransactionData) => {
        if(expensive.category === category.key) {
          categorySum += Number(expensive.amount);
          
        }
      })
      if(categorySum > 0) {

        const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`

        totalByCategory.push({
          key: category.key,
          name: category.name,
          totalFormatted: currencyFormat(categorySum),
          total: categorySum,
          color: category.color,
          percent
        })
      }
    })
    setTotalByCategories(totalByCategory)
    setIsLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadData();
  }, [selectedDate]))

  return (
    <Container>
      <Header>
        <Title>Resumo por Categoria</Title>
      </Header>
      {isLoading ? 
      <LoadingContainer>
        <ActivityIndicator color={theme.colors.primary} size="large" />
      </LoadingContainer> 
      : 
      <>
      
      <MonthSelect>
        <MonthSelectButton onPress={() => handleDateChange('prev')}>
          <MonthSelectIcon name="chevron-left" />
        </MonthSelectButton>
        <Month>{format(selectedDate, 'MMMM, yyyy', {
          locale: ptBR
        })}</Month>
        <MonthSelectButton  onPress={() => handleDateChange('next')}>
          <MonthSelectIcon name="chevron-right" />
        </MonthSelectButton>
      </MonthSelect>

      <ChartContainer>
        <VictoryPie 
          data={totalByCategories}
          style={{
            labels: { 
              fontSize: RFValue(16),
              fontWeight: 'bold',
              fill: theme.colors.shape
            }
          }}
          labelRadius={50}
          colorScale={totalByCategories.map(category => category.color)}
          x="percent"
          y="total"
        />
      </ChartContainer>

      <Content
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        {totalByCategories.map((category) => (
          <HistoryCard key={category.name} title={category.name} amount={category.totalFormatted} color={category.color} />
        ))}
      </Content>
      </>
      }
    </Container>
  );
}