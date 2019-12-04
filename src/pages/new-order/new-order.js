import React, { useEffect, useState } from 'react'
import { Button, Form, Input, PageHeader, Select, Spin } from 'antd'
import { getPizzas, createOrder } from '../../services/api'
import { useParams, useHistory } from 'react-router-dom'
import './new-order.css'

function NewOrder(props) {
  const [pizzas, setPizzas] = useState([])
  const [loading, setLoading] = useState(true)
  const { getFieldDecorator } = props.form
  const { pizzaId } = useParams()
  const history = useHistory()

  useEffect(() => {
    const getPizzasFunction = async () => {
      const pizzasList = await getPizzas()
      setPizzas(pizzasList)
      setLoading(false)
    }
    getPizzasFunction()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        await createOrder(values.pizza, values.address)
        history.push('/orders')
      }
    })
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  }
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  }

  return (
    <div style={{ padding: '20px' }}>
      {
        loading ? (
          <Spin className="spinner" />
        ) : (
          <React.Fragment>
            <PageHeader
              className="pageHeader"
              onBack={() => history.goBack()}
              title="Order a pizza"
            />
            <Form
              {...formItemLayout}
              onSubmit={handleSubmit}
              className="orderForm"
            >
              <Form.Item label="Select a pizza">
                {
                  getFieldDecorator('pizza', {
                    initialValue: pizzaId ? Number(pizzaId) : undefined,
                    rules: [
                      {
                        required: true,
                        message: 'Please select a pizza',
                      },
                    ],
                  })(
                    <Select
                      placeholder="Select a pizza"
                    >
                      {
                        pizzas.map(pizza => (
                          <Select.Option value={pizza.id} key={pizza.id}>{ pizza.name }</Select.Option>
                        ))
                      }
                    </Select>,
                  )
                }
              </Form.Item>
              <Form.Item label="Your address">
                {
                  getFieldDecorator('address', {
                    rules: [
                      {
                        required: true,
                        message: 'Please add an address',
                      },
                    ],
                  })(
                    <Input.TextArea placeholder="Where should we deliver it?" />,
                  )
                }
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  New Order
                </Button>
              </Form.Item>
            </Form>
          </React.Fragment>
        )
      }
    </div>
  )
}

const WrappedNewOrder = Form.create({ name: 'new-order' })(NewOrder)

export default WrappedNewOrder
