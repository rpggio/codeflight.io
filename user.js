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

         dcsApi.users.commits(self.userId)
           .then(function(commits) { self.commits = commits; });

       }
   }

  UserController.$inject = ['$scope', '$http', '$location', 'dcsApi'];

  // UserController.prototype.getCommitClass(commit) {
  //     if(commit.outcome=='success'){
  //       return 
  //     }
  // }

  dcs.controller('UserController', UserController);

}());
