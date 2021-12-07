import db from './connection';
import {randomBytes} from 'crypto';
import moment from 'moment';

const collection = (async () => (await db).collection('tokens'))();

export default class TokensModel {
    static async createToken(userId) {
        const token = randomBytes(16).toString('hex');
        await (await collection).insertOne({token, userId, expires: moment().add(1, 'y').valueOf()});
        return token;
    }

    static async checkToken(token) {
        const res = await (await collection).findOne({token, expires: {$gt: moment().valueOf()}});
        if(res) {
            return true;
        }
        throw new Error('Token incorrect!');
    }

    static async getUserIdByToken(token){
        const res = await (await collection).findOne({token, expires: {$gt: moment().valueOf()}});
        if(res) {
            return res.userId;
        }
        throw new Error('Active token not found!');
    }
}