appkit.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "src/app/components/home/homeView.html"
        })
        .otherwise({
            redirectTo: "/home"
        });
}]);