import express from 'express';
import studentController from './../controllers/studentController.mjs';
const router = express.Router();

router.get('/', async (req, res) => {
  await studentController.getStudents(req, res);
});

export default router;
