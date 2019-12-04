import React, { useEffect, useState } from 'react'
import { Card, Col, Empty, List, Row, Spin, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { getPizzas } from '../../services/api'
import './pizzas.css'

function Pizzas() {
  const [pizzas, setPizzas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getPizzasFunction = async () => {
      const pizzasList = await getPizzas()
      console.log(pizzasList)
      setPizzas(pizzasList)
      setLoading(false)
    }
    getPizzasFunction()
  }, []);

  return (
    <div>
      {
        loading ? (
          <Spin className="spinner" />
        ) : (
          (pizzas.length < 1) ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No pizzas" />
          ) : (
            <Row
              type="flex"
              justify="space-around"
              style={{ padding: '30px' }}
            >
              {
                pizzas.map(pizza => (
                  <Col span={5} key={pizza.id}>
                    <Card
                      title={pizza.name}
                      extra={
                        <Link to={`/orders/new/${pizza.id}`}>Order</Link>
                      }
                      bordered={false}
                    >
                      <List
                        header={<Typography.Text strong>Ingredients:</Typography.Text>}
                        dataSource={pizza.ingredients}
                        renderItem={ingredient => (
                          <List.Item>❋ {ingredient}</List.Item>
                        )}
                      />
                    </Card>
                  </Col>
                ))
              }
            </Row>
          )
        )
      }
    </div>
  )
}

export default Pizzas;
