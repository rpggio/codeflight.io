var dcs = (function () {
    "use strict";

    //var apiBaseUrl = 'http://ec2-52-1-38-108.compute-1.amazonaws.com:8280'
    var apiBaseUrl = 'http://localhost:8280'
    
    var dcs = angular.module('dcs', ['ui.bootstrap', 'ngSanitize']);

    //---------- providers ----------

    dcs.config(['$interpolateProvider', function ($interpolateProvider) { 
        $interpolateProvider.startSymbol('[['); 
        $interpolateProvider.endSymbol(']]'); 
      }]); 

    //---------- filters ----------

    dcs.filter('splitOnCase', function () {
        return function (input) {
            return input.replace(/([A-Z])/g, ' $1').trim();
        };
    });

    dcs.filter('capitalize', function() {
      return function(input, scope) {
        if (!input){
            return input;
        }
        return input.substring(0,1).toUpperCase() + input.substring(1);
      }
    });

    //---------- services ----------

    dcs.factory("dcsApi", [
        "$http", function ($http) {

            var usersUrl = apiBaseUrl + '/users';
            var users = {
                getList: function () {
                    return $http.get(usersUrl)
                        .then(function (r) { return r.data; });
                },
                get: function (userId) {
                    return $http.get(usersUrl + '/' + userId)
                        .then(function (r) { return r.data; });
                },
                commits: function (userId) {
                    return $http.get(usersUrl + '/' + userId + '/commits')
                        .then(function (r) { return r.data; });
                }
            };

            var commitsUrl = apiBaseUrl + '/commits';
            var commits = {
                getTestOutputPath: function(commitId){
                    return commitsUrl + '/' + commitId + '/testOutput.html';
                },
                getTestOutput: function (commitId) {
                    return $http.get(commitsUrl + '/' + commitId + '/testOutput.html')
                        .then(function (r) { return r.data; });
                }
            };

            var contactsUrl = apiBaseUrl + '/contacts';
            var contacts = {
                add: function (contact) {
                    return $http.post(contactsUrl, contact)
                        .then(function (r) { return r.data; });
                }
            };

            return {
                contacts: contacts,
                commits: commits,
                users: users
            };
        }
    ]);

    return dcs;
})();