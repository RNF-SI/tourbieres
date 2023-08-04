import { Component, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ExcelService } from 'src/app/services/excel.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FiltreReservesPipe } from 'src/app/pipes/filtre-reserves.pipe';
import { max } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})

export class DataComponent {

  constructor(
    private dataService: DataService,
    private excelService: ExcelService,
    private filtreReservesPipe : FiltreReservesPipe
  ){}

  @ViewChild('myPaginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;

  reserves : any;
  rns_filtered: any = [];
  rns_export = [];
  loadreserves: boolean=true;

  showNbtourbieres = false;
  showModeDetermination = false;
  showenjeux_st = false;
  showSuivisBiologiques = false;
  showSuivisHydro = false;
  showSuivisClimat = false;
  showSuivisPhychi = false;
  showActions = false;
  showNomReserve = false;

  showSuptourbieres = false;
  showActiviteT = false;
  showGeneseT = false;
  showSourceEau = false;
  showNiveauTrophique = false;
  showPh = false;
  showTypeT = false;
  showPressions = false;
  showPressionsEvol = false;
  showConservationFonctionnel = false;
  showConservationBiologique = false;

  enjeux_st : any = {};
  enjeux_st_selected : any;

  query_nb_tourb_min = 0;
  query_nb_tourb_max = 0;
  query_sup_tourb_min = 0;
  query_sup_tourb_max = 10;

  source_eau : any = {};
  source_eau_selected : any;
  niveau_trophique : any = {};
  niveau_trophique_selected : any;
  ph : any = {};
  ph_selected :any;
  pressions : any = {};
  tourisme : any;
  incendie : any;
  dereglement_hydrique : any;
  sylviculture : any;
  surenrichissement : any;
  pollution : any;
  pastoralisme : any;
  perturbation_climatique : any;
  pressions_evol : any = {};
  tourisme_evol : any;
  incendie_evol : any;
  dereglement_hydrique_evol : any;
  sylviculture_evol : any;
  surenrichissement_evol : any;
  pollution_evol : any;
  pastoralisme_evol : any;
  perturbation_climatique_evol : any;

  etat_conservation : any = {};
  etat_conservation_evol: any = {};
  etat_cons_biol : any;
  etat_cons_biol_evol : any;
  etat_cons_fonc : any ;
  etat_cons_fonc_evol : any;

  nomenclatureSelectSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id_nomenclature',
    textField: 'label',
    allowSearchFilter: false,
    enableCheckAll: true,
    selectAllText: 'Tout sélectionner',
    unSelectAllText: 'Tout déselectionner',
    itemsShowLimit: 3
  };

  standardSelectSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'valeur',
    textField: 'label',
    allowSearchFilter: false,
    enableCheckAll: true,
    selectAllText: 'Tout sélectionner',
    unSelectAllText: 'Tout déselectionner',
    itemsShowLimit: 3
  };

  reserveSelectSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id_local',
    textField: 'nom_site',
    allowSearchFilter: true,
    searchPlaceholderText: 'Rechercher une réserve',
    enableCheckAll: true,
    selectAllText: 'Tout sélectionner',
    unSelectAllText: 'Tout déselectionner',
    itemsShowLimit: 3
  };

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id_local', 'id_inpn', 'nom_site', 'contact_nom', 'contact_emploi', 'contact_mail'];

  //liste d'items pour les réserves

  reserves_nom_selected = []

  mode_determination = [{'valeur': 'profondeur', 'label': 'Prodondeur de tourbe'},{'valeur': 'carbone', 'label': 'Pourcentage de carbone'},{'valeur': 'flore', 'label': 'Flore / Habitat'},{'valeur': 'autre', 'label': 'Autre'}];
  mode_determination_selected = this.mode_determination

  filtreslisteReserves = []
  filtreslisteReserves_selected = []

  filtreslisteTourbieres = []
  filtreslisteTourbieres_selected = []

  suivis_biologiques = [
    {'valeur': 'suivi_bio_hab', 'label': 'Habitat'},
    {'valeur': 'suivi_bio_mam', 'label': 'Mammifère'},
    {'valeur': 'suivi_bio_ois', 'label': 'Oiseau'},
    {'valeur': 'suivi_bio_batr', 'label': 'Amphibien'},
    {'valeur': 'suivi_bio_rep', 'label': 'Reptile'},
    {'valeur': 'suivi_bio_veg', 'label': 'Flore'},
    {'valeur': 'suivi_bio_artt', 'label': 'Arthropode terrestre'},
    {'valeur': 'suivi_bio_arta', 'label': 'Arthropode aquatique'},
    {'valeur': 'suivi_bio_fun', 'label': 'Fungi'},
    {'valeur': 'suivi_bio_lic', 'label': 'Lichen'},
    {'valeur': 'suivi_bio_bry', 'label': 'Bryophytes'},
    {'valeur': 'suivi_bio_alg', 'label': 'Algues'},
    {'valeur': 'suivi_bio_adn', 'label': 'ADN environnemental'},
    {'valeur': 'suivi_bio_pat', 'label': 'Espèce patrimoniale'},
    {'valeur': 'aucun', 'label': 'Aucun suivi biologique'}];
  suivis_biologiques_selected = this.suivis_biologiques

  suivis_hydro = [
    {'valeur': 'suivi_hydro_qual', 'label': 'Qualité de l\'eau'},
    {'valeur': 'suivi_hydro_haut', 'label': 'Hauteur d\'eau'},
    {'valeur': 'suivi_hydro_geol', 'label': 'Hydrogéologie'},
    {'valeur': 'aucun', 'label': 'Aucun suivi hydrologique'}
  ]
  suivis_hydro_selected = this.suivis_hydro

  suivis_climat = [
    {'valeur' : "suivi_clim_pluv", 'label': 'Pluviométrie'},
    {'valeur' : "suivi_clim_tair", 'label': 'Température de l\'air'},
    {'valeur' : "suivi_clim_teau", 'label': 'Température de l\'eau'},
    {'valeur' : "suivi_clim_rayo", 'label': 'Rayonnement'},
    {'valeur' : "suivi_clim_vent", 'label': 'Vent'},
    {'valeur': 'aucun', 'label': 'Aucun suivi climatique'}
  ]
  suivis_climat_selected = this.suivis_climat

  suivis_phychi = [
    {'valeur': "suivi_phychi_phos", 'label': 'Phosphore'},
    {'valeur': "suivi_phychi_ph", 'label': 'pH'},
    {'valeur': "suivi_phychi_turb", 'label': 'Turbidité'},
    {'valeur': "suivi_phychi_cond", 'label': 'Conductivité'},
    {'valeur': "suivi_phychi_azot", 'label': 'Azote'},
    {'valeur': "suivi_phychi_mes", 'label': 'Matière en suspens'},
    {'valeur': "suivi_phychi_oxyd", 'label': 'O2 dissous'},
    {'valeur': "suivi_phychi_carb", 'label': 'Carbone'},
    {'valeur': "suivi_phychi_autr", 'label': 'Autre'},
    {'valeur': 'aucun', 'label': 'Aucun suivi physico-chimique'}
  ]
  suivis_phychi_selected = this.suivis_phychi

  actions = [
    {'valeur':"action_scie", 'label': 'Scientifique'},
    {'valeur':"action_arche", 'label': 'Archéologique '},
    {'valeur':"action_educ", 'label': 'Education / sensibilisation'},
    {'valeur':"action_amen", 'label': 'Aménagement touristique'},
    {'valeur': 'aucun', 'label': 'Aucune action'}
  ]

  actions_selected = this.actions

  // listes d'item pour les tourbières 

  activite_t = [
    {'valeur':"Non",'label':'Non'},
    {'valeur':"Oui",'label':'Oui'},
    {'valeur':"Nsp",'label':'Ne sait pas'}
  ]

  activite_t_selected = this.activite_t

  genese_t = [
    {'valeur':"origi_lim", 'label': 'Limnogène'},
    {'valeur':"origi_flu", 'label': 'Fluviogène '},
    {'valeur':"origi_omb", 'label': 'Ombrogène '},
    {'valeur':"origi_top", 'label': 'Topogène '},
    {'valeur':"origi_sol", 'label': 'Soligène '},
    {'valeur':"origi_nsp", 'label': 'Inconnue '}
  ]

  genese_t_selected = this.genese_t

  type_t = [
    {'valeur':"type_hau", 'label': 'Tourbière haute'},
    {'valeur':"type_bas", 'label': 'Tourbière basse'},
    {'valeur':"type_tra", 'label': 'Tourbière de transition'},
    {'valeur':"type_autr", 'label': 'Autre'}
  ]

  type_t_selected = this.type_t


  ngOnInit(): void {
    this.dataService.allReserves().subscribe(
        contenu => {
          this.reserves = contenu; 
          this.rns_filtered = this.reserves;
          console.log(this.reserves);
          this.reserves_nom_selected = this.reserves;
          

          this.dataSource.data = this.rns_filtered;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.reserves.forEach(element => {
            let temp = {
              'Identifiant RNF' : element.id_local,
              'Identifiant INPN' : element.id_inpn,
              'Nom de la réserve' : element.type_rn + ' ' + element.jonction_nom + element.nom_site,
              'Nom du contact' : element.contact.contact_prenom + ' ' + element.contact.contact_nom,
              'Fonction' : element.contact.contact_emploi,
              'Mail' : element.contact.contact_mail
            };
            this.rns_export.push(temp);
          });

          this.query_nb_tourb_max = Math.max.apply(Math, this.reserves.map(a => a.tourbieres.length));
          this.query_sup_tourb_max= Math.max.apply(Math, this.reserves.map(a => a.tourbieres.map(b => Number(b.superficie)))[0]);

          this.filtreslisteReserves = [
            {'label': 'Nom de la réserve', 'valeur' : 'nom_res'},
            {'label': 'Nombre de tourbières','valeur': 'nb_tourb'}, 
            {'label': 'Mode de détermination','valeur': 'mode_deter'},
            {'label': this.enjeux_st.label,'valeur': 'enjeux_st'},
            {'label': 'Suivis biologiques', 'valeur': 'suivis_biol'},
            {'label': 'Suivis hydrologiques', 'valeur':'suivis_hydro'},
            {'label': 'Suivis climatique', 'valeur':'suivis_climat'},
            {'label': 'Suivis physico-chimiques', 'valeur':'suivis_phychi'},
            {'label': 'Actions sur les tourbières', 'valeur':'actions'}
          ]
          this.filtreslisteTourbieres = [
            {'label': 'Superficie d\'une tourbière', 'valeur': 'sup_tourb'},
            {'label': 'Activité de la tourbière', 'valeur': 'activite_t'},
            {'label': 'Genèse de la tourbière', 'valeur': 'genese_t'},
            {'label': this.source_eau.label, 'valeur': 'source_eau'},
            {'label': this.niveau_trophique.label, 'valeur': 'niveau_trophique'},
            {'label': this.ph.label, 'valeur': 'ph'},
            {'label': 'Type de tourbière', 'valeur' : 'type_t'},
            {'label': 'Pressions actuelles', 'valeur':'pressions'},
            {'label': 'Evolution des pressions', 'valeur':'pressions_evol'},
            {'label': 'Etat de conservation biologique', 'valeur':'conservation_biologique'},
            {'label': 'Etat de conservation fonctionnel', 'valeur':'conservation_fonctionnel'}
          ]
          this.loadreserves = false;
    }
    )
    this.getNomenclatures();
    
  }

  getNomenclatures() {
    this.dataService.nomenclatureByMnemo('enjeux_st').subscribe(
      contenu => {
        this.enjeux_st = contenu;
        this.enjeux_st_selected = this.enjeux_st.items;     
        console.log();
           
      }
    )
    this.dataService.nomenclatureByMnemo('fonc_source_eau').subscribe(
      contenu => {
        this.source_eau = contenu;
        this.source_eau_selected = this.source_eau.items;
      }
    )
    this.dataService.nomenclatureByMnemo('niveau_trophique').subscribe(
      contenu => {
        this.niveau_trophique = contenu;
        this.niveau_trophique_selected = this.niveau_trophique.items;
      }
    )
    this.dataService.nomenclatureByMnemo('ph').subscribe(
      contenu => {
        this.ph = contenu;
        this.ph_selected = this.ph.items;
      }
    )
    this.dataService.nomenclatureByMnemo('pression_present').subscribe(
      contenu => {
        this.pressions = contenu;
        this.tourisme = this.pressions.items;
        this.incendie = this.pressions.items;
        this.dereglement_hydrique = this.pressions.items;
        this.sylviculture = this.pressions.items;
        this.surenrichissement = this.pressions.items;
        this.pollution = this.pressions.items;
        this.pastoralisme = this.pressions.items;
        this.perturbation_climatique = this.pressions.items;
      }
    )
    this.dataService.nomenclatureByMnemo('evolution_pression').subscribe(
      contenu => {
        this.pressions_evol = contenu;
        this.tourisme_evol = this.pressions_evol.items;
        this.incendie_evol = this.pressions_evol.items;
        this.dereglement_hydrique_evol = this.pressions_evol.items;
        this.sylviculture_evol = this.pressions_evol.items;
        this.surenrichissement_evol = this.pressions_evol.items;
        this.pollution_evol = this.pressions_evol.items;
        this.pastoralisme_evol = this.pressions_evol.items;
        this.perturbation_climatique_evol = this.pressions_evol.items;
      }
    )
    this.dataService.nomenclatureByMnemo('etat_conservation_present').subscribe(
      contenu => {
        this.etat_conservation = contenu;
        this.etat_cons_biol = this.etat_conservation.items;
        this.etat_cons_fonc = this.etat_conservation.items;
      }
    )
    this.dataService.nomenclatureByMnemo('evol_etat_conservation').subscribe(
      contenu => {
        this.etat_conservation_evol = contenu;
        this.etat_cons_biol_evol = this.etat_conservation_evol.items;
        this.etat_cons_fonc_evol = this.etat_conservation_evol.items;
      }
    )
  }

  filterReserve() {
    let enjeux_st_filter = this.enjeux_st_selected.map(item => { return item.id_nomenclature; });
    let mode_determination_filter = this.mode_determination_selected.map(item => {return item.valeur});
    let suivis_biologiques_filter = this.suivis_biologiques_selected.map(item => {return item.valeur});
    let suivis_hydro_filter = this.suivis_hydro_selected.map(item => {return item.valeur});
    let suivis_climat_filter = this.suivis_climat_selected.map(item => {return item.valeur});
    let suivis_phychi_filter = this.suivis_phychi_selected.map(item => {return item.valeur});
    let actions_filter = this.actions_selected.map(item => {return item.valeur});
    let activite_t_filter = this.activite_t_selected.map(item => {return item.valeur});
    let genese_t_filter = this.genese_t_selected.map(item => {return item.valeur});
    let source_eau_filter = this.source_eau_selected.map(item => {return item.id_nomenclature});
    let niveau_trophique_filter = this.niveau_trophique_selected.map(item => {return item.id_nomenclature});
    let ph_filter = this.ph_selected.map(item => {return item.id_nomenclature});
    let type_t_filter = this.type_t_selected.map(item => {return item.valeur});
    let tourisme_filter = this.tourisme.map(item => {return item.id_nomenclature});
    let incendie_filter = this.incendie.map(item => {return item.id_nomenclature});
    let dereglement_hydrique_filter = this.dereglement_hydrique.map(item => {return item.id_nomenclature});
    let sylviculture_filter = this.sylviculture.map(item => {return item.id_nomenclature});
    let surenrichissement_filter = this.surenrichissement.map(item => {return item.id_nomenclature});
    let pollution_filter = this.pollution.map(item => {return item.id_nomenclature});
    let pastoralisme_filter = this.pastoralisme.map(item => {return item.id_nomenclature});
    let perturbation_climatique_filter = this.perturbation_climatique.map(item => {return item.id_nomenclature});
    let tourisme_evol_filter = this.tourisme_evol.map(item => {return item.id_nomenclature});
    let incendie_evol_filter = this.incendie_evol.map(item => {return item.id_nomenclature});
    let dereglement_hydrique_evol_filter = this.dereglement_hydrique_evol.map(item => {return item.id_nomenclature});
    let sylviculture_evol_filter = this.sylviculture_evol.map(item => {return item.id_nomenclature});
    let surenrichissement_evol_filter = this.surenrichissement_evol.map(item => {return item.id_nomenclature});
    let pollution_evol_filter = this.pollution_evol.map(item => {return item.id_nomenclature});
    let pastoralisme_evol_filter = this.pastoralisme_evol.map(item => {return item.id_nomenclature});
    let perturbation_climatique_evol_filter = this.perturbation_climatique_evol.map(item => {return item.id_nomenclature});
    let etat_cons_biol_filter = this.etat_cons_biol.map(item => {return item.id_nomenclature});
    let etat_cons_fonc_filter = this.etat_cons_fonc.map(item => {return item.id_nomenclature});
    let etat_cons_biol_evol_filter = this.etat_cons_biol_evol.map(item => {return item.id_nomenclature});
    let etat_cons_fonc_evol_filter = this.etat_cons_fonc_evol.map(item => {return item.id_nomenclature});
    let reserves_nom_filter = this.reserves_nom_selected.map(item => {return item.id_local});


    let args = {
      "query_enjeux_st" : enjeux_st_filter,
      "query_nb_tourb_max" : this.query_nb_tourb_max,
      "query_nb_tourb_min" : this.query_nb_tourb_min,
      "query_mode_determination" : mode_determination_filter,
      "query_suivis_biologiques" : suivis_biologiques_filter,
      "query_sup_tourb_min" : this.query_sup_tourb_min,
      "query_sup_tourb_max" : this.query_sup_tourb_max,
      "query_suivis_hydro" : suivis_hydro_filter,
      "query_suivis_climat" : suivis_climat_filter,
      "query_suivis_phychi" : suivis_phychi_filter,
      "query_actions" : actions_filter,
      "query_activite_t" : activite_t_filter,
      "query_genese_t" : genese_t_filter,
      "query_source_eau" : source_eau_filter,
      "query_niveau_trophique" : niveau_trophique_filter,
      "query_ph" : ph_filter,
      "query_type_t" : type_t_filter,
      "query_tourisme" : tourisme_filter,
      "query_incendie" : incendie_filter,
      "query_dereglement_hydrique" : dereglement_hydrique_filter,
      "query_sylviculture" : sylviculture_filter,
      "query_surenrichissement" : surenrichissement_filter,
      "query_pollution" : pollution_filter,
      "query_pastoralisme" : pastoralisme_filter,
      "query_perturbation_climatique" : perturbation_climatique_filter,
      "query_tourisme_evol" : tourisme_evol_filter,
      "query_incendie_evol" : incendie_evol_filter,
      "query_dereglement_hydrique_evol" : dereglement_hydrique_evol_filter,
      "query_sylviculture_evol" : sylviculture_evol_filter,
      "query_surenrichissement_evol" : surenrichissement_evol_filter,
      "query_pollution_evol" : pollution_evol_filter,
      "query_pastoralisme_evol" : pastoralisme_evol_filter,
      "query_perturbation_climatique_evol" : perturbation_climatique_evol_filter,
      "query_etat_cons_biol" : etat_cons_biol_filter,
      "query_etat_cons_fonc" : etat_cons_fonc_filter,
      "query_etat_cons_biol_evol" : etat_cons_biol_evol_filter,
      "query_etat_cons_fonc_evol" : etat_cons_fonc_evol_filter,
      "query_reserve_nom" : reserves_nom_filter
    }
    
    this.rns_filtered = this.filtreReservesPipe.transform(this.reserves,args)
    this.dataSource.data = this.rns_filtered;
  }

  filterShow() {
    let filtreliste = this.filtreslisteReserves_selected.map(item =>{ return item.valeur});
    let filtrelisteTourbiere = this.filtreslisteTourbieres_selected.map(item => { return item.valeur})

    if (filtreliste.includes('nom_res')) {
      this.showNomReserve = true
    } else {
      this.showNomReserve = false
    }
    if (filtreliste.includes('nb_tourb')) {
      this.showNbtourbieres = true
    } else {
      this.showNbtourbieres = false
    }
    if (filtreliste.includes('mode_deter')) {
      this.showModeDetermination = true
    } else {
      this.showModeDetermination = false
    }
    if (filtreliste.includes('enjeux_st')) {
      this.showenjeux_st = true
    } else {
      this.showenjeux_st = false
    }
    if (filtreliste.includes('suivis_biol')) {
      this.showSuivisBiologiques = true
    } else {
      this.showSuivisBiologiques = false
    }
    if (filtreliste.includes('suivis_hydro')) {
      this.showSuivisHydro = true
    } else {
      this.showSuivisHydro = false
    }
    if (filtreliste.includes('suivis_climat')) {
      this.showSuivisClimat = true
    } else {
      this.showSuivisClimat = false
    }
    if (filtreliste.includes('suivis_phychi')) {
      this.showSuivisPhychi = true
    } else {
      this.showSuivisPhychi = false
    }
    if (filtreliste.includes('actions')) {
      this.showActions = true
    } else {
      this.showActions = false
    }



    if (filtrelisteTourbiere.includes('sup_tourb')){
      this.showSuptourbieres = true
    } else {
      this.showSuptourbieres = false
    }
    if (filtrelisteTourbiere.includes('activite_t')){
      this.showActiviteT = true
    } else {
      this.showActiviteT = false
    }
    if (filtrelisteTourbiere.includes('genese_t')){
      this.showGeneseT = true
    } else {
      this.showGeneseT = false
    }
    if (filtrelisteTourbiere.includes('source_eau')){
      this.showSourceEau = true
    } else {
      this.showSourceEau = false
    }
    if (filtrelisteTourbiere.includes('niveau_trophique')){
      this.showNiveauTrophique = true
    } else {
      this.showNiveauTrophique = false
    }
    if (filtrelisteTourbiere.includes('ph')){
      this.showPh = true
    } else {
      this.showPh = false
    }
    if (filtrelisteTourbiere.includes('type_t')){
      this.showTypeT = true
    } else {
      this.showTypeT = false
    }
    if (filtrelisteTourbiere.includes('pressions')){
      this.showPressions = true
    } else {
      this.showPressions = false
    }
    if (filtrelisteTourbiere.includes('pressions_evol')){
      this.showPressionsEvol = true
    } else {
      this.showPressionsEvol = false
    }
    if (filtrelisteTourbiere.includes('conservation_biologique')){
      this.showConservationBiologique = true
    } else {
      this.showConservationBiologique = false
    }
    if (filtrelisteTourbiere.includes('conservation_fonctionnel')){
      this.showConservationFonctionnel = true
    } else {
      this.showConservationFonctionnel = false
    }
    

    
  }

  exportAsXlsx():void {
    this.excelService.exportAsExcelFile(this.rns_export, 'rn_tourbeuses');
  }

}
