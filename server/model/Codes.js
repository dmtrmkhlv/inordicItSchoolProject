import db from './connection';
import {randomBytes} from 'crypto';
import moment from 'moment';

const collection = (async () => (await db).collection('codes'))();

export default class Codes {
    static async createCode(login) {
        const code = randomBytes(8).toString('hex');
        await (await collection).insertOne({code, login, expires: moment().add(10, 'm').valueOf()});
        return code;
    }

    static async checkCode(code, login) {
        const res = await (await collection).findOne({code, login, expires: {$gt: moment().valueOf()}});
        if(res) {
            return true;
        }
        throw new Error('Code incorrect!');
    }

    static async deactivatedCode(code) {
        await (await collection).updateOne({code}, {$set: {expires: 0}});
        return true;
    }
}