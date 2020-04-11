import {Model} from "@vuex-orm/core";

export default class AppConstantItem extends Model{
    static entity = "appConstantItems";
    static primaryKey = "id";

    static fields() {
        return {
            id: this.attr(null),
            appconstantid: this.attr(null),
            companyid:this.attr(null),
            value1: this.attr(""),
            value2: this.attr("")
        };
    }
}