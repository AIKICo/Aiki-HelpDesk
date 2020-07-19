<template v-slot:items="props">
    <v-container>
        <v-row>
            <v-col>
                <div class="hello" ref="chartdiv">
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapActions} from 'vuex'
    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4charts from "@amcharts/amcharts4/charts";
    import am4themes_material from "@amcharts/amcharts4/themes/material";
    import am4themes_animated from "@amcharts/amcharts4/themes/animated";

    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    export default {
        name: "scatterChart",
        data() {
            return {
                name: "columnChart",
            }
        },
        methods: {
            ...mapActions({
               getLast30Ticket:"TicketService/loadLast30Ticket"
            }),
            generateChart() {
                this.getLast30Ticket().then((res)=> {
                    let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

                    chart.paddingRight = 20;
                    chart.rtl = true;

                    let title = chart.titles.create();
                    title.text = "درخواست های سی روز اخیر";
                    title.fontSize = 20;
                    title.marginBottom = 30;

                    chart.data = res.data;

                    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                    categoryAxis.dataFields.category = "da";
                    categoryAxis.renderer.labels.template.rotation=-45;

                    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                    valueAxis.min = 1;

                    let series = chart.series.push(new am4charts.LineSeries());
                    series.dataFields.categoryX = "da";
                    series.dataFields.valueY = "count";

                    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
                    labelBullet.label.verticalCenter = "bottom";
                    labelBullet.label.dy = -10;
                    labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";

                    let circleBullet = series.bullets.push(new am4charts.CircleBullet());
                    circleBullet.property="radius";

                    chart.zoomOutButton.disabled = true;
                    this.chart = chart;
                });
            }
        },
        created() {
            this.generateChart();
        },
        beforeDestroy() {
            if (this.chart) {
                this.chart.dispose();
            }
        }
    }
</script>

<style scoped>
    .hello {
        width: 100%;
        height: 500px;
    }
</style>