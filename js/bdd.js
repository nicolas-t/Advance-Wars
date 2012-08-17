decors = new Array();

decors['plaine']= new Array();
decors['plaine']['c_avancement']=new Array();
decors['plaine']['c_avancement']['infanterie']=2;
decors['plaine']['c_avancement']['tank']=2;
decors['plaine']['c_avancement']['bateau']=0;
decors['plaine']['c_avancement']['helico']=1;
decors['plaine']['c_defense']=1;
decors['plaine']['sprite']='sprites/plaine.jpg';
	decors['plaine_ombre_montagne'] = $.extend(true, [], decors['plaine']);
	decors['plaine_ombre_montagne']['sprite']='sprites/plaine_ombre_montagne.jpg';
	decors['plaine_sommet_montagne'] = $.extend(true, [], decors['plaine']);
	decors['plaine_sommet_montagne']['sprite']='sprites/plaine_sommet_montagne.jpg';

	
decors['plage']= new Array();
decors['plage']['c_avancement']=new Array();
decors['plage']['c_avancement']['infanterie']=1;
decors['plage']['c_avancement']['tank']=0;
decors['plage']['c_avancement']['bateau']=0;
decors['plage']['c_avancement']['helico']=1;
decors['plage']['c_defense']=1;
decors['plage']['sprite']='sprites/plage.jpg';
	decors['plage_bord_bas']= $.extend(true, [], decors['plage']);
	decors['plage_bord_bas']['sprite']='sprites/plage_bord_bas.jpg';
	decors['plage_bord_droite']= $.extend(true, [], decors['plage']);
	decors['plage_bord_droite']['sprite']='sprites/plage_bord_droite.jpg';
	decors['plage_bord_gauche']= $.extend(true, [], decors['plage']);
	decors['plage_bord_gauche']['sprite']='sprites/plage_bord_gauche.jpg';
	decors['plage_bord_haut']= $.extend(true, [], decors['plage']);
	decors['plage_bord_haut']['sprite']='sprites/plage_bord_haut.jpg';
	decors['plage_coin_bas_droite']= $.extend(true, [], decors['plage']);
	decors['plage_coin_bas_droite']['sprite']='sprites/plage_coin_bas_droite.jpg';
	decors['plage_coin_bas_gauche']= $.extend(true, [], decors['plage']);
	decors['plage_coin_bas_gauche']['sprite']='sprites/plage_coin_bas_gauche.jpg';
	decors['plage_coin_haut_droite']= $.extend(true, [],decors['plage'] );
	decors['plage_coin_haut_droite']['sprite']='sprites/plage_coin_haut_droite.jpg';
	decors['plage_coin_haut_gauche']= $.extend(true, [], decors['plage']);
	decors['plage_coin_haut_gauche']['sprite']='sprites/plage_coin_haut_gauche.jpg';
	
	
decors['montagne']= new Array();
decors['montagne']['c_avancement']=new Array();
decors['montagne']['c_avancement']['infanterie']=3;
decors['montagne']['c_avancement']['tank']=0;
decors['montagne']['c_avancement']['bateau']=0;
decors['montagne']['c_avancement']['helico']=1;
decors['montagne']['c_defense']=3;
decors['montagne']['sprite']='sprites/mont.jpg';
	decors['montagne_petite_sommet']= $.extend(true, [], decors['montagne']);
	decors['montagne_petite_sommet']['sprite']='sprites/montagne_petite_sommet.jpg';
	decors['montagne_sommet_montagne']= $.extend(true, [],decors['montagne'] );
	decors['montagne_sommet_montagne']['sprite']='sprites/montagne_sommet_montagne.jpg';
	decors['montagne_grande']= $.extend(true, [], decors['montagne']);
	decors['montagne_grande']['sprite']='sprites/montagne_grande.jpg';

decors['mer']= new Array();
decors['mer']['c_avancement']=new Array();
decors['mer']['c_avancement']['infanterie']=0;
decors['mer']['c_avancement']['tank']=0;
decors['mer']['c_avancement']['bateau']=1;
decors['mer']['c_avancement']['helico']=1;
decors['mer']['c_defense']=1;
decors['mer']['sprite']='sprites/mer.jpg';
	decors['mer_coin_bas_droite']=$.extend(true, [], decors['mer']);
	decors['mer_coin_bas_droite']['sprite']='sprites/mer_coin_bas_droite.jpg';
	decors['mer_coin_bas_gauche']=$.extend(true, [], decors['mer']);
	decors['mer_coin_bas_gauche']['sprite']='sprites/mer_coin_bas_gauche.jpg';
	decors['mer_coin_haut_droite']=$.extend(true, [], decors['mer']);
	decors['mer_coin_haut_droite']['sprite']='sprites/mer_coin_haut_droite.jpg';
	decors['mer_coin_haut_gauche']=$.extend(true, [], decors['mer']);
	decors['mer_coin_haut_gauche']['sprite']='sprites/mer_coin_haut_gauche.jpg';


decors['lac']= new Array();
decors['lac']['c_avancement']=new Array();
decors['lac']['c_avancement']['infanterie']=2;
decors['lac']['c_avancement']['tank']=0;
decors['lac']['c_avancement']['bateau']=1;
decors['lac']['c_avancement']['helico']=1;
decors['lac']['c_defense']=2;
decors['lac']['sprite']='sprites/lac.jpg';
	decors['lac_bas_droite']= $.extend(true, [], decors['lac']);
	decors['lac_bas_droite']['sprite']='sprites/lac_bas_droite.jpg';
	decors['lac_bas_gauche']=$.extend(true, [],decors['lac'] );
	decors['lac_bas_gauche']['sprite']='sprites/lac_bas_gauche.jpg';
	decors['lac_bas']= $.extend(true, [], decors['lac']);
	decors['lac_bas']['sprite']='sprites/lac_bas.jpg';
	decors['lac_gauche']= $.extend(true, [], decors['lac']);
	decors['lac_gauche']['sprite']='sprites/lac_gauche.jpg';
	decors['lac_haut_droite']= $.extend(true, [], decors['lac']);
	decors['lac_haut_droite']['sprite']='sprites/lac_haut_droite.jpg';
	decors['lac_haut_gauche']= $.extend(true, [],decors['lac'] );
	decors['lac_haut_gauche']['sprite']='sprites/lac_haut_gauche.jpg';
	decors['lac_haut']= $.extend(true, [],decors['lac'] );
	decors['lac_haut']['sprite']='sprites/lac_haut.jpg';
	
decors['riviere']= new Array();
decors['riviere']['c_avancement']=new Array();
decors['riviere']['c_avancement']['infanterie']=2;
decors['riviere']['c_avancement']['tank']=0;
decors['riviere']['c_avancement']['bateau']=0;
decors['riviere']['c_avancement']['helico']=1;
decors['riviere']['c_defense']=2;
decors['riviere']['sprite']='sprites/riviere.jpg';
	decors['riviere_h_droite']= $.extend(true, [], decors['riviere']);
	decors['riviere_h_droite']['sprite']='sprites/riviere_h_droite.jpg';
	decors['riviere_h_gauche']=$.extend(true, [], decors['riviere']);
	decors['riviere_h_gauche']['sprite']='sprites/riviere_h_gauche.jpg';
	decors['riviere_h_milieu']= $.extend(true, [], decors['riviere']);
	decors['riviere_h_milieu']['sprite']='sprites/riviere_h_milieu.jpg';
	decors['riviere_trou']= $.extend(true, [], decors['riviere']);
	decors['riviere_trou']['sprite']='sprites/riviere_trou.jpg';
	decors['riviere_v_bas']= $.extend(true, [], decors['riviere']);
	decors['riviere_v_bas']['sprite']='sprites/riviere_v_bas.jpg';
	decors['riviere_v_haut']= $.extend(true, [], decors['riviere']);
	decors['riviere_v_haut']['sprite']='sprites/riviere_v_haut.jpg';
	decors['riviere_v_milieu']= $.extend(true, [], decors['riviere']);
	decors['riviere_v_milieu']['sprite']='sprites/riviere_v_milieu.jpg';
	

decors['foret']= new Array();
decors['foret']['c_avancement']=new Array();
decors['foret']['c_avancement']['infanterie']=2;
decors['foret']['c_avancement']['tank']=2;
decors['foret']['c_avancement']['bateau']=0;
decors['foret']['c_avancement']['helico']=1;
decors['foret']['c_defense']=2;
decors['foret']['sprite']='sprites/foret.jpg';
	decors['foret_grosse_bas_droite']=$.extend(true, [], decors['foret']);
	decors['foret_grosse_bas_droite']['sprite']='sprites/foret_grosse_bas_droite.jpg';
	decors['foret_grosse_bas_gauche']=$.extend(true, [], decors['foret']);
	decors['foret_grosse_bas_gauche']['sprite']='sprites/foret_grosse_bas_gauche.jpg';
	decors['foret_grosse_haut_droite']=$.extend(true, [], decors['foret']);
	decors['foret_grosse_haut_droite']['sprite']='sprites/foret_grosse_haut_droite.jpg';
	decors['foret_grosse_haut_gauche']=$.extend(true, [], decors['foret']);
	decors['foret_grosse_haut_gauche']['sprite']='sprites/foret_grosse_haut_gauche.jpg';

decors['route']= new Array();
decors['route']['c_avancement']=new Array();
decors['route']['c_avancement']['infanterie']=1;
decors['route']['c_avancement']['tank']=1;
decors['route']['c_avancement']['bateau']=0;
decors['route']['c_avancement']['helico']=1;
decors['route']['c_defense']=0;
decors['route']['sprite']='sprites/route.jpg';
	decors['route_coin_bas_droite']= $.extend(true, [], decors['route']);
	decors['route_coin_bas_droite']['sprite']='sprites/route_coin_bas_droite.jpg';
	decors['route_coin_bas_gauche']= $.extend(true, [], decors['route']);
	decors['route_coin_bas_gauche']['sprite']='sprites/route_coin_bas_gauche.jpg';
	decors['route_coin_haut_droite']= $.extend(true, [], decors['route']);
	decors['route_coin_haut_droite']['sprite']='sprites/route_coin_haut_droite.jpg';
	decors['route_coin_haut_gauche']= $.extend(true, [], decors['route']);
	decors['route_coin_haut_gauche']['sprite']='sprites/route_coin_haut_gauche.jpg';
	decors['route_h']= $.extend(true, [], decors['route']);
	decors['route_h']['sprite']='sprites/route_h.jpg';
	decors['route_v']= $.extend(true, [], decors['route']);
	decors['route_v']['sprite']='sprites/route_v.jpg';


unites = new Array();

unites['infanterie'] = new Array();
unites['infanterie']['vie'] = 10;
unites['infanterie']['attaque'] = new Array();
unites['infanterie']['attaque']['infanterie'] = 50;
unites['infanterie']['attaque']['tank'] = 15;
unites['infanterie']['attaque']['bateau'] = 10;
unites['infanterie']['attaque']['helico'] = 0;
unites['infanterie']['munitions'] = 80;
unites['infanterie']['essence'] = 10000;
unites['infanterie']['deplacement'] = 3;
unites['infanterie']['portee_tir'] = 1;
unites['infanterie']['vue'] = 2;

var BDD = {
    Unites: {
		Tank: {
			cout : 7000,
			vie : 10,
			munition : 50,
			essence : 60,
			deplacement : 10,
			porteeTir : {min : 0, max : 1},
			vue : 3,
			attaque : {infanterie : 75, tank : 50, bateau : 40, helico : 20},
			c_avancement : {'route' : 1, 'foret' : 2, 'plaine' : 2, 'plage' : 0, 'montagne' : 0, 'mer' : 0, 'lac' : 0}
		},
		Infantry: {
			cout : 1000,
			vie : 10,
			munition : 9999,
			essence : 99,
			deplacement : 3,
			porteeTir : {min : 0, max : 1},
			vue : 2,
			attaque : {infanterie : 75, tank : 50, bateau : 40, helico : 20},
			c_avancement : {'route' : 1, 'foret' : 1, 'plaine' : 1, 'plage' : 1, 'montagne' : 3, 'mer' : 0, 'lac' : 0}
		}
    }
}

unites['bateau'] = new Array();
unites['bateau']['vie'] = 10;
unites['bateau']['attaque'] = new Array();
unites['bateau']['attaque']['infanterie'] = 80;
unites['bateau']['attaque']['tank'] = 40;
unites['bateau']['attaque']['bateau'] = 50;
unites['bateau']['attaque']['helico'] = 30;
unites['bateau']['munitions'] = 60;
unites['bateau']['essence'] = 100;
unites['bateau']['deplacement'] = 3;
unites['bateau']['portee_tir'] = 1;
unites['bateau']['vue'] = 1;


unites['helico'] = new Array();
unites['helico']['vie'] = 10;
unites['helico']['attaque'] = new Array();
unites['helico']['attaque']['infanterie'] = 85;
unites['helico']['attaque']['tank'] = 45;
unites['helico']['attaque']['bateau'] = 65;
unites['helico']['attaque']['helico'] = 50;
unites['helico']['munitions'] = 60;
unites['helico']['essence'] = 140;
unites['helico']['deplacement'] = 8;
unites['helico']['portee_tir'] = 1;
unites['helico']['vue'] = 4;

