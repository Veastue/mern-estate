import express from 'express'
import { signin, signup, googlesignin, signout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/googlesignin", googlesignin);
router.get('/signout', signout)

export default router;