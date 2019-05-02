(function () {
    'use strict';

    angular.module('myApp')
        .controller('analysisCtrl', function ($scope) {

            $scope.duration = [
                "Daily",
                "Weekly",
                "Monthly",
                "Quaterly",
                "Yearly"
            ];

            $scope.options = {
                chart: {
                    type: 'discreteBarChart',
                    height: 450,
                    margin : {
                        top: 50,
                        right: 20,
                        bottom: 40,
                        left: 55
                    },
                    x: function(d){return d.label;},
                    y: function(d){return d.value + (1e-10);},
                    showValues: true,
                    valueFormat: function(d){
                        return d3.format(',.4f')(d);
                    },
                    duration: 500,
                    xAxis: {
                        axisLabel: 'Food Items'
                    },
                    yAxis: {
                        axisLabel: 'Rating',
                        axisLabelDistance: -10
                    }
                }
            };

            $scope.data = [
                {
                    key: "Cumulative Return",
                    values: [
                        {
                            "label" : "Idli" ,
                            "value" : 4.3
                        } ,
                        {
                            "label" : "Sambar" ,
                            "value" : 2
                        } ,
                        {
                            "label" : "Dal" ,
                            "value" : 4.1
                        } ,
                        {
                            "label" : "Rice" ,
                            "value" : 4.2
                        } ,
                        {
                            "label" : "Roti" ,
                            "value" : 1.2
                        } ,
                        {
                            "label" : "Rajma curry" ,
                            "value" : 1.5
                        } ,
                        {
                            "label" : "Panner curry" ,
                            "value" : 3.2
                        } ,
                        {
                            "label" : "Bread" ,
                            "value" : 3.1
                        },
                        {
                            "label" : "Soya rice" ,
                            "value" : 2.2
                        } ,
                        {
                            "label" : "Soya chunks" ,
                            "value" : 2.5
                        } ,
                        {
                            "label" : "Veg curry" ,
                            "value" : 0.2
                        } ,
                        {
                            "label" : "Poha" ,
                            "value" : 3.6
                        } ,
                        {
                            "label" : "Masala Dosha" ,
                            "value" : 2.1
                        } ,
                        {
                            "label" : "Plain Dosha" ,
                            "value" : 1.3
                        }
                    ]
                }
            ]
        });
})();
