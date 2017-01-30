'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('letsArgueApp')
  .controller('AccountCtrl', ["$scope", "auth", "currentAuth", function (
    $scope,
    auth,
    currentAuth
  , $timeout 
  ) {

  $scope.user = {
    uid: currentAuth.uid,
    name: currentAuth.displayName,
    email: currentAuth.email
  };

    

    $scope.authInfo = currentAuth;
    
    $scope.changePassword = function(oldPass, newPass, confirm) {
      $scope.err = null;
      $scope.msg = null;

      if( !oldPass || !newPass ) {
        showError('Please enter all fields');

      } else if( newPass !== confirm ) {
        showError('Passwords do not match');

      } else {
        // New Method
        auth.$updatePassword(newPass).then(function() {
          showSuccess('Password changed');
        }, error);

      }
    };

    $scope.changeEmail = function (newEmail) {
        
        $scope.err = null;
      $scope.msg = null;
      
      auth.$updateEmail(newEmail)
        .then(function () {
          showSuccess("email changed successfully");
        })
        .catch(function (error) {
          showError(error.message);
        })
    };

    $scope.logout = function() {
      auth.$signOut();
    };

    function error(err) {
      console.log("Error: ", err);
    }

    function success(msg) {
      alert(msg, 'success');
    }
    
    function showError(err) {
      $scope.err = err;
    }
    
    function showSuccess(msg) {
      $scope.msg = msg;
    }

    function alert(msg, type) {
      var obj = {text: msg+'', type: type};
      $scope.messages.unshift(obj);
      $timeout(function() {
        $scope.messages.splice($scope.messages.indexOf(obj), 1);
      }, 10000);
    }

  $scope.updateProfile = function(name) {
      
      $scope.err = null;
      $scope.msg = null;
      
    firebase.auth().currentUser.updateProfile({
      displayName: name
    })
      .then(function () {
        showSuccess("updated");
      })
      .catch(function (error) {
        showError(error.message);
      })
  };

  }]);
