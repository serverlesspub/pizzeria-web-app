import rp from 'minimal-request-promise';

async function getPizzas() {
  const response = await rp.get('https://whpcvzntil.execute-api.eu-central-1.amazonaws.com/latest/pizzas')
  return JSON.parse(response.body);
}

async function getOrders() {
  const response = await rp.get('https://whpcvzntil.execute-api.eu-central-1.amazonaws.com/latest/orders')
  return JSON.parse(response.body);
}

async function createOrder(pizza, address) {
  console.log('Pizza:', pizza)
  console.log('Address:', address)
}

export {
  getPizzas,
  getOrders,
  createOrder
}
