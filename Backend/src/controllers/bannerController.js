const prisma = require('../config/db');
const fs = require('fs');
const path = require('path');

const getAllBanners = async (req, res) => {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(banners);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const createBanner = async (req, res) => {
  try {
    const { title, link, is_active } = req.body;
    let image_url = '';

    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;
    } else {
      return res.status(400).json({ message: 'Image is required' });
    }

    const newBanner = await prisma.banner.create({
      data: {
        title,
        link,
        image_url,
        is_active: is_active === 'true' || is_active === true
      }
    });

    res.json(newBanner);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, link, is_active } = req.body;

    let banner = await prisma.banner.findUnique({ where: { id: parseInt(id) } });
    if (!banner) return res.status(404).json({ message: 'Banner not found' });

    let image_url = banner.image_url;
    if (req.file) {
      // delete old image
      const oldImagePath = path.join(__dirname, '../../public', banner.image_url);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      image_url = `/uploads/${req.file.filename}`;
    }

    banner = await prisma.banner.update({
      where: { id: parseInt(id) },
      data: {
        title,
        link,
        image_url,
        is_active: is_active === 'true' || is_active === true || is_active === undefined ? banner.is_active : false
      }
    });

    res.json(banner);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await prisma.banner.findUnique({ where: { id: parseInt(id) } });
    if (!banner) return res.status(404).json({ message: 'Banner not found' });

    // delete image
    const imagePath = path.join(__dirname, '../../public', banner.image_url);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await prisma.banner.delete({ where: { id: parseInt(id) } });

    res.json({ message: 'Banner removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllBanners,
  createBanner,
  updateBanner,
  deleteBanner
};
