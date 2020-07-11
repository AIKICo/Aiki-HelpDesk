import {Model} from "@vuex-orm/core";

export default class OperatingHour extends Model {
    static entity = "operationHours";
    static primaryKey = "id";

    static fields() {
        return {
            id: this.attr(""),
            title: this.attr(""),
            timezone: this.attr(""),
            workdays: this.attr([]),
            holidays: this.attr([]),
            isdefault: this.attr(null),
            allowdelete:this.boolean(null)
        };
    }
}
