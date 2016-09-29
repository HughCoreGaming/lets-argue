'use strict';

describe('Controller: VotesCtrl', function () {

  // load the controller's module
  beforeEach(module('letsArgueApp'));

  var VotesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VotesCtrl = $controller('VotesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
