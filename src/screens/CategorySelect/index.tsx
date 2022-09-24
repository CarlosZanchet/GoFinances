import { FlatList } from "react-native";
import { Button } from "../../components/Forms/Button";
import { categories } from "../../utils/categories";
import { Category, CategoryValues, Container, Footer, Header, Icon, ListCategory, Name, Title } from "./styles";

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({ category, setCategory, closeSelectCategory }: Props) {

  function handleCategorySelect(category: Category) {
    setCategory(category)
  }

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>
      <ListCategory>
        <FlatList
          data={categories}
          style={{ flex: 1, width: '100%' }}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <Category
              onPress={() => handleCategorySelect(item)}
              isActive={category.key === item.key}
            >
              <CategoryValues isActive={category.key === item.key}>
                <Icon name={item.icon} isActive={category.key === item.key} />
                <Name isActive={category.key === item.key}>{item.name}</Name>
              </CategoryValues>
              {category.key === item.key && <Icon name="check" isActive />}
              
            </Category>
          )}
        />
      </ListCategory>
      <Footer>
        <Button title="Selecionar" onPress={closeSelectCategory} />
      </Footer>
    </Container>
  );
}