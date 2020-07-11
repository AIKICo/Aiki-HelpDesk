import {Model} from "@vuex-orm/core";

export default class OrganizeCharts_JsonView extends Model {
    static entity = "OrganizeCharts_JsonView";
    static primaryKey = "id";

    static field() {
        return {
            id: this.attr(null),
            organizecharts: this.attr(""),
            allowdelete: this.attr("")
        }
    }
}