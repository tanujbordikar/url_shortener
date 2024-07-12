import express from 'express';
import { shorturl, fetchData, singleLink } from '../controllers/shorturl.js';

const router = express.Router();

router.post('/shorturl', shorturl);
router.get('/', fetchData);
router.get('/:shortUrl', singleLink);

export default router;
