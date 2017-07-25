(function() {
	'use strict';

	angular
		.module('app')
		.config(appRoutes);

	appRoutes.$inject = ['$routeProvider'];

	function appRoutes($routeProvider) {
		
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