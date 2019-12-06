import React, { useEffect, useState, Fragment } from 'react'
import { Auth } from 'aws-amplify'
import { Button, Empty, message, PageHeader, Popconfirm, Spin, Table, Tag } from 'antd'
import { Link } from 'react-router-dom'
import { getPizzas, getOrders, deleteOrder } from '../../services/api'
import './orders.css'

function parseOrders(orders, pizzas) {
  return orders.map(order => {
    const pizza = pizzas.find(pizza => pizza.id === order.pizza)
    return { ...order, pizza: pizza ? pizza.name : 'Unknown pizza' }
  })
}

function Orders() {
  const [orders, setOrders] = useState([])
  const [pizzas, setPizzas] = useState([])
  const [counter, setCounter] = useState(0)
  const [loading, setLoading] = useState({
    pizzas: true,
    orders: true
  })

  useEffect(() => {
    const getPizzasFunction = async () => {
      const pizzasList = await getPizzas()
      setPizzas(pizzasList)
      setLoading(loading => ({
        ...loading,
        pizzas: false
      }))
    }
    const getOrdersFunction = async (token) => {
      const ordersList = await getOrders(token)
      console.log(ordersList)
      setOrders(ordersList)
      setLoading(loading => ({
        ...loading,
        orders: false
      }))
    }
    const getUser = async () => {
      const user = await Auth.currentAuthenticatedUser()
      const token = user.signInUserSession.idToken.jwtToken
      console.log('USER', user.signInUserSession)
      await getPizzasFunction()
      await getOrdersFunction(token)
    }
    getUser()
  }, [counter]);

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Pizza',
      dataIndex: 'pizza',
      key: 'pizza'
    },
    {
      title: 'Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: status => {
        const color = status === 'pending' ? 'orange' : 'green'
        return <Tag color={color}>
          { status }
        </Tag>
      }
    },
    {
      title: 'Actions',
      dataIndex: 'orderId',
      key: 'actions',
      render: orderId => (
        <Popconfirm
          placement="topRight"
          title="Are you sure delete this task?"
          onConfirm={async () => {
            await deleteOrder(orderId)
            setCounter(c => c + 1)
            message.success('Order successfully deleted')
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger">Delete</Button>
        </Popconfirm>
      )
    }
  ]

  return (
    <div style={{ padding: '20px' }}>
      {
        (loading.pizzas || loading.orders) ? (
          <Spin className="spinner" />
        ) : (
          (orders.length < 1 && pizzas) ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No orders" />
          ) : (
            <Fragment>
              <PageHeader
                className="pageHeader"
                title="Orders"
                extra={[
                  <Button key="1" type="primary">
                    <Link to="/orders/new">Create new order</Link>
                  </Button>,
                ]}
              />
              <Table
                rowKey={row => row.orderId}
                columns={columns}
                dataSource={parseOrders(orders, pizzas)}
                pagination={false}
              />
            </Fragment>
          )
        )
      }
    </div>
  )
}

export default Orders;
