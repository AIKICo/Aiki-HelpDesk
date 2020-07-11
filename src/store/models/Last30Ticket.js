import {Model} from '@vuex-orm/core'

export default class Member extends Model {
    static entity = 'last30Ticket';
    static primaryKey = "id";

    static fields() {
        return {
            id:  this.attr(null),
            da: this.string(''),
            count: this.attr(null),
            allowdelete:this.boolean(null)
        }
    }
}