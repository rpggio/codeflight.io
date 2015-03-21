 (function () {
    "use strict";

    var IndexController = function ($scope, $http, dcsApi) {
       var self = this;

       self.$scope = $scope;
       self.$http = $http;
       self.dcsApi = dcsApi;
   }

   IndexController.$inject = ['$scope', '$http', 'dcsApi'];

   IndexController.prototype.submit = function() {
        var self = this;

        self.submitSuccess = self.submitFail = null;
        self.dcsApi.contacts.add({ email: self.email })
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

    dcs.controller('IndexController', IndexController);

}());
