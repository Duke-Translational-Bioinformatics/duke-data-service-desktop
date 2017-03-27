const fs = require('fs');
const path = require('path');

var app = angular.module('about', ["ngMessages"]);

app.service('credentials', function () {
    var credFile = path.join(process.env.HOME, '.ddsnodeclient');
    var _credentials_json = '';

    this.setCredentials = function (credentials_json) {
        _credentials_json = JSON.parse(credentials_json);
        try {
            fs.writeFileSync(credFile, JSON.stringify(_credentials_json));
        } catch (e) {
            return alert(e);
        }
    }

    this.getCredentials = function () {
        if (_credentials_json) {
            return _credentials_json;
        } else {
            if (fs.existsSync(credFile)) {
                var notesByte = fs.readFileSync(credFile);
                var notesJson = JSON.parse(notesByte);
                _credentials_json = JSON.stringify(notesJson)
                return JSON.stringify(notesJson, null, '\t');
            } else {
                return 'Paste Software Agent Credentials here.';
            }
        }
    }
});

app.filter('checkmark', function() {
    return function(input) {
        return input ? '\u2714' : '\u2718';
    };
});

app.controller('AboutController', [
    '$scope', 'credentials',
    function AboutController($scope, credentials) {
        $scope.creds = credentials.getCredentials();
    }
]);

app.directive("isvalidjson", function($q, $timeout) {
    var isvalidjson = function(n) {
        try {
            cred_json = JSON.parse(n);
            if (typeof cred_json === 'object') {
                return true
            } else {
                return false
            }
        } catch (err) {
            // Handle the error here.
            return false
        }
    };
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attributes, ngModel) {
            ngModel.$asyncValidators.prime = function(modelValue) {
                var defer = $q.defer();
                $timeout(function(){
                    if(isvalidjson(modelValue)) {
                        // console.log(modelValue)
                        // console.log(typeof modelValue)
                        try {
                            fs.writeFileSync(path.join(process.env.HOME, '.ddsnodeclient'), modelValue);
                        } catch (e) {
                            return alert(e);
                        }
                        defer.resolve();
                    } else {
                        defer.reject();
                    }
                }, 500);
                return defer.promise;
            }
        }
    };
});
