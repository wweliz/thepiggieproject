define(['knockout','underscore', 'moment', 'DateTimeHelper'],function(ko, _, moment, DTHelper){

	function Trophy(data){

		var trophy = this;

		if (_.isUndefined(data)){
			data = {};
		};

		trophy.id = ko.observable(data.id);
		trophy.name = ko.observable(data.name);
		trophy.iconURL = ko.observable(data.iconURL);		

		trophy.created_at = ko.observable( DTHelper.getTimeElapsed(data.created_at) );
		trophy.dateEarned = ko.observable( DTHelper.getTimeElapsed(data.dateEarned) );
		trophy.userHasEarned = ko.observable(data.userHasEarned);

	}

	return Trophy;

});
