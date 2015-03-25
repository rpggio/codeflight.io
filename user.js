 (function () {
    "use strict";

    var UserController = function ($scope, $http, $location, $sce, $interval, dcsApi) {
       var self = this;

       var commitRefreshIntervalMs = 10000;

       self.$scope = $scope;
       self.$http = $http;
       self.$location = $location;
       self.$sce = $sce;
       self.$interval = $interval;
       self.dcsApi = dcsApi;

       self.userId = self.$location.search().userId;
       self.commits = [];

       if(self.userId) {
         self.dcsApi.users.get(self.userId)
           .then(function(user) { self.user = user; });

         self.refreshCommits()
           .then(function(){
               self.$interval(function() { self.refreshCommits(); }, commitRefreshIntervalMs);
            });
       }
   }

  UserController.$inject = ['$scope', '$http', '$location', '$sce', '$interval', 'dcsApi'];

  UserController.prototype.toggleSelectedCommit = function(commit) {
    var self = this;

    if(!commit){
      selectedCommitId = null;
    }
    else if(self.selectedCommitId == commit.id) {
      self.selectedCommitId = null;
      self.selectedCommitOutputHref = null;
    }
    else{
      self.selectedCommitId = commit.id;
      self.selectedCommitOutputHref = self.loadCommitOutputHref(commit);
    }
  };

  UserController.prototype.loadCommitOutputHref = function(commit){
    var self = this;

    var href = self.dcsApi.commits.getTestOutputHref(commit.id);
    href = self.$sce.trustAsResourceUrl(href);
    return href;

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

  UserController.prototype.refreshCommits = function(){
    var self = this;
    return self.dcsApi.users.commits(self.userId)
      .then(function(commits) { 
        Util.syncObjects(self.commits, commits, 'id', true);
      });
  };

  dcs.controller('UserController', UserController);

}());
