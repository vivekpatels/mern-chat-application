import express from 'express'

const router = express.Router();

import  {sendMessage, getMessages} from '../controllers/message.controllers.js'
import protectRoute from '../middleware/protectRoute.js';

router.get('/:id', protectRoute, getMessages);
router.post('/send/:id', protectRoute, sendMessage);

export default router;