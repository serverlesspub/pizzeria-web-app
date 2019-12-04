import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from 'react-router-dom';
import Pizzas from './pages/pizzas/pizzas'
import Orders from './pages/orders/orders'
import { Layout, Menu } from 'antd';
const { Header, Footer, Content } = Layout;

function MainMenu() {
  const location = useLocation()
  console.log('LOCATION', location)

  return (
    <Menu
      className="menu"
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[location.pathname.split('/')[1] || 'pizzas']}
      style={{ lineHeight: "64px" }}
    >
      <Menu.Item key="pizzas">
        <Link to="/">Pizzas</Link>
      </Menu.Item>
      <Menu.Item key="orders">
        <Link to="/orders">Orders</Link>
      </Menu.Item>
      <Menu.Item key="delivery">
        <Link to="/delivery">Delivery</Link>
      </Menu.Item>
    </Menu>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Header>
          <div className="logo">Aunt Maria's pizzeria</div>
          <MainMenu />
        </Header>
        <Content>
          <Switch>
            <Route path="/delivery">Delivery</Route>
            <Route path="/orders">
              <Orders />
            </Route>
            <Route path="/">
              <Pizzas />
            </Route>
          </Switch>
        </Content>
        <Footer>© Aunt Maria's Pizzia</Footer>
      </Layout>
    </Router>
  );
}

export default App;
