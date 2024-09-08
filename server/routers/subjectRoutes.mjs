import express from 'express';
import subjectController from './../controllers/subjectController.mjs';
const router = express.Router();

router.get('/', async (req, res) => {
  await subjectController.getSubjects(req, res);
});

export default router;
