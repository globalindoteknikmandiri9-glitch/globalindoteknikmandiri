const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const { getDashboardStats } = require('../controllers/dashboardController');
const { getAllBanners, createBanner, updateBanner, deleteBanner } = require('../controllers/bannerController');
const { getProfile, updateProfile } = require('../controllers/profileController');

// All routes here are protected
router.use(authMiddleware);

// Dashboard
router.get('/dashboard', getDashboardStats);

// Profile
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

// Banners
router.get('/banners', getAllBanners);
router.post('/banners', upload.single('image'), createBanner);
router.put('/banners/:id', upload.single('image'), updateBanner);
router.delete('/banners/:id', deleteBanner);

const { getAllCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { getAllArticles, createArticle, updateArticle, deleteArticle } = require('../controllers/articleController');

// Categories
router.get('/categories', getAllCategories);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

// Products
router.get('/products', getAllProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Articles
router.get('/articles', getAllArticles);
router.post('/articles', upload.single('image'), createArticle);
router.put('/articles/:id', upload.single('image'), updateArticle);
router.delete('/articles/:id', deleteArticle);

module.exports = router;
