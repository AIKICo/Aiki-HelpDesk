import {Model} from "@vuex-orm/core";

export default class SLASetting extends Model {
    static entity = "slaSettings";
    static primaryKey = "id";

    static fields() {
        return {
            id: this.uid(() => this.$uuid.v4()),
            title: this.attr(""),
            description: this.attr(""),
            operatinghourid: this.attr(null),
            targetspriority: this.attr([]),
            requesttypepriority: this.attr([]),
            allowdelete:this.boolean(null)
        };
    }
}
