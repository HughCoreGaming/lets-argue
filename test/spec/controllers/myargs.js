'use strict';

describe('Controller: MyargsCtrl', function () {

  // load the controller's module
  beforeEach(module('letsArgueApp'));

  var MyargsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyargsCtrl = $controller('MyargsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
