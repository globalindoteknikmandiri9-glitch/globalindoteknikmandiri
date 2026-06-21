const prisma = require('../config/db');

const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await prisma.product.count();
    const totalCategories = await prisma.category.count();
    const totalArticles = await prisma.article.count();
    const totalBanners = await prisma.banner.count();

    res.json({
      totalProducts,
      totalCategories,
      totalArticles,
      totalBanners
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getDashboardStats
};
