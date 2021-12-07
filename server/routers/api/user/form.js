import {Router} from 'express';
import Forms from "../../../model/Forms";
import moment from 'moment';

const router = Router();

router.get('/:id', async (req, res) => {
    try{
        res.send(JSON.stringify(...await Forms.getFormById(req.params.id)))
    }
    catch (e) { 
        console.log(e.message);
        res.sendStatus(400);
    }
})

router.get('/', async (req, res) => {
    try{
        res.send(JSON.stringify({...await Forms.getFormsForUser(req.userId), date: +moment()}))
    }
    catch (e) {
        console.log(e.message);
        res.sendStatus(400);
    }
});
router.post('/', async (req, res) => {
    try{
        res.send(JSON.stringify({_id: await Forms.createForm({...req.body.form, userId: req.userId})}));
    }
    catch (e) {
        console.log(e.message);
        res.sendStatus(400);
    }
});

router.delete('/:id', async (req, res) => {
    try{
        await Forms.deleteForm(req.params.id);
        res.sendStatus(200);
    }
    catch (e) {
        console.log(e.message);
        res.sendStatus(400);
    }
});

router.put('/:id', async (req, res) => {
    try{
        await Forms.updateForm(req.params.id, {...req.body.form, userId: req.userId});
        res.sendStatus(200);
    }
    catch (e) {
        console.log(e.message);
        res.sendStatus(400);
    }
})

export default router;