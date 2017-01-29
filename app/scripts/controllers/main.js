'use strict';

/**
 * @ngdoc function
 * @name letsArgueApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the letsArgueApp
 */
angular.module('letsArgueApp')

   .controller('MainCtrl', ["auth", "$scope", "$location", "$firebaseArray", "$timeout", "$anchorScroll", function (auth, $scope, $location, $firebaseArray, $timeout, $anchorScroll) {


        
$scope.options = {
    chart: {
        type: 'discreteBarChart',
        height: 450,
        autoResize: true,
        margin : {
            top: 20,
            right: 20,
            bottom: 60,
            left: 55
        },
        x: function(d){ return d.label; },
        y: function(d){ return d.value; },
        showValues: true,
        valueFormat: function(d){
            return d3.format('4f')(d);
        },
        transitionDuration: 500,
        xAxis: {
            axisLabel: 'Votes'
        },
        yAxis: {
            axisLabel: 'Count',
            axisLabelDistance: 30
        }
    }
};

    $scope.argueShow = 5;

    var argsRef = firebase.database().ref("args").limitToFirst($scope.argueShow);
    var votesRef = firebase.database().ref("votes");
    
    $scope.chartData = null;
    setupCharts(argsRef);

    var args = $firebaseArray(argsRef);
    var votes = $firebaseArray(votesRef);
 
    args.$loaded()
    .then(function () {
      $scope.args = args;
      $scope.argsLength = $scope.args.length;
      
      $timeout(function () {
            $scope.collapsed=!$scope.collapsed;
        }, 40);
      
    }).catch(alert);

    votes.$loaded()
      .then(function () {
        $scope.votes = votes;
      })
      .catch(alert);
      
    $scope.argumentShow = function (action) {
        var argueShow = $scope.argueShow;
        var argsLength = $scope.argsLength;
        if (action === "down" && argueShow <= argsLength) {
            argueShow++;
        } else if (action === "up" && argueShow > 1) {
            argueShow--;
        }

        argsRef = firebase.database().ref("args").orderByKey().limitToFirst(argueShow);
        args = $firebaseArray(argsRef);
        args.$loaded()
                .then(function () {
                    $scope.args = args;
                    $scope.argsLength = $scope.args.length;
                    $scope.argueShow = argueShow;
                    $scope.collapsed=!$scope.collapsed;
                    setupCharts(argsRef);
                    $timeout(function () {
                        $scope.collapsed=!$scope.collapsed;
                        $location.hash('scrollAnchor');
                        $anchorScroll();
                    }, 40);
               
                }).catch(alert);
    }

    function setupCharts(argsRef) {
        $scope.chartData = [];
        argsRef.once("value")
                .then(function (snapshot) {
                    snapshot.forEach(function (item) {

                        var itemVal = item.val();

                        $scope.chartData.push([
                            {
                                key: "Cumulative Return",
                                values: [
                                    {
                                        "label": "Agree",
                                        "value": itemVal.agreeVotes
                                    },
                                    {
                                        "label": "Disagree",
                                        "value": itemVal.disagreeVotes
                                    }
                                ]
                            }
                        ]);
                    });
                });        
    }
    
    function alert(msg) {
      $scope.err = msg;
      console.log(msg);
      $timeout(function () {
        $scope.err = null;
      }, 5000);
    }

  }]);
