
angular.module('cfd', []) 
  .config(['$interpolateProvider', function ($interpolateProvider) { 
    $interpolateProvider.startSymbol('[['); 
    $interpolateProvider.endSymbol(']]'); 
  }]); 