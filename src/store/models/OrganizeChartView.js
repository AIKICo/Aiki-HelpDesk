import {Model} from "@vuex-orm/core";

export default class OrganizeChartView extends Model {
    static entity = "organizechartsview";
    static primaryKey = "id";

    static field() {
        return {
            id: this.attr(null),
            customerid:this.attr(null),
            parent_id:this.attr(null),
            title: this.attr(''),
            titletype:this.attr(null),
            children:this.attr(''),
            allowdelete: this.attr("")
        }
    }
}