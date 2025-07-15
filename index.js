const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const YAMPI_BASE_URL = 'https://api.yampi.com.br';
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.YAMPI_TOKEN;

const yampiRequest = async (req, res, path) => {
  try {
    const response = await axios.get(\`\${YAMPI_BASE_URL}\${path}\`, {
      headers: {
        Authorization: \`Bearer \${TOKEN}\`
      },
      params: req.query
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: true,
      details: err.response?.data || err.message
    });
  }
};

app.get('/orders', (req, res) => yampiRequest(req, res, '/orders'));
app.get('/orders/:id', (req, res) => yampiRequest(req, res, \`/orders/\${req.params.id}\`));
app.get('/products', (req, res) => yampiRequest(req, res, '/products'));
app.get('/customers', (req, res) => yampiRequest(req, res, '/customers'));
app.get('/transactions', (req, res) => yampiRequest(req, res, '/transactions'));

app.listen(PORT, () => {
  console.log(\`Proxy rodando em http://localhost:\${PORT}\`);
});
