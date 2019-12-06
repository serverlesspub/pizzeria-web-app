import rp from 'minimal-request-promise';
import config from '../config'

async function getPizzas() {
  const response = await rp.get(`${config.apiUrl}/pizzas`)
  return JSON.parse(response.body);
}

async function getOrders(token) {
  const response = await rp.get(`${config.apiUrl}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  return JSON.parse(response.body);
}

async function createOrder(pizza, address) {
  const response = await rp.post(`${config.apiUrl}/orders`, {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      pizza,
      address
    })
  });

  console.log(response)
  return response
}

async function deleteOrder(orderId) {
  const response = await rp.delete(`${config.apiUrl}/orders/${orderId}`)
  console.log(response);
  return response;
}

export {
  getPizzas,
  getOrders,
  createOrder,
  deleteOrder
}
