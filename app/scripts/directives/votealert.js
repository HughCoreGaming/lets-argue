'use strict';

/**
 * @ngdoc directive
 * @name letsArgueApp.directive:voteAlert
 * @description
 * # voteAlert
 */
angular.module('letsArgueApp')
  .directive("boxCreator", function($compile,$timeout){   
      return{
        restrict: 'A',
        link: function(scope , element){        
           element.bind("click", function(e){

                element.parent().children().unbind();
                
                $timeout(function () {
                    if (scope.userHasVoted) {

                        var childNode = $compile('<div class="alert alert-danger"><strong>Hey!</strong> You have already voted on this argument.</div>')(scope)
                        element.parent().append(childNode);

                        $timeout(function () {
                            childNode.remove();
                        }, 2000);

                    } else {

                        var childNode = $compile("<div class='sucess sucess-danger'><strong>Thanks!</strong> You're vote has been placed.</div>")(scope)
                        element.parent().append(childNode);

                        $timeout(function () {
                            childNode.remove();
                        }, 2000);

                    }
                    
                    scope.userHasVoted = false;
                    
                }, 50);

           });

        }
    }
   });