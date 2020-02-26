import { Model } from '@vuex-orm/core'

export default class Customer extends Model {
    static entity = 'customers';
    static primaryKey='id';

    static fields(){
        return {
            title: this.attr('')
        }
    }
}