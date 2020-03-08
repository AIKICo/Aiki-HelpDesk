import { Model } from '@vuex-orm/core'

export default class Customer extends Model {
    static entity = 'customers';
    static primaryKey='id';

    static fields(){
        return {
            id: this.uid(()=> this.$uuid.v4()),
            companyid: this.attr(null),
            title: this.attr(''),
            description: this.attr(null),
            domains: this.attr(null),
            schema: this.attr(null),
            disabled:this.attr(null)
        }
    }
}