const dds = require('ddsnodeclient')

var app = angular.module('ddsoverview', ["ngMessages",'ngAnimate','angularPromiseButtons']);

app.factory('fakeFac', function ($q, $timeout, $log)
    {
        var standardDelay = 1000;
        return {
            success: function ()
            {
                var defer = $q.defer();
                appstat = new dds.AppApi()
                return defer.promise;
            },
            error: function ()
            {
                var defer = $q.defer();
                $timeout(function ()
                {
                    $log.info('error');
                    defer.reject({
                        msg: 'ERROR'
                    });
                }, standardDelay);
                return defer.promise;
            },
            endless: function ()
            {
                var defer = $q.defer();
                return defer.promise;
            }
        };
    });

app.factory('movieService', function($http, $log, $q) {
  return {
   getMovie: function(movie) {
     var deferred = $q.defer();
     $http.get('/api/v1/movies/' + movie)
       .success(function(data) {
          deferred.resolve({
             title: data.title,
             cost: data.price});
       }).error(function(msg, code) {
          deferred.reject(msg);
          $log.error(msg, code);
       });
     return deferred.promise;
   },
    getMovie2: function(movie) {
        return new dds.AppApi().getApiV1AppStatus().then((response) => {return response.body});
    }

  }
 });

app.controller('DDSOverviewController', function DDSOverviewController($scope, fakeFac, movieService) {
    $scope.count = 0;
    $scope.getMovie = function() {
        movieService.getMovie2()
        .then(function(data) {
            console.log('inside here.')
        $scope.movieData = JSON.stringify(data, null, "\t");
    }).catch((err) => {
           $scope.movieData = err;
        });
    };
    $scope.myFunction = function() {
        $scope.count++;
    }
    $scope.appApi = new dds.AppApi();
    $scope.appstatus = $scope.appApi.getApiV1AppStatus().then((response) => {return response.body});
    $scope.v = {
            promiseIndex: 0
        };
        $scope.success = function ()
        {
            $scope.successPromise = false;
            $scope.successPromise = fakeFac.success();
        };

        $scope.error = function ()
        {
            $scope.errorPromise = fakeFac.error();
        };

        $scope.endless = function ()
        {
            $scope.endlessPromise = fakeFac.endless();
        };

        $scope.auto = function ()
        {
            $scope.autoPromise = fakeFac.endless();
        };

        $scope.submit = function ()
        {
            $scope.submitPromise = fakeFac.success();
        };
        $scope.chain = function ()
        {
            $scope.v.promiseIndex = 0;
            $scope.chainedPromises = $scope.countChain()
                .then($scope.countChain)
                .then($scope.countChain)
                .then($scope.countChain)
                .then($scope.countChain);
        };
        $scope.countChain = function ()
        {
            return fakeFac.success().then(function ()
            {
                $scope.v.promiseIndex++;
            });
        };

        $scope.auto();

});