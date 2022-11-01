const express = require('express');
const { createProduct, getAllProducts, getOneProduct, deleteProduct, updateProduct, loginUser } = require('../controllers/products');
const authorizeUser = require('../middleware/auth');
const router = express.Router();

router.get('/', authorizeUser, getAllProducts);
router.post('/', createProduct);
router.get('/:id', getOneProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);
router.patch('/:id', updateProduct);
router.post('/login', loginUser);

module.exports = router;