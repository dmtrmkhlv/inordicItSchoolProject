import {ObjectID} from 'mongodb';
import db from './connection';
import moment from 'moment';

const collection = (async () => (await db).collection('answers'))();

export default class AnswerModel {

    static async putAnswer(answer){
        const res = await (await collection).insertOne({...answer});
        return res;
    }

    static getAnswersByFormId(formId){
        return new Promise(async resolve => (await collection).find({formId: formId}).toArray((err, answers) => {
            resolve({answers});
        }));
    }

}