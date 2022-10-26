const express = require('express');
const { createProduct, getAllProducts, getOneProduct, deleteProduct, updateProduct } = require('../controllers/products');
const router = express.Router();

router.get('/', getAllProducts);
router.post('/', createProduct);
router.get('/:id', getOneProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);
router.patch('/:id', updateProduct);

module.exports = router;