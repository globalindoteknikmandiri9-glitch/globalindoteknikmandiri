const prisma = require('../config/db');

const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        images: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const createProduct = async (req, res) => {
  try {
    const { categoryId, name, description, specification, status } = req.body;
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Date.now();

    const newProduct = await prisma.product.create({
      data: {
        categoryId: parseInt(categoryId),
        name,
        slug,
        description,
        specification,
        status
      }
    });

    res.json(newProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryId, name, description, specification, status } = req.body;
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Date.now();

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        categoryId: parseInt(categoryId),
        name,
        slug,
        description,
        specification,
        status
      }
    });

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
};
