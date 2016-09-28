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

    // synchronize a read-only, synchronized array of args, limit to most recent 10
    var query = rootRef.child('args').limitToLast(10);
    var args = $firebaseArray(query);

    args.$loaded()
      .then(function () {
        $scope.args = args;
      })
      .catch(alert);

    // provide a method for adding a args
    $scope.addArg = function (newArg) {
      if (newArg) {
        // push args to the end of the array
        $scope.args.$add({
          text: newArg,
          user: currentAuth.displayName,
          userId: currentAuth.uid
        })
          .catch(alert);
      }
    };

    function alert(msg) {
      $scope.err = msg;
      console.log(msg);
      $timeout(function () {
        $scope.err = null;
      }, 5000);
    }
  }]);
