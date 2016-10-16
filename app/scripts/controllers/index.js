'use strict';

/**
 * @ngdoc function
 * @name letsArgueApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the letsArgueApp
 */
angular.module('letsArgueApp')
  .controller('IndexCtrl', ["auth", "$scope", "$location", function (auth, $scope, $location) {

    $scope.logout = function () {
      auth.$signOut();
      console.log('logged out');
      $location.path('/login');
      $scope.authData = null;
    };

  }]);
