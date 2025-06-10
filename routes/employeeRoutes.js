import express from 'express';

const router = express.Router();

router.get('/employees', (req, res) => {
  res.json({ message: 'List of employees' });
});

export default router;
