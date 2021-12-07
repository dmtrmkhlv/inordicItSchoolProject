import {Router} from 'express';
import UsersModel from '../../model/Users';

const router = Router();

router.get('/', async (req, res)=> {
    try{
        res.send(JSON.stringify({users: (await UsersModel.getUsers()).filter(i => i._id.toString() !== req.userId)}))
    }catch (e){
        console.log(e.message);
        res.sendStatus(400);
    }
})

export default router;