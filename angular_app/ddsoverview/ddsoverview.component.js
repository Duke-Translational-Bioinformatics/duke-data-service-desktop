var app = angular.module('ddsoverview', ["ngMessages"]);

app.controller('DDSOverviewController', function DDSOverviewController($scope) {
    $scope.count = 0;
    $scope.myFunction = function() {
        $scope.count++;
    }
    $scope.appApi = new dds.AppApi();
    $scope.appstatus = $scope.appApi.getApiV1AppStatus().then((response) => {return response.body});

});