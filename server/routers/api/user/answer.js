import {Router} from 'express';
import Answer from "../../../model/Answer";

const router = Router();

router.post('/', async (req, res) => {
    try{
        res.send(JSON.stringify({_id: await Answer.putAnswer({...req.body.answer})}));
    }
    catch (e) {
        console.log(e.message);
        res.sendStatus(400);
    }
});

router.get('/:id', async (req, res) => {
    try{
        res.send(JSON.stringify({...await Answer.getAnswersByFormId(req.params.id)}))
    }
    catch (e) { 
        console.log(e.message);
        res.sendStatus(400);
    }
})

export default router;