import {MongoClient} from 'mongodb';

const url = 'mongodb://localhost:27017';
const db = 'local';

export default new Promise((resolve, reject) => MongoClient.connect(url, {useUnifiedTopology: true}).then(client => resolve(client.db(db))).catch(err => reject(err)));