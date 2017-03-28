var app = angular.module('ddsoverview', ["ngMessages",'ngAnimate','angularPromiseButtons']);

app.service('appService', function () {
    this.getMovie = function() {
        return new ddsnodeclient.AppApi(client).getApiV1AppStatus().then((response) => {
            return JSON.stringify(response.body, null, '\t');
        });
    };
});

app.controller('DDSOverviewController', function DDSOverviewController($scope, appService) {
    $scope.getStatus = function() {
        appService.getMovie()
            .then(function(data) {
                $scope.appStatus = data;
            });
    };
});