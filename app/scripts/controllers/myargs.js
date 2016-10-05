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
                valueFormat: function(d){
                    return d3.format('4f')(d);
                },
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

        
        $scope.myargs = null;
        
        
        $scope.args = null;

    // synchronize a read-only, synchronized array of args, limit to most recent 10
    var argsRef = firebase.database().ref("args").orderByChild('userId').equalTo(currentAuth.uid);
    
    $scope.chartData = null;
    setupCharts(argsRef);

    var myargs = $firebaseArray(argsRef);

    myargs.$loaded().then(function () {
        $scope.myargs = myargs;
    }).catch(alert);

     // provide a method for adding a args
    $scope.addArg = function (newArg) {
      if (newArg) {
        // push args to the end of the array
        $scope.myargs.$add({
          text: newArg,
          user: currentAuth.displayName,
          userId: currentAuth.uid,
          agreeVotes: 0,
          disagreeVotes: 0
        })
          .catch(alert);
      }
    };
    
    function setupCharts(argsRef) {
        $scope.chartData = [];
        argsRef.once("value")
                .then(function (snapshot) {
                    snapshot.forEach(function (item) {

                        var itemVal = item.val();

                        $scope.chartData.push([
                            {
                                key: "Agree",
                                y: itemVal.agreeVotes
                            },
                            {
                                key: "Disagree",
                                y: itemVal.disagreeVotes
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
