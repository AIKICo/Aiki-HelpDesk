import {Model} from '@vuex-orm/core'

export default class Member extends Model {
    static entity = 'members';
    static primaryKey = "id";

    static fields() {
        return {
            id:  this.attr(null),
            companyid: this.attr(null),
            membername: this.attr(""),
            username: this.attr(""),
            password: this.attr(""),
            roles: this.attr(""),
            email: this.attr("")
        }
    }
}