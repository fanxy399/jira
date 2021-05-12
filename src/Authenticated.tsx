/* eslint-disable jsx-a11y/anchor-is-valid */
// import TsUseArray from "Screens/TsUseArray";
import Screens from "Screens/Projects";
import styled from "styled-components";
import { Menu, Dropdown } from "antd";
import { useAuth } from "context/auth-context";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";

export default function Authenticated() {
  const { user, logout } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderLeft gap={true}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
          <div>项目</div>
          <div>用户</div>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  {/* // eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a className="ant-dropdown-link" onClick={logout}>
                    退出登录
                  </a>
                </Menu.Item>
              </Menu>
            }
          >
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              Hi, {user?.name}
            </a>
          </Dropdown>
        </HeaderRight>
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
  grid-template-columns: 30rem 1fr 30rem;
  grid-template-rows: 6rem 1fr 10rem;
  grid-gap: 2rem;
`;
const Header = styled(Row)`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  padding: 0 3rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled(Row)``;

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
