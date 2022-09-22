import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { Button } from '../../components/Forms/Button';
import uuid from 'react-native-uuid'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { CategorySelectButton } from '../../components/Forms/CategorySelect';
import { InputForm } from '../../components/Forms/InputForm';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
import { Container, Header, Title, Form, Filds, TransactionsTypes } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const dataKey = '@gofinances:transactions'

export interface FormData {
  [name: string]: string;
}

const schema = Yup.object().shape({
  name: Yup.string()
            .required('Nome é obrigatório'),
  amount: Yup.number()
              .typeError('Informe um valor numérico')
              .required('Valor é obrigatório')
              .positive('O valor não pode ser negativo'),
})

export function Register() {
  const navigation = useNavigation();
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [transactionType, setTransactionType] = useState('');

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  function handleTransactionTypeSelect(type: 'positive' | 'negative') {
    setTransactionType(type);
  }

  function handleCloseModalSelectCategory() {
    setCategoryModalOpen(false);
  }

  function handleOpenModalSelectCategory() {
    setCategoryModalOpen(true);
  }

  async function handleRegister(form: FormData) {
    if(!transactionType){
      return Alert.alert('Selecione o tipo da transação.')
    }

    if(category.key === 'category') {
      return Alert.alert('Selecione uma categoria.')
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];
      
      const dataFormatted = [
        ...currentData, newTransaction
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted))

      reset()
      setTransactionType('')
      setCategory({
        key: 'category',
        name: 'Categoria'
      })

      navigation.navigate("Listagem")

    } catch (err) {
      console.log(err)
      Alert.alert('Não foi possivel salvar a entidade')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
        <Filds>
          <InputForm 
            placeholder="Nome"
            control={control}
            name="name"
            autoCapitalize='sentences'
            autoCorrect={false}
            error={errors.name && errors.name.message}
          />
          <InputForm 
            placeholder="Preço"
            control={control}
            name="amount"
            keyboardType='numeric'
            error={errors.amount && errors.amount.message}
          />
          <TransactionsTypes>
            <TransactionTypeButton 
              title='Income' 
              type='up' 
              onPress={() => handleTransactionTypeSelect('positive')}
              isActive={transactionType === 'positive'}
            />
            <TransactionTypeButton 
              title='Outcome' 
              type='down' 
              onPress={() => handleTransactionTypeSelect('negative')} 
              isActive={transactionType === 'negative'} 
            />
          </TransactionsTypes>
          <CategorySelectButton title={category.name} onPress={handleOpenModalSelectCategory} />
        </Filds>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect 
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseModalSelectCategory}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}