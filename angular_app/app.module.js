// maybe can use this to modularize code below
// http://stackoverflow.com/questions/35203092/cannot-find-fs-in-controller

app = angular.module('ddsDesktop', []);

app.controller('AboutController', [
    '$scope',
    function AboutController($scope) {
        $scope.message = 'HOME PAGE';
    }
]);


// (() => {
//
// })();

