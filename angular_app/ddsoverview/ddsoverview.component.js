var app = angular.module('ddsoverview', ["ngMessages",'ngAnimate','angularPromiseButtons']);

app.service('appService', function () {
    this.getIt = function() {
        return new ddsnodeclient.AppApi(client).getApiV1AppStatus().then((response) => {
            return JSON.stringify(response.body, null, '\t');
        });
    };
});

app.service('appUserUsage', function () {
    this.getIt = function() {
        return new ddsnodeclient.CurrentuserApi(client).getApiV1CurrentUser().then((response) => {
            return JSON.stringify(response.body, null, '\t');
        });
    };
});

app.service('appProjectRoles', function () {
    this.getIt = function() {
        return new ddsnodeclient.ProjectrolesApi(client).getApiV1ProjectRoles().then((response) => {
            return JSON.stringify(response.body, null, '\t');
        });
    };
});

app.service('appProjects', function () {
    this.getIt = function() {
        return new ddsnodeclient.ProjectsApi(client).getApiV1Projects().then((response) => {
            return JSON.stringify(response.body, null, '\t');
        });
    };
});

app.controller('DDSOverviewController',
function DDSOverviewController($scope, appService, appUserUsage, appProjectRoles, appProjects) {
    $scope.getStatus = function() {
        appService.getIt()
            .then(function(data) {
                $scope.appStatus = data;
            });
    };

    $scope.getUsage = function() {
        appUserUsage.getIt()
            .then(function(data) {
                $scope.userUsage = data;
            });
    };

    $scope.getRoles = function() {
        appProjectRoles.getIt()
            .then(function(data) {
                $scope.projectRoles = data;
            });
    };

    $scope.getProjects = function() {
        appProjects.getIt()
            .then(function(data) {
                $scope.projects = data;
            });
    };
});