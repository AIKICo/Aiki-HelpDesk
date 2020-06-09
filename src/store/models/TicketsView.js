import { Model } from '@vuex-orm/core'

export default class TicketsView extends Model{
    static entity = 'ticketsView'
    static primaryKey = 'id'

    static fields() {
        return {
            id: this.attr(''),
            companyid: this.attr(''),
            registerdate: this.attr(''),
            enddate: this.attr(''),
            description: this.attr(''),
            tickettype: this.attr(null),
            ticketcategory: this.attr(null),
            tickettags: this.attr(null),
            asset: this.attr(''),
        }
    }
}