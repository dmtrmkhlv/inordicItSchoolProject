import {ObjectID} from 'mongodb';
import db from './connection';
import moment from 'moment';

const collection = (async () => (await db).collection('forms'))();

export default class FormModel {
    static getAllForms() {
        return new Promise(async resolve => (await collection).find({}).toArray((err, form) => resolve(form)));
    }

    static getFormById(formId){
        return new Promise(async resolve => (await collection).find({_id: ObjectID(formId)}).toArray((err, form) => {
            resolve(form);
        }));
    }

    static async createForm(form){
        const res = await (await collection).insertOne({...form, dateModify: moment().valueOf(), dateModify: 0});
        return res.insertedId.toString();
    }

    static getFormsForUser(userId){
        return new Promise(async resolve => (await collection).find({userId}).toArray((err, forms) => resolve({forms})));
    }

    static async deleteForm(id) {
        await (await collection).deleteOne({_id: ObjectID(id)});
        return true;
    }

    static async updateForm(id, form){
        await (await collection).updateOne(
            {_id: ObjectID(id)},
            {$set: {...form, dateModify: moment().valueOf()}}
        );
        return true;
    }

    static async getFreshFormsForUser(userId, dateLastRequest){
        const forms = await this.getFreshForms(userId, dateLastRequest);
        return {forms};
    }

    
    static async getFreshForms(userId, dateLastRequest){
        return new Promise(async resolve => (await collection).find({userId, dateModify: {$gt: dateLastRequest}})
        .toArray((err, forms) => resolve(forms)));
    }

}