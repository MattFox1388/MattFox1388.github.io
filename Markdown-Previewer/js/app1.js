
var app1 = angular.module('app1',['hc.marked', 'ngSanitize']);
//app1's main controller
app1.config(['markedProvider', function (markedProvider) {
    markedProvider.setOptions({ gfm: true,
    tables:true
 });
}]);
app1.controller('mainCtrl', ['marked', function (marked, $scope,) {
}]);
