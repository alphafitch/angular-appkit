appkit.controller("footerController", function($scope, $http) {

    $http.get("bower.json").then(function(response) {
        $scope.bower = response.data;
    });
});