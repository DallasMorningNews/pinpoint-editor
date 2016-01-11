(function(){
	angular
   		.module('pinpointTool')
   		.directive('uniqueSlug', uniqueSlug);

	uniqueSlug.$inject = ['$http'];
	function uniqueSlug($http){
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function ($scope, element, attrs, ngModel) {

				if ($scope.state === 'update') return;

				function validate(value) {
					if ($scope.map.id || ($scope.slug && $scope.slug.indexOf(ngModel.$viewValue) === -1)) {
						ngModel.$setValidity('unique', true);
					} else {
						ngModel.$setValidity('unique', false);
					}
				}

				$http.get('/tools/pinpoint/api/slugs').success( function (slugs) {
					$scope.slug = slugs;
					validate(ngModel.$viewValue);
				});

				$scope.$watch( function() {
					return ngModel.$viewValue;
				}, validate);
			}
		};
	}
})();
