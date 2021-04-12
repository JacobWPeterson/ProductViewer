const express = require('express');
const path = require('path');

const api = require('./api_handler.js');

const app = express();
const port = 3001;

const staticMiddleware = express.static(path.join(__dirname, '../client/dist'));

app.use(express.json());

app.use('/products/:q', staticMiddleware);

app.get('/products/:q/:b', (req, res) => {
  const memCache = [];
  const id = req.params.b;
  api.fetchData(`/products/${id}`, null, (productDetails) => {
    memCache.push(productDetails.data);
    api.fetchData(`/products/${id}/styles`, null, (productStyles) => {
      memCache.push(productStyles.data);
      api.fetchData('/reviews/meta', { params: { product_id: Number(id) } }, (reviewsMeta) => {
        memCache.push(reviewsMeta.data);
        res.send(memCache);
      });
    });
  });
});

app.listen(port);
