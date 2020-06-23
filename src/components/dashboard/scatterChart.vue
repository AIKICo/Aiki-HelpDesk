<template>
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
    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4charts from "@amcharts/amcharts4/charts";
    import am4themes_frozen from "@amcharts/amcharts4/themes/frozen";
    import am4themes_animated from "@amcharts/amcharts4/themes/animated";

    am4core.useTheme(am4themes_frozen);
    am4core.useTheme(am4themes_animated);
    export default {
        name: "scatterChart",
        data() {
            return {
                name: "columnChart",
            }
        },
        methods: {
            generateChart() {
                let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

                chart.paddingRight = 20;
                chart.rtl = true;
                chart.data = [{
                    "country": "1399/01/01",
                    "visits": 2025
                }, {
                    "country": "1399/01/02",
                    "visits": 1882
                }, {
                    "country": "1399/01/03",
                    "visits": 1809
                }, {
                    "country": "1399/01/04",
                    "visits": 1322
                }, {
                    "country": "1399/01/05",
                    "visits": 1122
                }, {
                    "country": "1399/01/06",
                    "visits": 1114
                }, {
                    "country": "1399/01/07",
                    "visits": 984
                }, {
                    "country": "1399/01/08",
                    "visits": 711
                }, {
                    "country": "1399/01/09",
                    "visits": 665
                }, {
                    "country": "1399/01/10",
                    "visits": 580
                }, {
                    "country": "1399/01/11",
                    "visits": 443
                }, {
                    "country": "1399/01/12",
                    "visits": 441
                }];

                let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.renderer.grid.template.location = 0;
                categoryAxis.dataFields.category = "country";
                categoryAxis.renderer.minGridDistance = 60;
                categoryAxis.renderer.inversed = true;
                categoryAxis.renderer.labels.template.rotation=-45;

                let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.min = 0;
                valueAxis.extraMax = 0.1;

                let series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.categoryX = "country";
                series.dataFields.valueY = "visits";

                let labelBullet = series.bullets.push(new am4charts.LabelBullet());
                labelBullet.label.verticalCenter = "bottom";
                labelBullet.label.dy = -10;
                labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";

                chart.zoomOutButton.disabled = true;

                this.chart = chart;
            }
        },
        mounted() {
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