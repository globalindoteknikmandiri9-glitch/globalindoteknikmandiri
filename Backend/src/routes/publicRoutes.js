const express = require('express');
const router = express.Router();

const { 
  getPublicBanners, 
  getPublicProfile, 
  getPublicCategories, 
  getPublicProducts, 
  getPublicProductDetail, 
  getPublicArticles, 
  getPublicArticleDetail 
} = require('../controllers/publicController');

router.get('/banners', getPublicBanners);
router.get('/profile', getPublicProfile);
router.get('/categories', getPublicCategories);
router.get('/products', getPublicProducts);
router.get('/products/:slug', getPublicProductDetail);
router.get('/articles', getPublicArticles);
router.get('/articles/:slug', getPublicArticleDetail);

module.exports = router;
