import { Model } from '@vuex-orm/core'

export default class TicketCountInfo extends Model{
    static entity = 'ticketcountinfo'
    static primaryKey = 'id'

    static fields() {
        return {
            id: this.attr(null),
            tickettype: this.attr(null),
            count:this.attr(0),
            allowdelete:this.attr(false)
        }
    }
}