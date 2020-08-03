import {Model} from "@vuex-orm/core";

export default class ProfilePicture extends Model {
    static entity = "profilePitures";
    static primaryKey = "id";

    static fields() {
        return {
            id: this.attr(null),
            memberid: this.attr(""),
            filecontent: this.attr(null),
            filextension: this.attr(""),
            allowdelete:this.boolean(null)
        };
    }
}
