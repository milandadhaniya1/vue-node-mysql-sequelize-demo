import express from 'express';
import examController from './../controllers/examController.mjs';
const router = express.Router();

router.get('/', async (req, res) => {
  await examController.getExams(req, res);
});

export default router;
