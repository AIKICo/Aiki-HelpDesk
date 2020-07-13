import { Model } from "@vuex-orm/core"

export default class TicketsView extends Model{
    static entity = "ticketsView"
    static primaryKey = "id"

    static fields() {
        return {
            id: this.attr(""),
            registerdate: this.attr(""),
            enddate: this.attr(""),
            description: this.attr(""),
            tickettype: this.attr(null),
            ticketcategory: this.attr(null),
            tickettags: this.attr(null),
            asset: this.attr(""),
            ticketfriendlynumber: this.attr(""),
            agentname: this.attr(""),
            ticketrate:this.attr(null),
            mandays:this.attr(null),
            operateid: this.attr(null),
            requestpriority:this.attr(""),
            requester:this.attr(""),
            lasthistorycomment:this.attr(""),
            allowdelete:this.boolean(null),
            customerid:this.attr(null),
            customertitle:this.attr("")
        }
    }
}