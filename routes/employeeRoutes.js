import express from 'express';

const router = express.Router();

router.get('/employees', (req, res) => {
  res.json({ message: 'Employees list' });
});

export default router;
