import express from 'express'

const router = express.Router();

import  {sendMessage} from '../controllers/message.controllers.js'
import protectRoute from '../middleware/protectRoute.js';

router.post('/send/:id', protectRoute, sendMessage);

export default router;