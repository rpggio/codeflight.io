 (function () {
    "use strict";

    var UserController = function ($scope, $http, $location, dcsApi) {
       var self = this;

       self.$scope = $scope;
       self.$http = $http;
       self.$location = $location;
       self.dcsApi = dcsApi;

       self.userId = self.$location.search().userId;

       if(self.userId) {

         dcsApi.users.get(self.userId)
           .then(function(user) { self.user = user; });

         dcsApi.users.checkins(self.userId)
           .then(function(checkins) { self.checkins = checkins; });

       }
   }

   UserController.$inject = ['$scope', '$http', '$location', 'dcsApi'];

   dcs.controller('UserController', UserController);

}());
