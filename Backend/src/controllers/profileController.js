const prisma = require('../config/db');

const getProfile = async (req, res) => {
  try {
    let profile = await prisma.companyProfile.findFirst();
    if (!profile) {
      // Create empty profile if not exists
      profile = await prisma.companyProfile.create({
        data: {
          history: '',
          vision: '',
          mission: ''
        }
      });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const updateProfile = async (req, res) => {
  try {
    const { history, vision, mission, phone, email, address, map_url, whatsapp_number } = req.body;
    
    let profile = await prisma.companyProfile.findFirst();
    
    if (profile) {
      profile = await prisma.companyProfile.update({
        where: { id: profile.id },
        data: {
          history, vision, mission, phone, email, address, map_url, whatsapp_number
        }
      });
    } else {
      profile = await prisma.companyProfile.create({
        data: {
          history, vision, mission, phone, email, address, map_url, whatsapp_number
        }
      });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getProfile,
  updateProfile
};
