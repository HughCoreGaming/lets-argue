'use strict';

/**
 * @ngdoc function
 * @name letsArgueApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the letsArgueApp
 */
angular.module('letsArgueApp')

   .controller('MainCtrl', ["auth", "$scope", "$location", "$firebaseArray", "$timeout", function (auth, $scope, $location, $firebaseArray, $timeout) {


        
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
            return d3.format(',.4f')(d);
        },
        transitionDuration: 500,
        xAxis: {
            axisLabel: 'X Axis'
        },
        yAxis: {
            axisLabel: 'Y Axis',
            axisLabelDistance: 30
        }
    }
};

$scope.chartData = [{
    key: "Votes",
    values: [
        { "label" : "Agree" , "value" : 0 },
        { "label" : "Disagree" , "value" : 0 },
        ]
    }]

  

    // synchronize a read-only, synchronized array of args, limit to most recent 10
    var query = rootRef.child('args');
    var args = $firebaseArray(query);
    
      args.$loaded()
      .then(function () {
        $scope.args = args;
      }).catch(alert);
      
    var query = rootRef.child('votes');
    var votes = $firebaseArray(query);

    votes.$loaded()
      .then(function () {
        $scope.votes = votes;
      })
      .catch(alert);
      
    $scope.updateChartScope = function (argee, disagree) {
        
        $scope.chartData = [{
                key: "Votes",
                values: [
                    {"label": "Agree", "value": argee},
                    {"label": "Disagree", "value": disagree},
                ]
            }]

        
    };
    


    $scope.logout = function () {
      auth.$signOut();
      console.log('logged out');
      $location.path('/login');
      $scope.authData = null;
    };
    
    function alert(msg) {
      $scope.err = msg;
      console.log(msg);
      $timeout(function () {
        $scope.err = null;
      }, 5000);
    }

  }]);
