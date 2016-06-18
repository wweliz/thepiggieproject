define([], function(){
	
	function HB_CONSTANTS(){

		var hbc = this;

		var production_env = false;

		if (production_env){
			hbc.API_ENDPOINT = 'http://calm-beyond-5693.herokuapp.com/';
			hbc.facebookAppId  = '880025165438123';
			hbc.WEAPON_TYPES = [
			{
				name: 'Rod',
				manufacturerTypeId: 3
			},
			{
				name: 'Bow',
				manufacturerTypeId: 5
			},
			{
				name: 'Reel',
				manufacturerTypeId: 2
			},
			{
				name: 'Shotgun',
				manufacturerTypeId: 1
			},
			{
				name: 'Rifle',
				manufacturerTypeId: 1,
				categoryId: 2
			},
			{
				name: 'Handgun',
				manufacturerTypeId: 1
			},

			{
				name: 'Firearm',
				manufacturerTypeId: 1
			}
		];
		} else {
			hbc.API_ENDPOINT = 'http://hambone-development.herokuapp.com/';
			hbc.facebookAppId  = '766593516769049';
			hbc.WEAPON_TYPES = [
				{
					name: 'Rod',
					manufacturerTypeId: 1
				},
				{
					name: 'Bow',
					manufacturerTypeId: 2
				},
				{
					name: 'Reel',
					manufacturerTypeId: 6
				},
				{
					name: 'Shotgun',
					manufacturerTypeId: 10
				},
				{
					name: 'Rifle',
					manufacturerTypeId: 11,
					categoryId: 2
				},
				{
					name: 'Handgun',
					manufacturerTypeId: 12
				},
				{
					name: 'Firearm',
					manufacturerTypeId: 9
				}
			];
		}

		hbc.POST_TYPES = [
			{text:"Big Game",id:1,image:'ico-biggame.svg'},
			{text:"Small Game",id:2,image:'ico-smallgame.svg'},
			{text:"Upland Game Birds",id:3,image:'ico-uplandgamebird.svg'},
			{text:"Waterfowl",id:4,image:'ico-waterfowl.svg'},
			{text:"Reptile",id:5,image:'ico-reptile.svg'},
			{text:"Trail Cam",id:6,image:'ico-trailcam.svg'},
			{text:"Scenery",id:7,image:'ico-scenery.svg'},
			{text:"Freshwater",id:8,image:'ico-freshwater.svg'},
			{text:"Saltwater",id:9,image:'ico-saltwater.svg'}
		];

	}

	return new HB_CONSTANTS();

});
