var appkit = angular.module("appkit", ["ngMaterial", "ngRoute"]);

appkit.directive("siteheader", function() {
    return {
        templateUrl: "src/app/common/header/headerView.html"
    };
});

appkit.directive("sitefooter", function() {
    return {
        templateUrl: "src/app/common/footer/footerView.html",
        controller: "footerController"
    };
});