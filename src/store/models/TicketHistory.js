import { Model } from '@vuex-orm/core'

export default class TicketHistory extends Model{
    static entity = 'tickethistory'
    static primaryKey = 'id'

    static fields() {
        return {
            id: this.attr(null),
            historydate: this.attr(''),
            historycomment: this.attr(''),
            agentname: this.attr(''),
            ticketid: this.attr(null),
            allowdelete:this.boolean(null)
        }
    }
}