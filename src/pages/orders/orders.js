import React, { useEffect, useState } from 'react'
import { Empty, Spin, Table, Tag } from 'antd'
import { getPizzas, getOrders } from '../../services/api'
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
    const getOrdersFunction = async () => {
      const ordersList = await getOrders()
      console.log(ordersList)
      setOrders(ordersList)
      setLoading(loading => ({
        ...loading,
        orders: false
      }))
    }
    getOrdersFunction()
    getPizzasFunction()
  }, []);

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
            <Table
              rowKey={row => row.orderId}
              columns={columns}
              dataSource={parseOrders(orders, pizzas)}
              pagination={false}
            />
          )
        )
      }
    </div>
  )
}

export default Orders;
