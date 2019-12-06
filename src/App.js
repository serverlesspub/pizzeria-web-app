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
import NewOrder from './pages/new-order/new-order'
import { Layout, Menu } from 'antd';
import Amplify from 'aws-amplify'
import awsconfig from './config'
import { withAuthenticator } from 'aws-amplify-react'

Amplify.configure(awsconfig)
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
            <Route path="/orders/new/:pizzaId">
              <NewOrder />
            </Route>
            <Route path="/orders/new">
              <NewOrder />
            </Route>
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

export default withAuthenticator(App, true)
