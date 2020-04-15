import { Model } from '@vuex-orm/core'

export default class OrganizeChart extends Model{
    static entity = "OrganizeCharts";
    static primaryKey = "id";

    static field(){
        return {
            id:  this.attr(null),
            parent_id:  this.attr(null),
            companyid: this.attr(null),
            title: this.attr(""),
            additionalinfo:this.attr([])
        }
    }
}