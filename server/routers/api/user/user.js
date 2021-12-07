import {Router} from 'express';
import Forms from "../../../model/Forms";
import moment from 'moment';
import {users} from '../../../websocket';

const router = Router();

router.get('/:id', async (req, res) => {
    try{
        res.send(JSON.stringify({...await Forms.getFormsWithCommentsForUser(req.userId), date: +moment()}))
        console.log(req.userId);
    }
    catch (e) {
        console.log(e.message);
        res.sendStatus(400);
    }
})

router.get('/', async (req, res) => {
    try{
        res.send(JSON.stringify({...await Forms.getFormsWithCommentsForUser(req.userId), date: +moment()}))
    }
    catch (e) {
        console.log(e.message);
        res.sendStatus(400);
    }
}).post('/', async (req, res) => {
    try{
        res.send(JSON.stringify({_id: await Forms.createTask({...req.body.form, userId: req.userId})}));
    }
    catch (e) {
        console.log(e.message);
        res.sendStatus(400);
    }
});

router.post('/fresh', async (req, res) => {
    try{
        res.send(JSON.stringify({
            ...await Forms.getFreshFormsForUser(req.userId, +req.body.date), 
            date: +moment()
        }));
    }
    catch (e) {
        console.log(e.message);
        res.sendStatus(400);
    }
})

router.put('/:id', async (req, res) => {
    try{
        await Forms.updateTask(req.params.id, {...req.body.form, userId: req.userId});
        res.sendStatus(200);
    }
    catch (e) {
        console.log(e.message);
        res.sendStatus(400);
    }
}).delete('/:id', async (req, res) => {
    try{
        await Forms.deleteForm(req.params.id);
        res.sendStatus(200);
    }
    catch (e) {
        console.log(e.message);
        res.sendStatus(400);
    }
});

router.put('/charge/:id', async (req, res) => {
    try{
        await Forms.updateTask(req.params.id, {userId: req.body.userId});
        if( users && users[req.body.userId]){
            users[req.body.userId].emit('freshTask', await Forms.getTaskByIdWhithComments(req.params.id)); 
        }
        res.sendStatus(200);
    }
    catch (e){
        console.log(e.message);
        res.sendStatus(400);    
    }
})

export default router;