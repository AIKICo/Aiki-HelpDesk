import {Model} from '@vuex-orm/core'

export default class User extends Model {
    // This is the name used as module name of the Vuex Store.
    static entity = 'users'
    static primaryKey = 'id'

    // List of all fields (schema) of the post model. `this.attr` is used
    // for the generic field type. The argument is the default value.
    static fields() {
        return {
            id: this.attr(''),
            membername: this.attr(''),
            username: this.attr(''),
            password: this.attr(''),
            roles: this.attr(''),
            email: this.attr(''),
            encryptedCompnayId:this.attr(""),
            allowdelete:this.boolean(null),
            disabled:this.attr(null)
        }
    }
}