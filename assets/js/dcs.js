var dcs = (function () {
    "use strict";

    var apiBaseUrl = 'http://ec2-52-1-38-108.compute-1.amazonaws.com:8280'
    
    var dcs = angular.module('dcs', []);

    dcs.config(['$interpolateProvider', function ($interpolateProvider) { 
        $interpolateProvider.startSymbol('[['); 
        $interpolateProvider.endSymbol(']]'); 
      }]); 

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
                checkins: function (userId) {
                    return $http.get(usersUrl + '/' + userId + '/checkins')
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
                users: users
            };
        }
    ]);

    return dcs;

})();