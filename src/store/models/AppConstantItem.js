import {Model} from "@vuex-orm/core";

export default class AppConstantItem extends Model{
    static entity = "appConstantItems";
    static primaryKey = ["id","companyid"];

    static fields() {
        return {
            id: this.attr(null),
            appconstantid: this.attr(null),
            value1: this.attr(""),
            value2: this.attr(""),
            allowdelete:this.boolean(null),
            additionalinfo: this.attr([])
        };
    }
}