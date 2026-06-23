const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const superAdminMiddleware = require('../middlewares/superAdminMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const { getDashboardStats } = require('../controllers/dashboardController');
const { getAllBanners, createBanner, updateBanner, deleteBanner } = require('../controllers/bannerController');
const { getProfile, updateProfile } = require('../controllers/profileController');
const { getAllUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');

// All routes here are protected
router.use(authMiddleware);

// Dashboard
router.get('/dashboard', getDashboardStats);

// Profile (Superadmin only)
router.get('/profile', superAdminMiddleware, getProfile);
router.put('/profile', superAdminMiddleware, upload.fields([{ name: 'about_image', maxCount: 1 }, { name: 'workshop_image', maxCount: 1 }, { name: 'logo', maxCount: 1 }]), updateProfile);

// Users (Superadmin only)
router.get('/users', superAdminMiddleware, getAllUsers);
router.post('/users', superAdminMiddleware, createUser);
router.put('/users/:id', superAdminMiddleware, updateUser);
router.delete('/users/:id', superAdminMiddleware, deleteUser);

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
router.post('/products', upload.single('image'), createProduct);
router.put('/products/:id', upload.single('image'), updateProduct);
router.delete('/products/:id', deleteProduct);

// Articles
router.get('/articles', getAllArticles);
router.post('/articles', upload.single('image'), createArticle);
router.put('/articles/:id', upload.single('image'), updateArticle);
router.delete('/articles/:id', deleteArticle);

module.exports = router;
