import { Model } from '@vuex-orm/core'

export default class Ticket extends Model{
    static entity = 'tickets'
    static primaryKey = 'id'

    static fields() {
        return {
            id: this.attr(''),
            registerdate: this.attr(''),
            enddate: this.attr(''),
            description: this.attr(''),
            tickettype: this.attr(null),
            ticketcategory: this.attr(null),
            tickettags: this.attr(null),
            asset: this.attr(''),
            ticketrate: this.attr(null),
            ticketfriendlynumber:this.attr(''),
            mandays:this.attr(null),
            operateid: this.attr(null),
            requestpriority:this.attr(''),
            customerid:this.attr(null),
            allowdelete:this.boolean(null),
            requester:this.attr('')
        }
    }
}
