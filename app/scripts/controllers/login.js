'use strict';
/**
 * @ngdoc function
 * @name letsArgueApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('letsArgueApp')
  .controller('LoginCtrl', ["$scope", "auth", "$location", function ($scope, auth, $location) {

    $scope.loginBtn = true;
    $scope.logoutBtn = true;

    auth.$onAuthStateChanged(function (authData) {
        
      if (authData) {
        $scope.logoutBtn = true;
        $scope.loginBtn = false;
        $location.path('/account');
      }
    });



      // Autenthication with password and email
      $scope.passwordLogin = function (email, pass) {
          
        $scope.err = null;
        $scope.msg = null;

        auth.$signInWithEmailAndPassword(email, pass)
          .then(function (authData) {
              console.log("Auth Data: "+JSON.stringify(authData));
            redirect();
            showSuccess("logged in");
          })
          .catch(function (error) {
            showError(error.message);
          });
          
          auth.$signInWithEmailAndPassword
      };

      $scope.createAccount = function (email, pass, confirm) {
          
        $scope.err = null;
        $scope.msg = null;

        if (!pass) {
          $scope.err = 'Please enter a password';
        } else if (pass !== confirm) {
          $scope.err = 'Passwords do not match';
        } else {
          auth.$createUserWithEmailAndPassword(email, pass)
            .then(function (userData) {
              return userData;
            })
            .then(function (authData) {
              createProfile();
              redirect();
            })
            .catch(function (error) {
              showError(error);
            });
          }
        };

        //todo wait till SDK 3.x support comes up to test
        function createProfile(user) {

          // var query =
          var userObj = rootRef.child('users').child(user.uid);
          var def = $q.defer();
          ref.set({email: email, name: firstPartOfEmail(email)}, function (err) {
            $timeout(function () {
              if (err) {
                def.reject(err);
              }
              else {
                def.resolve(ref);
              }
            });
          });
          return def.promise;
        }

      function firstPartOfEmail(email) {
        return ucfirst(email.substr(0, email.indexOf('@')) || '');
      }

      function ucfirst(str) {
        // inspired by: http://kevin.vanzonneveld.net
        str += '';
        var f = str.charAt(0).toUpperCase();
        return f + str.substr(1);
      }

    

    function redirect() {
      $location.path('/account');
    }

    function showError(err) {
      $scope.err = err;
    }
    
    function showSuccess(msg) {
      $scope.msg = msg;
    }


  }]);
