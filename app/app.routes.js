(function() {
	'use strict';

	angular
		.module('app')
		.config(appRoutes);

	appRoutes.$inject = ['$routeProvider', '$locationProvider'];

	function appRoutes($routeProvider, $locationProvider) {
		
		$routeProvider
			.when('/', {
				templateUrl: 'app/view/main.view.html',
				controller: 'mainCtrl',
				controllerAs: 'main'
			})
			.otherwise({
				redirectTo: '/'
			});

	}
})();