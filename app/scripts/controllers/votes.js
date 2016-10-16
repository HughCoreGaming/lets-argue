'use strict';
/**
 * @ngdoc function
 * @name letsArgueApp.controller:MyargsCtrl
 * @description
 * # MyargsCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('letsArgueApp')
  .controller('Votes', ["$scope", "currentAuth", "$firebaseArray", "$timeout", function ($scope, currentAuth, $firebaseArray, $timeout) {
    $scope.user = currentAuth;
    $scope.userHasVoted = false;

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

     // provide a method for adding a args
    $scope.addVote = function (o, event) {
        
        $scope.userHasVoted = false;
        
        angular.forEach($scope.votes, function(votes) {
            if(votes.argsId == o.$id && votes.userId == currentAuth.uid){
                $scope.userHasVoted = true;
            }
        })
        
        if(!$scope.userHasVoted){

            // push args to the end of the array
            $scope.votes.$add({
                argsId: o.$id,
                user: currentAuth.displayName,
                userId: currentAuth.uid,
                voteType: event.target.id
            }).then(function () {
                var arg = $scope.args.$getRecord(o.$id);
                arg[event.target.id + 'Votes']++;
                $scope.args.$save(arg).then(function () {
                    // data has been saved to our database
                }).catch(alert);
            }).catch(alert);

        
        }else{
            
            alert("User has already voted!");
            
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
