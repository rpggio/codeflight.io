 (function () {
    "use strict";

    var UserController = function ($scope, $http, $location, $sce, dcsApi) {
       var self = this;

       self.$scope = $scope;
       self.$http = $http;
       self.$location = $location;
       self.$sce = $sce;
       self.dcsApi = dcsApi;

       self.userId = self.$location.search().userId;

       if(self.userId) {

         dcsApi.users.get(self.userId)
           .then(function(user) { self.user = user; });

         dcsApi.users.commits(self.userId)
           .then(function(commits) { self.commits = commits; });

       }
   }

  UserController.$inject = ['$scope', '$http', '$location', '$sce', 'dcsApi'];

  UserController.prototype.toggleSelectedCommit = function(commit) {
    var self = this;

    if(!commit){
      selectedCommitId = null;
    }
    else if(self.selectedCommitId == commit.id) {
      self.selectedCommitId = null;
    }
    else{
      self.selectedCommitId = commit.id;
      self.loadCommitDetails(commit);
    }
  };

  UserController.prototype.loadCommitDetails = function(commit){
    var self = this;

    var href = self.dcsApi.commits.getTestOutputHref(commit.id);
    href = self.$sce.trustAsResourceUrl(href);
    commit.testOutputHref = href;

    // self.dcsApi.commits.getTestOutput(commit.id)
    //   .then(function(testOutput) { 
    //     if(testOutput){
    //       commit.testOutput = self.$sce.trustAsHtml(testOutput); 
    //     }
    //   });
  };

  UserController.prototype.getBuildOutputHref = function(commit){
    var self = this;
    return self.dcsApi.commits.getBuildOutputHref(commit.id);
  };

  dcs.controller('UserController', UserController);

}());
