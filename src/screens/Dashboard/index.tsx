import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import { useAuth } from '../../context/AuthContext';
import { useThemeLightDark } from '../../context/ThemeContext';
import { currencyFormat, dateFormatter, dateFormatterCard } from '../../utils/Utils';
import { 
  Container, 
  Header,
  UserWrapper,
  UserInfo,
  User,
  UserGreeting, 
  UserName,
  Photo,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
  LoadingContainer,
  TransactionsBlank,
  TransactionsBlanckText,
  IconBlank,
  ThemeButton,
  IconTheme
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps,
  expensives: HighlightProps,
  total: HighlightProps
}

export function Dashboard() {
  const { user } = useAuth()

  const { handleTheme } = useThemeLightDark()
  const dataKey = `@gofinances:transactions_user:${user.id}`

  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)
  
  const theme = useTheme()
  const { signOut } = useAuth();

  function getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative') {
    const collectionsFilttered = collection.filter(transaction => transaction.type === type);
    if(collectionsFilttered.length <= 0) {
      return 0;
    }

    const lastTransaction = Math.max.apply(Math, collectionsFilttered
      .map(transaction => new Date(transaction.date).getTime()))

    return dateFormatterCard(new Date(lastTransaction))
  }

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(dataKey);
    const listTransactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = listTransactions.map((item: DataListProps) => {

      if(item.type === 'positive') {
        entriesTotal += Number(item.amount);
      } else {
        expensiveTotal += Number(item.amount);
      }

      const amount = currencyFormat(Number(item.amount))
      const date = dateFormatter(new Date(item.date))

      return {
        id: item.id,
        name: item.name,
        amount,
        date,
        type: item.type,
        category: item.category,
      }
    })

    setTransactions(transactionsFormatted)
    const lastTransactionsEntries = getLastTransactionDate(listTransactions, 'positive');
    const lastTransactionsExpensives = getLastTransactionDate(listTransactions, 'negative');
    const totalInterval = lastTransactionsExpensives === 0 ? 'Não há transações' : `01 a ${lastTransactionsExpensives}`

    setHighlightData({
      entries: {
        amount: currencyFormat(entriesTotal),
        lastTransaction: lastTransactionsEntries === 0 ? 'Não há transações' : `Última transação: ${lastTransactionsEntries}`
      },
      expensives: {
        amount: currencyFormat(expensiveTotal),
        lastTransaction: lastTransactionsExpensives === 0 ? 'Não há transações' : `Última transação: ${lastTransactionsExpensives}`
      },
      total: {
        amount: currencyFormat(entriesTotal - expensiveTotal),
        lastTransaction: totalInterval
      }
    })
    setIsLoading(false)
  }

  useEffect(() => {
    loadTransactions();
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []))

  return (
    <Container>
      {isLoading ? 
      <LoadingContainer>
        <ActivityIndicator color={theme.colors.primary} size="large" />
      </LoadingContainer> 
      : 
      <>
        <Header>
          <UserWrapper>
            <UserInfo>
              <Photo source={{ uri: user.photo}}  />
              <User>
                <UserGreeting>Olá, </UserGreeting>
                <UserName>{user.name}</UserName>
              </User>
            </UserInfo>
            <LogoutButton onPress={signOut}>
              <Icon name="power"  />
            </LogoutButton>
          </UserWrapper>
        </Header>
        <HighlightCards
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24}}
        >
          <HighlightCard 
            title='Entradas' 
            amount={highlightData.entries.amount} 
            lastTransaction={highlightData.entries.lastTransaction}
            type="up"
          />
          <HighlightCard 
            title='Saídas' 
            amount={`-${highlightData.expensives.amount}`}  
            lastTransaction={highlightData.expensives.lastTransaction}
            type="down"
          />
          <HighlightCard 
            title='Total' 
            amount={highlightData.total.amount}  
            lastTransaction={highlightData.total.lastTransaction} 
            type="total"
          />
        </HighlightCards>
        {transactions.length > 0 ? 
          <Transactions>
            <Title>Listagem</Title>
            <TransactionList
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
              />
          </Transactions>
            :
          <TransactionsBlank>
            <IconBlank name="list" />
            <TransactionsBlanckText>Nenhuma Transação Cadastrada</TransactionsBlanckText>
          </TransactionsBlank>
        }
        </>
      }
    </Container>
  );
}

