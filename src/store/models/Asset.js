import {Model} from '@vuex-orm/core'

export default class Asset extends Model {
    static entity = "assets"
    static primaryKey="id"

    static fields() {
      return{
          id: this.uid(() => this.$uuid.v4()),
          companyid: this.attr(null),
          employeeid: this.uid(() => this.$uuid.v4()),
          assetlocationid: this.uid(() => this.$uuid.v4()),
          assettypeid: this.uid(() => this.$uuid.v4()),
          assetnumber: this.attr(''),
          assetadditionalinfo: this.attr([])
      };
    }
}