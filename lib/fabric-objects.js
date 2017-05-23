import { Mongo } from 'meteor/mongo'

class Collection extends Mongo.Collection {
    // getAll() {
    //     return this.find().fetch();
    // }

    async genInsert(doc) {
        return new Promise((resolve, reject) => {
            this.insert(doc, (error, result) => {
                if(error) reject(error);
                else resolve(result);
            })
        });
    }

    async genUpdate(id, doc) {
        return new Promise((resolve, reject) => {
            this.update(id, doc, (error, result) => {
                if(error) reject(error);
                else resolve(result);
            })
        });
    }

    async genRemove(id, doc) {
        return new Promise((resolve, reject) => {
            this.remove(id, (error, result) => {
                if(error) reject(error);
                else resolve(result);
            })
        });
    }
}

export default new Collection('fabricObjects');
