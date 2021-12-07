import express, {Router} from 'express';
import api from './api';
import Users from "../model/Users";
import Tokens from "../model/Tokens";
import Codes from '../model/Codes';

const router = Router();

router.use('/api', api);

router.post('/auth', async (req, res) => {
    try{
        const user = await Users.getUser(req.body.login, req.body.password);
        res.send(JSON.stringify({token: await Tokens.createToken(user._id), name: user.name}));
    }
    catch (e) {
        console.log(e.message);
        res.sendStatus(400);
    }
});

router.get('/check', async(req, res) => {
    try {
        res.send(JSON.stringify({res: await Tokens.checkToken(req.headers.token)}));
    }
    catch (e) {
        console.log(e.message);
        res.sendStatus(403);
    }
});

router.post('/registration', async (req, res) => {
    try {
        const userId = await Users.createUser(req.body);
        res.send(JSON.stringify({token: await Tokens.createToken(userId)}));
    }
    catch (e) {
        console.log(e.message);
        res.sendStatus(400);
    }
});

router.post('/restore', async (req, res) => {
    try {
        res.send(JSON.stringify({code: await Codes.createCode(req.body.login)}));
    }
    catch (e) {
        console.log(e.message);
        res.sendStatus(400);
    }
});

router.post('/newpass', async (req, res) => {
    try {
        await Codes.checkCode(req.body.code, req.body.login);
        await Users.newPasswordForUserByLogin(req.body.login, req.body.password);
        await Codes.deactivatedCode(req.body.code);
        res.sendStatus(200);
    }
    catch (e) {
        console.log(e.message);
        res.sendStatus(400);
    }
});

router.use('/', express.static(__dirname + '/public'));

router.use('*', ( req, res) => {
    res.sendFile('/public/index.html');
});

export default router;