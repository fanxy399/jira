// import TsUseArray from "Screens/TsUseArray";
import Screens from "Screens/Projects";
import styled from "styled-components";
import { Button } from "antd";
import { useAuth } from "context/auth-context";

export default function Authenticated() {
  const { user, logout } = useAuth();
  return (
    <Container>
      <Header>
        <div>欢迎登陆， 用户名：{user?.name}</div>
        <Button type={"primary"} onClick={logout}>
          登出
        </Button>
      </Header>
      <Nav>Nav</Nav>
      <Main>
        <Screens />
        {/* <hr />
        <TsUseArray /> */}
      </Main>
      <Aside>Aside</Aside>
      <Footer>Footer</Footer>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-areas: "header header header" "nav main aside" "footer footer footer";
  grid-template-columns: "40rem 1fr 40rem";
  grid-template-rows: "6rem 1fr 10rem";
  grid-gap: 2rem;
`;
const Header = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
`;

const Nav = styled.nav`
  grid-area: nav;
  background-color: #d9d9d9;
`;

const Main = styled.main`
  grid-area: main;
`;
const Aside = styled.aside`
  grid-area: aside;
  background-color: #d9d9d9;
`;

const Footer = styled.footer`
  grid-area: footer;
  background-color: #000;
  color: #fff;
`;
