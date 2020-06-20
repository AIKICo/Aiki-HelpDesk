<template>
   <v-container>
       <v-row>
           <v-col>
               <div style="direction: ltr !important;">
                   <js-charting :options="options" class="ltr" ref="chart"></js-charting>
               </div>
           </v-col>
       </v-row>
   </v-container>
</template>

<script>
    export default {
        name: "scatterChart",
        data(){
            return {
                name: "columnChart",
                options: {
                    type: 'line',
                    title_label_text: 'درخواست کارهای سی روز اخیر',
                    legend_position: 'inside bottom right',
                    xAxis: { scale_type: 'time' },
                    series: [
                        {
                            name: 'Purchases',
                            points: [
                                ['1/1/2020', 29.9],
                                ['1/2/2020', 71.5],
                                ['1/3/2020', 106.4],
                                ['1/6/2020', 129.2],
                                ['1/7/2020', 144.0],
                                ['1/8/2020', 176.0]
                            ]
                        }
                    ]
                }
            }
        },
    }
</script>

<style scoped>
</style>