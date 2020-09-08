import {Model} from '@vuex-orm/core'

export default class AssetsView extends Model{
    static entity = "assetsView"
    static primaryKey="id"

    static fields() {
        return{
            id: this.uid(() => this.$uuid.v4()),
            assetnumber: this.uid(""),
            title: this.uid(""),
            assetlocationid: this.uid(null),
            assettypeid: this.attr(''),
            deliverydate:this.attr(null),
            allowdelete:this.boolean(null),
            additionalinfo:this.attr('')
        };
    }
}
