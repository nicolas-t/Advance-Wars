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
			munition : {primAmmo : 'inf', secAmmo : 0},
			essence : 99,
			deplacement : 3,
			porteeTir : {min : 0, max : 1},
			vue : 2,
			attaque :{
			   primAmmo : {infantry : 55, bazooka : 45, recon : 12, vtb : 14, tank : 5, tankM : 1 , neoTank : 1, dca : 5, artillery :15, aAir : 26, lMiss : 25,  cuirasse : 0, sub : 0, destr : 0, barge : 0, helico : 7, chass :0 , bomba : 0, heliTrans :30 },
			    secAmmo : {infantry : 55, bazooka : 45, recon : 12, vtb : 14, tank : 5, tankM : 1 , neoTank : 1, dca : 5, artillery :15, aAir : 26, lMiss : 25,  cuirasse : 0, sub : 0, destr : 0, barge : 0, helico : 7, chass :0 , bomba : 0, heliTrans :30 }
			    },
			c_avancement : {'route' : 1, 'foret' : 2, 'plaine' : 2, 'plage' : 0, 'montagne' : 3, 'mer' : 0, 'lac' : 0}
		},
		Bazooka: {
			cout : 3000,
			vie : 100,
			munition : {primAmmo: 3, secAmmo : 'inf' },
			essence : 99,
			deplacement : 2,
			porteeTir : {min : 0, max : 1},
			vue : 2,
			attaque : {
			   primAmmo : {infantry : 65, bazooka : 55, tank : 55, tankM : 15 , neoTank : 15, recon : 85, dca : 65, aAir : 85, artillery :70,  lMiss : 85, vtb : 75,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,heliTrans :35, helico : 9, chass :0 , bomba : 0 },
			    secAmmo : {infantry : 65, bazooka : 55, tank : 6, tankM : 1 , neoTank : 1, recon : 18, dca : 6, aAir : 35, artillery :32,  lMiss : 35, vtb : 20,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,heliTrans :35, helico : 9, chass :0 , bomba : 0}
			},
			c_avancement : {'route' : 1, 'foret' : 2, 'plaine' : 2, 'plage' : 0, 'montagne' : 3, 'mer' : 0, 'lac' : 0}
		},
		Tank: {
			cout : 7000,
			vie : 100,
			munition : {primAmmo: 9, secAmmo : 'inf'},
			essence : 70,
			deplacement : 6,
			porteeTir : {min : 0, max : 1},
			vue : 3,
			attaque : {
			   primAmmo : {infantry : 75, bazooka : 70, tank : 55, tankM : 15 , neoTank : 15, recon : 85, dca : 65, aAir : 85, artillery :70,  lMiss : 85, vtb : 75,  barge : 10, destr : 5,  sub : 1, cuirasse : 1,heliTrans :40, helico : 10, chass :0 , bomba : 0 },
			    secAmmo : {infantry : 75, bazooka : 70, tank : 6, tankM : 1 , neoTank : 1, recon : 40, dca : 6, aAir : 30, artillery :45,  lMiss : 55, vtb : 45,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,heliTrans :40, helico : 10, chass :0 , bomba : 0}
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 0, 'mer' : 0, 'lac' : 0}
		},
		TankM: {
			cout : 16000,
			vie : 100,
			munition :{primAmmo: 8, secAmmo : 'inf' },
			essence : 50,
			deplacement : 5,
			porteeTir : {min : 0, max : 1},
			vue : 1,
			attaque : {
			   primAmmo : {infantry : 105, bazooka : 95, tank : 85, tankM : 55 , neoTank : 45, recon : 105, dca : 105, aAir : 105, artillery :100,  lMiss : 105, vtb : 105,  barge : 35, destr : 45,  sub : 10, cuirasse : 10,heliTrans :45, helico : 12, chass :0 , bomba : 0 },
			    secAmmo : {infantry : 105, bazooka : 95, tank : 8, tankM : 1 , neoTank : 1, recon : 45, dca : 7, aAir : 35, artillery :45,  lMiss : 55, vtb : 45,  barge : 0, destr : 0,  sub : 0, cuirasse : 0, heliTrans :45, helico : 12, chass :0 , bomba : 0 }
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 0, 'mer' : 0, 'lac' : 0}
		},
		NeoTank: {
			cout : 22000,
			vie : 100,
			munition :{primAmmo: 9, secAmmo : 'inf' },
			essence : 99,
			deplacement : 6,
			porteeTir : {min : 0, max : 1},
			vue : 1,
			attaque : {
			   primAmmo : {infantry : 125, bazooka : 115, tank : 105, tankM : 75 , neoTank : 55, recon : 125, dca : 115, aAir : 125, artillery :115,  lMiss : 125, vtb : 125,  barge : 50, destr : 50,  sub : 15, cuirasse : 15, heliTrans : 55, helico : 22, chass :0 , bomba : 0 },
			    secAmmo : {infantry : 125, bazooka : 115, tank : 10, tankM : 1 , neoTank : 1, recon : 65, dca : 17, aAir : 55, artillery :65,  lMiss : 75, vtb : 65,  barge : 0, destr : 0,  sub : 0, cuirasse : 0, heliTrans :55, helico : 22, chass :0 , bomba : 0 }
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 0, 'mer' : 0, 'lac' : 0}
		},
		Recon: {
			cout : 4000,
			vie : 100,
			munition :{primAmmo: 'inf', secAmmo : 0},
			essence : 80,
			deplacement : 8,
			porteeTir : {min : 0, max : 1},
			vue : 5,
			attaque : {
			   primAmmo : {infantry : 70, bazooka : 65, tank : 6, tankM : 1 , neoTank : 1, recon : 35, dca : 4, aAir : 28, artillery :45,  lMiss : 55, vtb : 45,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,heliTrans :35, helico : 10, chass :0 , bomba : 0 },
			    secAmmo : {infantry : 70, bazooka : 65, tank : 6, tankM : 1 , neoTank : 1, recon : 35, dca : 4, aAir : 28, artillery :45,  lMiss : 55, vtb : 45,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,heliTrans :35, helico : 10, chass :0 , bomba : 0 }
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 0, 'mer' : 0, 'lac' : 0}
		},
		Dca: {
			cout : 8000,
			vie : 100,
			munition :{primAmmo: 9, secAmmo : 0},
			essence : 60,
			deplacement : 6,
			porteeTir : {min : 0, max : 1},
			vue : 2,
			attaque : {
			   primAmmo : {infantry : 105, bazooka : 105, tank : 25, tankM : 10 , neoTank : 5, recon : 60, dca : 45, aAir : 55, artillery :50,  lMiss : 55, vtb : 50,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,heliTrans :120, helico : 120, chass :65 , bomba : 75},
			    secAmmo : {infantry : 105, bazooka : 105, tank : 25, tankM : 10 , neoTank : 5, recon : 60, dca : 45, aAir : 55, artillery :50,  lMiss : 55, vtb : 50,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,heliTrans :120, helico : 120, chass :65 , bomba : 75}
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 0, 'mer' : 0, 'lac' : 0}
		},
		AAir: {
			cout : 12000,
			vie : 100,
			munition :{primAmmo:6, secAmmo :0},
			essence : 50,
			deplacement : 4,
			porteeTir : {min : 3, max : 5},
			vue : 5,
			attaque : {
			   primAmmo : {infantry : 0, bazooka : 0, tank : 0, tankM : 0 , neoTank : 0, recon : 0, dca : 0, aAir : 0, artillery :0,  lMiss : 0, vtb : 0,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,heliTrans :120, helico : 120, chass :100 , bomba : 100},
			    secAmmo : {infantry : 0, bazooka : 0, tank : 0, tankM : 0 , neoTank : 0, recon : 0, dca : 0, aAir : 0, artillery :0,  lMiss : 0, vtb : 0,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,heliTrans :120, helico : 120, chass :100 , bomba : 100}
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 0, 'mer' : 0, 'lac' : 0}
		},
		Artillery: {
			cout : 6000,
			vie : 100,
			munition :{primAmmo: 9, secAmmo : 0},
			essence : 50,
			deplacement : 5,
			porteeTir : {min : 2, max : 3},
			vue : 1,
			attaque : {
			   primAmmo : {infantry : 90, bazooka : 85, tank : 70, tankM : 45 , neoTank : 40, recon : 80, dca : 75, aAir : 80, artillery :75,  lMiss : 80, vtb : 70,  barge : 55, destr : 65,  sub : 60, cuirasse : 40,heliTrans :0, helico : 0, chass :0 , bomba : 0},
			    secAmmo : {infantry : 90, bazooka : 85, tank : 70, tankM : 45 , neoTank : 40, recon : 80, dca : 75, aAir : 80, artillery :75,  lMiss : 80, vtb : 70,  barge : 55, destr : 65,  sub : 60, cuirasse : 40,heliTrans :0, helico : 0, chass :0 , bomba : 0}
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 0, 'mer' : 0, 'lac' : 0}
		},
		LMiss: {
			cout : 15000,
			vie : 100,
			munition :{primAmmo: 6, secAmmo : 0},
			essence : 50,
			deplacement : 5,
			porteeTir : {min : 3, max : 5},
			vue : 1,
			attaque : {
			   primAmmo : {infantry : 95, bazooka : 90, tank : 80, tankM : 55 , neoTank : 50, recon : 90, dca : 85, aAir : 90, artillery :80,  lMiss : 85, vtb : 80,  barge : 60, destr : 85,  sub : 85, cuirasse : 55,heliTrans :0, helico : 0, chass :0 , bomba : 0},
			    secAmmo : {infantry : 95, bazooka : 90, tank : 80, tankM : 55 , neoTank : 50, recon : 90, dca : 85, aAir : 90, artillery :80,  lMiss : 85, vtb : 80,  barge : 60, destr : 85,  sub : 85, cuirasse : 55,heliTrans :0, helico : 0, chass :0 , bomba : 0}
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 0, 'mer' : 0, 'lac' : 0}
		},
		Vtb: {
			cout : 5000,
			vie : 100,
			munition :{primAmmo: 0, secAmmo : 0},
			essence : 70,
			deplacement : 6,
			porteeTir : {min : 0, max : 0},
			vue : 1,
			attaque : {
			   primAmmo : {infantry : 0, bazooka : 0, tank : 0, tankM : 0 , neoTank : 0, recon : 0, dca : 0, aAir : 0, artillery :0,  lMiss : 0, vtb : 0,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,heliTrans :0, helico : 0, chass :0 , bomba : 0},
			    secAmmo : {infantry : 0, bazooka : 0, tank : 0, tankM : 0 , neoTank : 0, recon : 0, dca : 0, aAir : 0, artillery :0,  lMiss : 0, vtb : 0,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,heliTrans :0, helico : 0, chass :0 , bomba : 0}
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 0, 'mer' : 0, 'lac' : 0}
		},
		Barge: {
			cout : 12000,
			vie : 100,
			munition :{primAmmo: 0, secAmmo : 0},
			essence : 99,
			deplacement : 6,
			porteeTir : {min : 0, max : 0},
			vue : 1,
			attaque : {
			   primAmmo : {infantry : 0, bazooka : 0, tank : 0, tankM : 0 , neoTank : 0, recon : 0, dca : 0, aAir : 0, artillery :0,  lMiss : 0, vtb : 0,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,heliTrans :0, helico : 0, chass :0 , bomba : 0},
			    secAmmo : {infantry : 0, bazooka : 0, tank : 0, tankM : 0 , neoTank : 0, recon : 0, dca : 0, aAir : 0, artillery :0,  lMiss : 0, vtb : 0,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,heliTrans :0, helico : 0, chass :0 , bomba : 0}
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 0, 'mer' : 0, 'lac' : 0}
		},
		Destr: {
			cout : 18000,
			vie : 100,
			munition : {primAmmo: 9, secAmmo : 0},
			essence : 99,
			deplacement : 6,
			porteeTir : {min : 0, max : 1},
			vue : 3,
			attaque : {
			   primAmmo : {infantry : 0, bazooka : 0, tank : 0, tankM : 0 , neoTank : 0, recon : 0, dca : 0, aAir : 0, artillery :0,  lMiss : 0, vtb : 0,  barge : 0, destr : 0,  sub : 90, cuirasse : 0,heliTrans :115, helico : 115, chass :55 , bomba : 65},
			    secAmmo : {infantry : 0, bazooka : 0, tank : 0, tankM : 0 , neoTank : 0, recon : 0, dca : 0, aAir : 0, artillery :0,  lMiss : 0, vtb : 0,  barge : 0, destr : 0,  sub : 90, cuirasse : 0,heliTrans :115, helico : 115, chass :55 , bomba : 65}
			},
			c_avancement : {'route' : 0, 'foret' : 0, 'plaine' : 0, 'plage' : 0, 'montagne' : 0, 'mer' : 1, 'lac' : 1}
		},
		Sub: {
			cout : 22000,
			vie : 100,
			munition : {primAmmo: 6, secAmmo : 0},
			essence : 60,
			deplacement : 5,
			porteeTir : {min : 0, max : 1},
			vue : 5,
			attaque : {
			   primAmmo : {infantry : 0, bazooka : 0, tank : 0, tankM : 0 , neoTank : 0, recon : 0, dca : 0, aAir : 0, artillery :0,  lMiss : 0, vtb : 0,  barge : 95, destr : 25,  sub : 55, cuirasse : 55, heliTrans :0, helico : 0, chass :0 , bomba : 0},
			    secAmmo : {infantry : 0, bazooka : 0, tank : 0, tankM : 0 , neoTank : 0, recon : 0, dca : 0, aAir : 0, artillery :0,  lMiss : 0, vtb : 0,  barge : 95, destr : 25,  sub : 55, cuirasse : 55, heliTrans :0, helico : 0, chass :0 , bomba : 0}
			},
			c_avancement : {'route' : 0, 'foret' : 0, 'plaine' : 0, 'plage' : 0, 'montagne' : 0, 'mer' : 1, 'lac' : 1}
		},
		Cuirasse: {
			cout : 28000,
			vie : 100,
			munition :{primAmmo: 9, secAmmo : 0},
			essence : 99,
			deplacement : 5,
			porteeTir : {min : 2, max : 6},
			vue : 2,
			attaque : {
			   primAmmo : {infantry : 95, bazooka : 90, tank : 80, tankM : 55 , neoTank : 50, recon : 90, dca : 85, aAir : 90, artillery :80,  lMiss : 85, vtb : 80,  barge : 95, destr : 95,  sub : 95, cuirasse : 50, heliTrans :0, helico : 0, chass :0 , bomba : 0},
			    secAmmo : {infantry : 95, bazooka : 90, tank : 80, tankM : 55 , neoTank : 50, recon : 90, dca : 85, aAir : 90, artillery :80,  lMiss : 85, vtb : 80,  barge : 95, destr : 95,  sub : 95, cuirasse : 50, heliTrans :0, helico : 0, chass :0 , bomba : 0}
			},
			c_avancement : {'route' : 0, 'foret' : 0, 'plaine' : 0, 'plage' : 0, 'montagne' : 0, 'mer' : 1, 'lac' : 1}
		},
		HeliTrans: {
			cout : 5000,
			vie : 100,
			munition :{primAmmo: 0, secAmmo : 0},
			essence : 50,
			deplacement : 6,
			porteeTir : {min : 0, max : 0},
			vue : 2,
			attaque : {
			   primAmmo : {infantry : 0, bazooka : 0, tank : 0, tankM : 0 , neoTank : 0, recon : 0, dca : 0, aAir : 0, artillery :0,  lMiss : 0, vtb : 0,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,heliTrans :0, helico : 0, chass :0 , bomba : 0},
			    secAmmo : {infantry : 0, bazooka : 0, tank : 0, tankM : 0 , neoTank : 0, recon : 0, dca : 0, aAir : 0, artillery :0,  lMiss : 0, vtb : 0,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,heliTrans :0, helico : 0, chass :0 , bomba : 0}
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 1, 'mer' : 1, 'lac' : 1}
		},
		Helico: {
			cout : 9000,
			vie : 100,
			munition :{primAmmo: 6, secAmmo : 'inf'},
			essence : 99,
			deplacement : 6,
			porteeTir : {min : 0, max : 1},
			vue : 3,
			attaque : {
			   primAmmo : {infantry : 75, bazooka : 75, tank : 55, tankM : 25 , neoTank : 20, recon : 55, dca : 25, aAir : 65, artillery :65,  lMiss : 65, vtb : 60,  barge : 25, destr : 55,  sub : 25, cuirasse : 25, heliTrans :95, helico : 65, chass :0 , bomba : 0},
			    secAmmo : {infantry : 75, bazooka : 75, tank : 6, tankM : 1 , neoTank : 1, recon : 30, dca : 6, aAir : 35, artillery :25,  lMiss : 35, vtb : 20,  barge : 0, destr : 0,  sub : 0, cuirasse : 0, heliTrans :95, helico : 65, chass :0 , bomba : 0}
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 1, 'mer' : 1, 'lac' : 1}
		},
		Chass: {
			cout : 20000,
			vie : 100,
			munition :{primAmmo: 9, secAmmo : 0},
			essence : 99,
			deplacement : 9,
			porteeTir : {min : 0, max : 1},
			vue : 2,
			attaque : {
			   primAmmo : {infantry : 0, bazooka : 0, tank : 0, tankM : 0 , neoTank : 0, recon : 0, dca : 0, aAir : 0, artillery :0,  lMiss : 0, vtb : 0,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,heliTrans :100, helico : 100, chass :55 , bomba : 100},
			    secAmmo : {infantry : 0, bazooka : 0, tank : 0, tankM : 0 , neoTank : 0, recon : 0, dca : 0, aAir : 0, artillery :0,  lMiss : 0, vtb : 0,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,heliTrans :100, helico : 100, chass :55 , bomba : 100}
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 1, 'mer' : 1, 'lac' : 1}
		},
		Bomba: {
			cout : 22000,
			vie : 100,
			munition :{primAmmo: 9, secAmmo : 0},
			essence : 99,
			deplacement : 7,
			porteeTir : {min : 0, max : 1},
			vue : 2,
			attaque : {
			   primAmmo : {infantry : 110, bazooka : 110, tank : 105, tankM : 95 , neoTank : 90, recon : 105, dca : 95, aAir : 105, artillery :105,  lMiss : 105, vtb : 105,  barge : 95, destr : 85,  sub : 95, cuirasse : 75,heliTrans :0, helico : 0, chass :0 , bomba : 0},
			    secAmmo : {infantry : 0, bazooka : 0, tank : 0, tankM : 0 , neoTank : 0, recon : 0, dca : 0, aAir : 0, artillery :0,  lMiss : 0, vtb : 0,  barge : 0, destr : 0,  sub : 0, cuirasse : 0,heliTrans :100, helico : 100, chass :55 , bomba : 100}
			},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 1, 'mer' : 1, 'lac' : 1}
		},
		
    }
}

