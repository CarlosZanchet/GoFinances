import { Container, Footer, Header, SignInTitle, Title, TitleWrapper } from "./styles";
import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import { RFValue } from "react-native-responsive-fontsize";
import { SignInSolcialButton } from "../../components/SignInSolcialButton";
import { FooterWrapper } from "../../components/SignInSolcialButton/styles";
import { useAuth } from "../../context/AuthContext";
import { Alert, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useTheme } from "styled-components/native";

export function SignIn() {

  const theme = useTheme();

  const [isLoading, setIsloading] = useState(false);
  const { signInWithGoogle } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      setIsloading(true);
      await signInWithGoogle();
    } catch (err) {
      console.log(err)
      Alert.alert('Não foi possivel conectar a conta Google')
      setIsloading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(120)} />
          <Title>
            Controle suas {'\n'} finanças de forma {'\n'} muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login com {'\n'} uma das contas abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSolcialButton title="Entrar com Google" svg={GoogleSvg} onPress={handleSignInWithGoogle} />
          <SignInSolcialButton title="Entrar com Apple" svg={AppleSvg} />
        </FooterWrapper>
        { isLoading && <ActivityIndicator color={`${theme.colors.shape}`} />}
      </Footer>
    </Container>
  );
}