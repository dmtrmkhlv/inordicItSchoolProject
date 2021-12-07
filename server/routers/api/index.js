import {Router} from 'express';
import formsRouter from './user/user';
import formRouter from './user/form';
import answerRouter from './user/answer';
import usersRouter from './users';
import Tokens from "../../model/Tokens";

const router = Router();

router.use('/', async (req, res, next) => {
    try {
        const userId = await Tokens.getUserIdByToken(req.headers.token);
        if (userId) {
            req.userId = userId;
            next();
        }
        else{
            res.sendStatus(403);
        }
    }
    catch(e){
        console.log(e.message);
    }
});

router.use('/user/answer', answerRouter);
router.use('/user/form', formRouter);
router.use('/user/user', formsRouter);
router.use('/users', usersRouter);

export default router;