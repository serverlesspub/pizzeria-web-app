import rp from 'minimal-request-promise';

const API_URL = 'https://whpcvzntil.execute-api.eu-central-1.amazonaws.com/latest'

async function getPizzas() {
  const response = await rp.get(`${API_URL}/pizzas`)
  return JSON.parse(response.body);
}

async function getOrders() {
  const response = await rp.get(`${API_URL}/orders`)
  return JSON.parse(response.body);
}

async function createOrder(pizza, address) {
  const response = await rp.post(`${API_URL}/orders`, {
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

export {
  getPizzas,
  getOrders,
  createOrder
}
