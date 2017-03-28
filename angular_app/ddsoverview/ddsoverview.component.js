const dds = require('ddsnodeclient')

var app = angular.module('ddsoverview', ["ngMessages",'ngAnimate','angularPromiseButtons']);

app.service('appService', function () {
    this.getMovie = function() {
        return new dds.AppApi().getApiV1AppStatus().then((response) => {
            return response.body
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