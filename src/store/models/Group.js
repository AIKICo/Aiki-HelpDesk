import { Model} from "@vuex-orm/core";

export default class Group extends Model{
    static entity="groups";
    static primaryKey="id";

    static fields() {
        return {
            id: this.attr(null),
            title: this.attr(""),
            description: this.attr(""),
            operatinghourid: this.attr(null),
            agents: this.attr(""),
            leader: this.attr(""),
            supportemail: this.attr(""),
            allowdelete:this.boolean(null)
        }
    }
}