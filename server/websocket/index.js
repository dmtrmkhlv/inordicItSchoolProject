import io from 'socket.io';
import TokensModel from '../model/Tokens';

const ws = io();

export const users = {};

ws.on('connection', ws => {
    console.log(ws);
    ws.on('auth', async ({token}) => {
        try{
            console.log(token);
            const userId = await TokensModel.getUserIdByToken(token);
            users[userId] = ws;
        }
        catch(e){
            ws.close();
        }
    })
});

export default ws;