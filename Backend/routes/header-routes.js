import express from 'express';
import admin from '../schema/admin.js';
import verifyUser from '../middleware/AuthToken.js';

const router = express.Router();

router.get('/adminName', verifyUser, async (req, res) => {
  try {
    // Find the admin by userId which was set in the verifyUser middleware
    const adminData = await admin.findById(req.userId);
    console.log('Admin data:', adminData);

    if (!adminData) {
      return res.status(404).json({ success: false, error: 'Admin not found' });
    }

    // Send admin name if found
    res.json({ adminName: adminData.adminName, success: true });
  } catch (err) {
    console.error('Error fetching admin data:', err);
    res.status(500).send('Failed to retrieve admin name');
  }
});


router.post('/logout', verifyUser, async function(req, res) {
  try {
      const user = await admin.findOne({ loggedIn: true });
      if (user) {
          user.loggedIn = false;
          await user.save();
      }
      res.clearCookie('token').sendStatus(200);
  } catch (err) {
      console.error(err);
      res.status(500).send('Failed to logout');
  }
});

export default router;
