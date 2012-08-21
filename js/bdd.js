decors = new Array();

decors['plaine']= new Array();
decors['plaine']['c_defense']=1;
	
decors['plage']= new Array();
decors['plage']['c_defense']=1;
	
decors['montagne']= new Array();
decors['montagne']['c_defense']=3;

decors['mer']= new Array();
decors['mer']['c_defense']=1;

decors['lac']= new Array();
decors['lac']['c_defense']=2;

decors['riviere']= new Array();
decors['riviere']['c_defense']=2;

decors['foret']= new Array();
decors['foret']['c_defense']=2;

decors['route']= new Array();
decors['route']['c_defense']=0;


var BDD = {
    Unites: {
		Infantry: {
			cout : 1000,
			vie : 100,
			fabrication : 'usine',
			munition : {primAmmo : 'inf', secAmmo : 0},
			essence : 99,
			deplacement : 3,
			porteeTir : {min : 0, max : 1},
			vue : 1,
			attaque :{
			   primAmmo : {infantry : 55, bazooka : 45, recon : 12, vtb : 14, tank : 5, tankm : 1 , neotank : 1, dca : 5, artillery :15, aair : 26, lmiss : 25,  cuirasse : 0, sub : 0, destr : 0, barge : 0, helico : 7, chass :0 , bomba : 0, helitrans :30 },
			    secAmmo : {infantry : 55, bazooka : 45, recon : 12, vtb : 14, tank : 5, tankm : 1 , neotank : 1, dca : 5, artillery :15, aair : 26, lmiss : 25,  cuirasse : 0, sub : 0, destr : 0, barge : 0, helico : 7, chass :0 , bomba : 0, helitrans :30 }
			    },
			c_avancement : {'route' : 1, 'foret' : 2, 'plaine' : 2, 'plage' : 0, 'montagne' : 3, 'mer' : 0, 'lac' : 0}
		},
		Bazooka: {
			cout : 3000,
			vie : 100,
			fabrication : 'usine',
			munition : {primAmmo: 3, secAmmo : 'inf' },
			essence : 99,
			deplacement : 2,
			porteeTir : {min : 0, max : 1},
			vue : 2,
			attaque : {
			   primAmmo : {infantry : 65, bazooka : 55, tank : 55, tankm : 15 , neotank : 15, recon : 85, dca : 65, aair : 85, artillery :70,  lmiss : 85, vtb : 75,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,helitrans :35, helico : 9, chass :0 , bomba : 0 },
			    secAmmo : {infantry : 65, bazooka : 55, tank : 6, tankm : 1 , neotank : 1, recon : 18, dca : 6, aair : 35, artillery :32,  lmiss : 35, vtb : 20,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,helitrans :35, helico : 9, chass :0 , bomba : 0}
			},
			c_avancement : {'route' : 1, 'foret' : 2, 'plaine' : 2, 'plage' : 0, 'montagne' : 3, 'mer' : 0, 'lac' : 0}
		},
		Tank: {
			cout : 7000,
			vie : 100,
			fabrication : 'usine',
			munition : {primAmmo: 9, secAmmo : 'inf'},
			essence : 70,
			deplacement : 6,
			porteeTir : {min : 0, max : 1},
			vue : 3,
			attaque : {
			   primAmmo : {infantry : 75, bazooka : 70, tank : 55, tankm : 15 , neotank : 15, recon : 85, dca : 65, aair : 85, artillery :70,  lmiss : 85, vtb : 75,  barge : 10, destr : 5,  sub : 1, cuirasse : 1,helitrans :40, helico : 10, chass :0 , bomba : 0 },
			    secAmmo : {infantry : 75, bazooka : 70, tank : 6, tankm : 1 , neotank : 1, recon : 40, dca : 6, aair : 30, artillery :45,  lmiss : 55, vtb : 45,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,helitrans :40, helico : 10, chass :0 , bomba : 0}
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 0, 'mer' : 0, 'lac' : 0}
		},
		Tankm: {
			cout : 16000,
			vie : 100,
			fabrication : 'usine',
			munition :{primAmmo: 8, secAmmo : 'inf' },
			essence : 50,
			deplacement : 5,
			porteeTir : {min : 0, max : 1},
			vue : 1,
			attaque : {
			   primAmmo : {infantry : 105, bazooka : 95, tank : 85, tankm : 55 , neotank : 45, recon : 105, dca : 105, aair : 105, artillery :100,  lmiss : 105, vtb : 105,  barge : 35, destr : 45,  sub : 10, cuirasse : 10,helitrans :45, helico : 12, chass :0 , bomba : 0 },
			    secAmmo : {infantry : 105, bazooka : 95, tank : 8, tankm : 1 , neotank : 1, recon : 45, dca : 7, aair : 35, artillery :45,  lmiss : 55, vtb : 45,  barge : 0, destr : 0,  sub : 0, cuirasse : 0, helitrans :45, helico : 12, chass :0 , bomba : 0 }
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 0, 'mer' : 0, 'lac' : 0}
		},
		Neotank: {
			cout : 22000,
			vie : 100,
			fabrication : 'usine',
			munition :{primAmmo: 9, secAmmo : 'inf' },
			essence : 99,
			deplacement : 6,
			porteeTir : {min : 0, max : 1},
			vue : 1,
			attaque : {
			   primAmmo : {infantry : 125, bazooka : 115, tank : 105, tankm : 75 , neotank : 55, recon : 125, dca : 115, aair : 125, artillery :115,  lmiss : 125, vtb : 125,  barge : 50, destr : 50,  sub : 15, cuirasse : 15, helitrans : 55, helico : 22, chass :0 , bomba : 0 },
			    secAmmo : {infantry : 125, bazooka : 115, tank : 10, tankm : 1 , neotank : 1, recon : 65, dca : 17, aair : 55, artillery :65,  lmiss : 75, vtb : 65,  barge : 0, destr : 0,  sub : 0, cuirasse : 0, helitrans :55, helico : 22, chass :0 , bomba : 0 }
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 0, 'mer' : 0, 'lac' : 0}
		},
		Recon: {
			cout : 4000,
			vie : 100,
			fabrication : 'usine',
			munition :{primAmmo: 'inf', secAmmo : 0},
			essence : 80,
			deplacement : 8,
			porteeTir : {min : 0, max : 1},
			vue : 5,
			attaque : {
			   primAmmo : {infantry : 70, bazooka : 65, tank : 6, tankm : 1 , neotank : 1, recon : 35, dca : 4, aair : 28, artillery :45,  lmiss : 55, vtb : 45,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,helitrans :35, helico : 10, chass :0 , bomba : 0 },
			    secAmmo : {infantry : 70, bazooka : 65, tank : 6, tankm : 1 , neotank : 1, recon : 35, dca : 4, aair : 28, artillery :45,  lmiss : 55, vtb : 45,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,helitrans :35, helico : 10, chass :0 , bomba : 0 }
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 0, 'mer' : 0, 'lac' : 0}
		},
		Dca: {
			cout : 8000,
			vie : 100,
			fabrication : 'usine',
			munition :{primAmmo: 9, secAmmo : 0},
			essence : 60,
			deplacement : 6,
			porteeTir : {min : 0, max : 1},
			vue : 2,
			attaque : {
			   primAmmo : {infantry : 105, bazooka : 105, tank : 25, tankm : 10 , neotank : 5, recon : 60, dca : 45, aair : 55, artillery :50,  lmiss : 55, vtb : 50,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,helitrans :120, helico : 120, chass :65 , bomba : 75},
			    secAmmo : {infantry : 105, bazooka : 105, tank : 25, tankm : 10 , neotank : 5, recon : 60, dca : 45, aair : 55, artillery :50,  lmiss : 55, vtb : 50,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,helitrans :120, helico : 120, chass :65 , bomba : 75}
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 0, 'mer' : 0, 'lac' : 0}
		},
		Aair: {
			cout : 12000,
			vie : 100,
			fabrication : 'usine',
			munition :{primAmmo:6, secAmmo :0},
			essence : 50,
			deplacement : 4,
			porteeTir : {min : 3, max : 5},
			vue : 5,
			attaque : {
			   primAmmo : {infantry : 0, bazooka : 0, tank : 0, tankm : 0 , neotank : 0, recon : 0, dca : 0, aair : 0, artillery :0,  lmiss : 0, vtb : 0,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,helitrans :120, helico : 120, chass :100 , bomba : 100},
			    secAmmo : {infantry : 0, bazooka : 0, tank : 0, tankm : 0 , neotank : 0, recon : 0, dca : 0, aair : 0, artillery :0,  lmiss : 0, vtb : 0,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,helitrans :120, helico : 120, chass :100 , bomba : 100}
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 0, 'mer' : 0, 'lac' : 0}
		},
		Artillery: {
			cout : 6000,
			vie : 100,
			fabrication : 'usine',
			munition :{primAmmo: 9, secAmmo : 0},
			essence : 50,
			deplacement : 5,
			porteeTir : {min : 2, max : 3},
			vue : 1,
			attaque : {
			   primAmmo : {infantry : 90, bazooka : 85, tank : 70, tankm : 45 , neotank : 40, recon : 80, dca : 75, aair : 80, artillery :75,  lmiss : 80, vtb : 70,  barge : 55, destr : 65,  sub : 60, cuirasse : 40,helitrans :0, helico : 0, chass :0 , bomba : 0},
			    secAmmo : {infantry : 90, bazooka : 85, tank : 70, tankm : 45 , neotank : 40, recon : 80, dca : 75, aair : 80, artillery :75,  lmiss : 80, vtb : 70,  barge : 55, destr : 65,  sub : 60, cuirasse : 40,helitrans :0, helico : 0, chass :0 , bomba : 0}
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 0, 'mer' : 0, 'lac' : 0}
		},
		Lmiss: {
			cout : 15000,
			vie : 100,
			fabrication : 'usine',
			munition :{primAmmo: 6, secAmmo : 0},
			essence : 50,
			deplacement : 5,
			porteeTir : {min : 3, max : 5},
			vue : 1,
			attaque : {
			   primAmmo : {infantry : 95, bazooka : 90, tank : 80, tankm : 55 , neotank : 50, recon : 90, dca : 85, aair : 90, artillery :80,  lmiss : 85, vtb : 80,  barge : 60, destr : 85,  sub : 85, cuirasse : 55,helitrans :0, helico : 0, chass :0 , bomba : 0},
			    secAmmo : {infantry : 95, bazooka : 90, tank : 80, tankm : 55 , neotank : 50, recon : 90, dca : 85, aair : 90, artillery :80,  lmiss : 85, vtb : 80,  barge : 60, destr : 85,  sub : 85, cuirasse : 55,helitrans :0, helico : 0, chass :0 , bomba : 0}
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 0, 'mer' : 0, 'lac' : 0}
		},
		Vtb: {
			cout : 5000,
			vie : 100,
			fabrication : 'usine',
			munition :{primAmmo: 0, secAmmo : 0},
			essence : 70,
			deplacement : 6,
			porteeTir : {min : 0, max : 0},
			vue : 1,
			attaque : {
			   primAmmo : {infantry : 0, bazooka : 0, tank : 0, tankm : 0 , neotank : 0, recon : 0, dca : 0, aair : 0, artillery :0,  lmiss : 0, vtb : 0,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,helitrans :0, helico : 0, chass :0 , bomba : 0},
			    secAmmo : {infantry : 0, bazooka : 0, tank : 0, tankm : 0 , neotank : 0, recon : 0, dca : 0, aair : 0, artillery :0,  lmiss : 0, vtb : 0,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,helitrans :0, helico : 0, chass :0 , bomba : 0}
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 0, 'mer' : 0, 'lac' : 0},
			canTransport : {infantry : true, bazooka : true}
		},
		Barge: {
			cout : 12000,
			vie : 100,
			fabrication : 'port',
			munition :{primAmmo: 0, secAmmo : 0},
			essence : 99,
			deplacement : 6,
			porteeTir : {min : 0, max : 0},
			vue : 1,
			attaque : {
			   primAmmo : {infantry : 0, bazooka : 0, tank : 0, tankm : 0 , neotank : 0, recon : 0, dca : 0, aair : 0, artillery :0,  lmiss : 0, vtb : 0,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,helitrans :0, helico : 0, chass :0 , bomba : 0},
			    secAmmo : {infantry : 0, bazooka : 0, tank : 0, tankm : 0 , neotank : 0, recon : 0, dca : 0, aair : 0, artillery :0,  lmiss : 0, vtb : 0,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,helitrans :0, helico : 0, chass :0 , bomba : 0}
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 0, 'mer' : 0, 'lac' : 0}
		},
		Destr: {
			cout : 18000,
			vie : 100,
			fabrication : 'port',
			munition : {primAmmo: 9, secAmmo : 0},
			essence : 99,
			deplacement : 6,
			porteeTir : {min : 0, max : 1},
			vue : 3,
			attaque : {
			   primAmmo : {infantry : 0, bazooka : 0, tank : 0, tankm : 0 , neotank : 0, recon : 0, dca : 0, aair : 0, artillery :0,  lmiss : 0, vtb : 0,  barge : 0, destr : 0,  sub : 90, cuirasse : 0,helitrans :115, helico : 115, chass :55 , bomba : 65},
			    secAmmo : {infantry : 0, bazooka : 0, tank : 0, tankm : 0 , neotank : 0, recon : 0, dca : 0, aair : 0, artillery :0,  lmiss : 0, vtb : 0,  barge : 0, destr : 0,  sub : 90, cuirasse : 0,helitrans :115, helico : 115, chass :55 , bomba : 65}
			},
			c_avancement : {'route' : 0, 'foret' : 0, 'plaine' : 0, 'plage' : 0, 'montagne' : 0, 'mer' : 1, 'lac' : 1}
		},
		Sub: {
			cout : 22000,
			vie : 100,
			fabrication : 'port',
			munition : {primAmmo: 6, secAmmo : 0},
			essence : 60,
			deplacement : 5,
			porteeTir : {min : 0, max : 1},
			vue : 5,
			attaque : {
			   primAmmo : {infantry : 0, bazooka : 0, tank : 0, tankm : 0 , neotank : 0, recon : 0, dca : 0, aair : 0, artillery :0,  lmiss : 0, vtb : 0,  barge : 95, destr : 25,  sub : 55, cuirasse : 55, helitrans :0, helico : 0, chass :0 , bomba : 0},
			    secAmmo : {infantry : 0, bazooka : 0, tank : 0, tankm : 0 , neotank : 0, recon : 0, dca : 0, aair : 0, artillery :0,  lmiss : 0, vtb : 0,  barge : 95, destr : 25,  sub : 55, cuirasse : 55, helitrans :0, helico : 0, chass :0 , bomba : 0}
			},
			c_avancement : {'route' : 0, 'foret' : 0, 'plaine' : 0, 'plage' : 0, 'montagne' : 0, 'mer' : 1, 'lac' : 1}
		},
		Cuirasse: {
			cout : 28000,
			vie : 100,
			fabrication : 'port',
			munition :{primAmmo: 9, secAmmo : 0},
			essence : 99,
			deplacement : 5,
			porteeTir : {min : 2, max : 6},
			vue : 2,
			attaque : {
			   primAmmo : {infantry : 95, bazooka : 90, tank : 80, tankm : 55 , neotank : 50, recon : 90, dca : 85, aair : 90, artillery :80,  lmiss : 85, vtb : 80,  barge : 95, destr : 95,  sub : 95, cuirasse : 50, helitrans :0, helico : 0, chass :0 , bomba : 0},
			    secAmmo : {infantry : 95, bazooka : 90, tank : 80, tankm : 55 , neotank : 50, recon : 90, dca : 85, aair : 90, artillery :80,  lmiss : 85, vtb : 80,  barge : 95, destr : 95,  sub : 95, cuirasse : 50, helitrans :0, helico : 0, chass :0 , bomba : 0}
			},
			c_avancement : {'route' : 0, 'foret' : 0, 'plaine' : 0, 'plage' : 0, 'montagne' : 0, 'mer' : 1, 'lac' : 1}
		},
		Helitrans: {
			cout : 5000,
			vie : 100,
			fabrication : 'aero',
			munition :{primAmmo: 0, secAmmo : 0},
			essence : 50,
			deplacement : 6,
			porteeTir : {min : 0, max : 0},
			vue : 2,
			attaque : {
			   primAmmo : {infantry : 0, bazooka : 0, tank : 0, tankm : 0 , neotank : 0, recon : 0, dca : 0, aair : 0, artillery :0,  lmiss : 0, vtb : 0,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,helitrans :0, helico : 0, chass :0 , bomba : 0},
			    secAmmo : {infantry : 0, bazooka : 0, tank : 0, tankm : 0 , neotank : 0, recon : 0, dca : 0, aair : 0, artillery :0,  lmiss : 0, vtb : 0,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,helitrans :0, helico : 0, chass :0 , bomba : 0}
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 1, 'mer' : 1, 'lac' : 1}
		},
		Helico: {
			cout : 9000,
			vie : 100,
			fabrication : 'aero',
			munition :{primAmmo: 6, secAmmo : 'inf'},
			essence : 99,
			deplacement : 6,
			porteeTir : {min : 0, max : 1},
			vue : 3,
			attaque : {
			   primAmmo : {infantry : 75, bazooka : 75, tank : 55, tankm : 25 , neotank : 20, recon : 55, dca : 25, aair : 65, artillery :65,  lmiss : 65, vtb : 60,  barge : 25, destr : 55,  sub : 25, cuirasse : 25, helitrans :95, helico : 65, chass :0 , bomba : 0},
			    secAmmo : {infantry : 75, bazooka : 75, tank : 6, tankm : 1 , neotank : 1, recon : 30, dca : 6, aair : 35, artillery :25,  lmiss : 35, vtb : 20,  barge : 0, destr : 0,  sub : 0, cuirasse : 0, helitrans :95, helico : 65, chass :0 , bomba : 0}
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 1, 'mer' : 1, 'lac' : 1}
		},
		Chass: {
			cout : 20000,
			vie : 100,
			fabrication : 'aero',
			munition :{primAmmo: 9, secAmmo : 0},
			essence : 99,
			deplacement : 9,
			porteeTir : {min : 0, max : 1},
			vue : 2,
			attaque : {
			   primAmmo : {infantry : 0, bazooka : 0, tank : 0, tankm : 0 , neotank : 0, recon : 0, dca : 0, aair : 0, artillery :0,  lmiss : 0, vtb : 0,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,helitrans :100, helico : 100, chass :55 , bomba : 100},
			    secAmmo : {infantry : 0, bazooka : 0, tank : 0, tankm : 0 , neotank : 0, recon : 0, dca : 0, aair : 0, artillery :0,  lmiss : 0, vtb : 0,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,helitrans :100, helico : 100, chass :55 , bomba : 100}
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 1, 'mer' : 1, 'lac' : 1}
		},
		Bomba: {
			cout : 22000,
			vie : 100,
			fabrication : 'aero',
			munition :{primAmmo: 9, secAmmo : 0},
			essence : 99,
			deplacement : 7,
			porteeTir : {min : 0, max : 1},
			vue : 2,
			attaque : {
			   primAmmo : {infantry : 110, bazooka : 110, tank : 105, tankm : 95 , neotank : 90, recon : 105, dca : 95, aair : 105, artillery :105,  lmiss : 105, vtb : 105,  barge : 95, destr : 85,  sub : 95, cuirasse : 75,helitrans :0, helico : 0, chass :0 , bomba : 0},
			    secAmmo : {infantry : 0, bazooka : 0, tank : 0, tankm : 0 , neotank : 0, recon : 0, dca : 0, aair : 0, artillery :0,  lmiss : 0, vtb : 0,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,helitrans :100, helico : 100, chass :55 , bomba : 100}
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 1, 'mer' : 1, 'lac' : 1}
		},
		
    }
}

