const fs = require('fs');
const path = require('path');

var app = angular.module('about', []);

app.service('credentials', function() {
    this.myFunc = function (x) {
        if (fs.existsSync(x)) {
            var notesByte = fs.readFileSync(x);
            var notesJson = JSON.parse(notesByte);
            return JSON.stringify(notesJson);
        } else {
            return 'Paste Software Agent Credentials here.';
        }
    }
});

app.controller('AboutController', [
    '$scope', 'credentials',
    function AboutController($scope, credentials) {
        $scope.message = 'HOME PAGE';
        $scope.creds = credentials.myFunc(path.join(process.env.HOME, '.ddsnodeclient'));
        // $scope.creds = '{just a test}';

    }
]);