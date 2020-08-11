import {Model} from '@vuex-orm/core'

export default class Asset extends Model {
    static entity = "assets"
    static primaryKey="id"

    static fields() {
      return{
          id: this.uid(() => this.$uuid.v4()),
          employeeid: this.uid(null),
          assetlocationid: this.uid(null),
          assettypeid: this.uid(null),
          assetnumber: this.attr(''),
          assetadditionalinfo: this.attr([]),
          deliverydate:this.attr(null),
          allowdelete:this.boolean(null)
      };
    }
}
