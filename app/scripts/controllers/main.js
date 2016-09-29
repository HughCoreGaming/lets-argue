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

    // synchronize a read-only, synchronized array of args, limit to most recent 10
    var query = rootRef.child('args').limitToLast(10);
    var args = $firebaseArray(query);
    
      args.$loaded()
      .then(function () {
        $scope.args = args;
      })
      .catch(alert);
      
    var query = rootRef.child('votes');
    var votes = $firebaseArray(query);

    votes.$loaded()
      .then(function () {
        $scope.votes = votes;
      })
      .catch(alert);

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
