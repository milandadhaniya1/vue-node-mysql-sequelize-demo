import express from 'express';
import resultController from './../controllers/resultController.mjs';
const router = express.Router();

router.get('/', async (req, res) => {
  await resultController.getResultSummary(req, res);
});
router.get('/details', async (req, res) => {
  await resultController.getResultDetails(req, res);
});
router.post('/update', async (req, res) => {
  await resultController.updateOrCreateResult(req, res);
});
router.post('/delete', async (req, res) => {
  await resultController.deleteResult(req, res);
});

export default router;
