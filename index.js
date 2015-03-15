 (function () {
    "use strict";

    var IndexController = function ($scope, $http) {
       var self = this;

       self.$scope = $scope;
       self.$http = $http;
   }

   IndexController.$inject = ['$scope', '$http'];

   IndexController.prototype.submit = function() {
        var self = this;
        self.submitSuccess = self.submitFail = null;
        var url = 'http://ec2-52-1-38-108.compute-1.amazonaws.com:8280/contacts';
        self.$http.post(url, { email: self.email })
            .then(
                function () { 
                    self.submitSuccess = true;
                    self.email = null;
                },
                function() { 
                    self.submitFail = true;
                }
            );   
    }

    var module = angular.module('cfd', []);
    module.controller('IndexController', IndexController);

}());
