'use strict';
/**
 * @ngdoc function
 * @name letsArgueApp.controller:MyargsCtrl
 * @description
 * # MyargsCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('letsArgueApp')
  .controller('Myargs', ["$scope", "currentAuth", "$firebaseArray", "$timeout", function ($scope, currentAuth, $firebaseArray, $timeout) {
    $scope.user = currentAuth;
    
    $scope.options = {
            chart: {
                type: 'pieChart',
                height: 500,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                }
            }
        };

        $scope.chartData = [
            {
                key: "Agree",
                y: 0
            },
            {
                key: "Disagree",
                y: 0
            }
        ];
        
        $scope.myargs = null;
        
        
        $scope.args = null;

    // synchronize a read-only, synchronized array of args, limit to most recent 10
    var query = rootRef.child('args').limitToLast(10);
    var args = $firebaseArray(query);

    args.$loaded().then(function () {
        $scope.args = args;
    })
      .catch(alert);
      
    var query = rootRef.child('args').orderByChild('userId').equalTo(currentAuth.uid);
 
    var myargs = $firebaseArray(query);

    myargs.$loaded().then(function () {
        $scope.myargs = myargs;
    }).catch(alert);

     // provide a method for adding a args
    $scope.addArg = function (newArg) {
      if (newArg) {
        // push args to the end of the array
        $scope.args.$add({
          text: newArg,
          user: currentAuth.displayName,
          userId: currentAuth.uid,
          agreeVotes: 0,
          disagreeVotes: 0
        })
          .catch(alert);
      }
    };
    
    $scope.updateChartScope = function (argee, disagree) {
        
        $scope.chartData = [
            {
                key: "Agree",
                y: argee
            },
            {
                key: "Disagree",
                y: disagree
            }
        ];

        
    };

    function alert(msg) {
      $scope.err = msg;
      console.log(msg);
      $timeout(function () {
        $scope.err = null;
      }, 5000);
    }
  }]);
