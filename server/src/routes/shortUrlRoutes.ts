import express from 'express';
import {
  createUrl,
  deleteUrl,
  getAllUrls,
  getUrl,
  getUrlSSE,
} from '../controller/shortUrlController';

const router = express.Router();

router.post('/shortUrl', createUrl);
router.get('/shortUrl', getAllUrls);
router.get('/shortUrl/:shortUrl', getUrl);
router.get('/sse/:shortUrl', getUrlSSE);
router.delete('/shortUrl/:id', deleteUrl);

export default router;
