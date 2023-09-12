import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtreReserves'
})
export class FiltreReservesPipe implements PipeTransform {

  transform(value: any, args?: any, filtres_reserves?:any, filtres_tourbieres?:any): any {
    if (!value) return null;
    if (!args) return value;

    console.log(filtres_tourbieres);
    

    //pour chaque filtre on check d'abord s'il est utilisé, et on ne filtre la donnée que si c'est le cas (un filtre affiché avec tout de cocher enclenche le filter malgrès tout)
    //filtre sur les réserves

    let data = value.filter(reserve => (
      (filtres_reserves.includes('nom_res') ? args.query_reserve_nom.includes(reserve.id_local) : true) &&
      (filtres_reserves.includes('enjeux_st') ? 
      args.query_enjeux_st.includes(reserve.enjx_st) || 
      (args.query_enjeux_st.includes('null') && reserve.enjx_st == null)
      : true) &&
      (filtres_reserves.includes('nb_tourb') ? reserve.tourbieres.length >= args.query_nb_tourb_min && reserve.tourbieres.length <= args.query_nb_tourb_max : true)
    ))

    if (filtres_reserves.includes('mode_deter')) {
      data = determination(args, data)
    }
    if (filtres_reserves.includes('suivis_biol')) {
      data = suivis_biologiques(args, data)
    }
    if (filtres_reserves.includes('suivis_hydro')) {
      data = suivis_hydro(args, data)
    }
    if (filtres_reserves.includes('suivis_climat')) {
      data = suivis_climat(args, data)
    }
    if (filtres_reserves.includes('suivis_phychi')) {
      data = suivis_phychi(args, data)
    }
    if (filtres_reserves.includes('actions')) {
      data = actions(args, data)
    }


    //filtre sur les tourbières

    if (filtres_tourbieres.includes('sup_tourb')) {
    data = data.filter(reserve => {
      let a = false;

      for (var tourb of reserve.tourbieres) {
        if (tourb.superficie >= args.query_sup_tourb_min &&
          tourb.superficie <= args.query_sup_tourb_max) {
          a = true;
          break;
        }
      }
      return a;
    })
  }
  if (filtres_tourbieres.includes('activite_t')) {
    data = data.filter(reserve => {
      let a = false;

      for (var tourb of reserve.tourbieres) {
        if (args.query_activite_t.includes(tourb.activ)) {
          a = true;
          break;
        }
      }
      return a;
    })
  }

  if (filtres_tourbieres.includes('source_eau')) {
    data = data.filter(reserve => {
      let a = false;
      for (var tourb of reserve.tourbieres) {
        if (args.query_source_eau.includes(tourb.fonctionnement.foncti_sourc_eau)) {
          a = true;
          break;
        }
      }
      return a;
    })
  }
  if (filtres_tourbieres.includes('niveau_trophique')) {
    data = data.filter(reserve => {
      let a = false;
      for (var tourb of reserve.tourbieres) {
        if (args.query_niveau_trophique.includes(tourb.fonctionnement.foncti_nv_troph)) {
          a = true;
          break;
        }
      }
      return a;
    })
  }

    if (filtres_tourbieres.includes('ph')) {
    data = data.filter(reserve => {
      let a = false;
      for (var tourb of reserve.tourbieres) {
        if (args.query_ph.includes(tourb.fonctionnement.foncti_ph_maj)) {
          a = true;
          break;
        }
      }
      return a;
    })
  }

    if (filtres_tourbieres.includes('pressions')) {
    data = pressions(args, data)
    }
    if (filtres_tourbieres.includes('pressions_evol')) {
    data = pressions_evol(args,data)
    }
    if (filtres_tourbieres.includes('conservation_biologique')) {
    data = conservation_biologique(args,data)
    }
    if (filtres_tourbieres.includes('conservation_fonctionnel')) {
      data = conservation_fonctionnel(args,data)
      }
    if (filtres_tourbieres.includes('genese_t')) {
    data = genese(args,data)
    }
    if (filtres_tourbieres.includes('type_t')) {
    data = typet(args,data)
    }
    
    return data
  }

}

function determination(args, data) {
  data = data.filter(reserve => (
    (args.query_mode_determination.includes('carbone') && reserve.determinations.determ_carb_t == true) ||
    (args.query_mode_determination.includes('autre') && reserve.determinations.determ_autr_t == true) ||
    (args.query_mode_determination.includes('flore') && reserve.determinations.determ_flor_t == true) ||
    (args.query_mode_determination.includes('profondeur') && reserve.determinations.determ_prof_t == true) ||
    (args.query_mode_determination.includes('aucun') && reserve.determinations.determ_carb_t == false 
      && reserve.determinations.determ_autr_t == false 
      && reserve.determinations.determ_flor_t == false
      && reserve.determinations.determ_prof_t == false) ||
      (args.query_mode_determination.includes('null') && reserve.determinations.determ_carb_t == null
      && reserve.determinations.determ_autr_t == null 
      && reserve.determinations.determ_flor_t == null
      && reserve.determinations.determ_prof_t == null)
  ))
  return data;
}

function suivis_biologiques(args, data) {
  data = data.filter(reserve => (

    (args.query_suivis_biologiques.includes('suivi_bio_hab') && reserve.suivis.suivi_bio_hab == 6) ||
    (args.query_suivis_biologiques.includes('suivi_bio_ois') && reserve.suivis.suivi_bio_mam == 6) ||
    (args.query_suivis_biologiques.includes('suivi_bio_mam') && reserve.suivis.suivi_bio_ois == 6) ||
    (args.query_suivis_biologiques.includes('suivi_bio_batr') && reserve.suivis.suivi_bio_batr == 6) ||
    (args.query_suivis_biologiques.includes('suivi_bio_rep') && reserve.suivis.suivi_bio_rep == 6) ||
    (args.query_suivis_biologiques.includes('suivi_bio_veg') && reserve.suivis.suivi_bio_veg == 6) ||
    (args.query_suivis_biologiques.includes('suivi_bio_artt') && reserve.suivis.suivi_bio_artt == 6) ||
    (args.query_suivis_biologiques.includes('suivi_bio_arta') && reserve.suivis.suivi_bio_arta == 6) ||
    (args.query_suivis_biologiques.includes('suivi_bio_fun') && reserve.suivis.suivi_bio_fun == 6) ||
    (args.query_suivis_biologiques.includes('suivi_bio_lic') && reserve.suivis.suivi_bio_lic == 6) ||
    (args.query_suivis_biologiques.includes('suivi_bio_bry') && reserve.suivis.suivi_bio_bry == 6) ||
    (args.query_suivis_biologiques.includes('suivi_bio_alg') && reserve.suivis.suivi_bio_alg == 6) ||
    (args.query_suivis_biologiques.includes('suivi_bio_adn') && reserve.suivis.suivi_bio_adn == 6) ||
    (args.query_suivis_biologiques.includes('suivi_bio_pat') && reserve.suivis.suivi_bio_pat == 6) ||
    (args.query_suivis_biologiques.includes('aucun') && reserve.suivis.suivi_bio_hab != 6
      && reserve.suivis.suivi_bio_mam != 6
      && reserve.suivis.suivi_bio_ois != 6
      && reserve.suivis.suivi_bio_batr != 6
      && reserve.suivis.suivi_bio_rep != 6
      && reserve.suivis.suivi_bio_veg != 6
      && reserve.suivis.suivi_bio_artt != 6
      && reserve.suivis.suivi_bio_arta != 6
      && reserve.suivis.suivi_bio_fun != 6
      && reserve.suivis.suivi_bio_lic != 6
      && reserve.suivis.suivi_bio_bry != 6
      && reserve.suivis.suivi_bio_alg != 6
      && reserve.suivis.suivi_bio_adn != 6
      && reserve.suivis.suivi_bio_pat != 6) ||
    (args.query_suivis_biologiques.includes('null') && reserve.suivis.suivi_bio_hab == null
      && reserve.suivis.suivi_bio_mam == null
      && reserve.suivis.suivi_bio_ois == null
      && reserve.suivis.suivi_bio_batr == null
      && reserve.suivis.suivi_bio_rep == null
      && reserve.suivis.suivi_bio_veg == null
      && reserve.suivis.suivi_bio_artt == null
      && reserve.suivis.suivi_bio_arta == null
      && reserve.suivis.suivi_bio_fun == null
      && reserve.suivis.suivi_bio_lic == null
      && reserve.suivis.suivi_bio_bry == null
      && reserve.suivis.suivi_bio_alg == null
      && reserve.suivis.suivi_bio_adn == null
      && reserve.suivis.suivi_bio_pat == null) 
  ))
  return data
}

function suivis_hydro(args, data) {
  data = data.filter(reserve => (
    (args.query_suivis_hydro.includes('suivi_hydro_qual') && reserve.suivis.suivi_hydro_qual == 6) ||
    (args.query_suivis_hydro.includes('suivi_hydro_haut') && reserve.suivis.suivi_hydro_haut == 6) ||
    (args.query_suivis_hydro.includes('suivi_hydro_geol') && reserve.suivis.suivi_hydro_geol == 6) ||
    (args.query_suivis_hydro.includes('aucun')
      && reserve.suivis.suivi_hydro_geol != 6
      && reserve.suivis.suivi_hydro_qual != 6
      && reserve.suivis.suivi_hydro_haut != 6) ||
    (args.query_suivis_hydro.includes('null')
      && reserve.suivis.suivi_hydro_geol == null
      && reserve.suivis.suivi_hydro_qual == null
      && reserve.suivis.suivi_hydro_haut == null) 
  ))
  return data
}

function suivis_climat(args, data) {
  data = data.filter(reserve => (
    (args.query_suivis_climat.includes('suivi_clim_pluv') && reserve.suivis.suivi_clim_pluv == 6) ||
    (args.query_suivis_climat.includes('suivi_clim_tair') && reserve.suivis.suivi_clim_tair == 6) ||
    (args.query_suivis_climat.includes('suivi_clim_teau') && reserve.suivis.suivi_clim_teau == 6) ||
    (args.query_suivis_climat.includes('suivi_clim_rayo') && reserve.suivis.suivi_clim_rayo == 6) ||
    (args.query_suivis_climat.includes('suivi_clim_vent') && reserve.suivis.suivi_clim_vent == 6) ||
    (args.query_suivis_climat.includes('aucun') && reserve.suivis.suivi_clim_pluv != 6
      && reserve.suivis.suivi_clim_tair != 6
      && reserve.suivis.suivi_clim_teau != 6
      && reserve.suivis.suivi_clim_rayo != 6
      && reserve.suivis.suivi_clim_vent != 6) ||
    (args.query_suivis_climat.includes('null') 
      && reserve.suivis.suivi_clim_pluv == null
      && reserve.suivis.suivi_clim_tair == null
      && reserve.suivis.suivi_clim_teau == null
      && reserve.suivis.suivi_clim_rayo == null
      && reserve.suivis.suivi_clim_vent == null)
  ))
  return data
}

function suivis_phychi(args, data) {
  data = data.filter(reserve => (
    (args.query_suivis_phychi.includes('suivi_phychi_phos') && reserve.suivis.suivi_phychi_phos == 6) ||
    (args.query_suivis_phychi.includes('suivi_phychi_ph') && reserve.suivis.suivi_phychi_ph == 6) ||
    (args.query_suivis_phychi.includes('suivi_phychi_turb') && reserve.suivis.suivi_phychi_turb == 6) ||
    (args.query_suivis_phychi.includes('suivi_phychi_cond') && reserve.suivis.suivi_phychi_cond == 6) ||
    (args.query_suivis_phychi.includes('suivi_phychi_azot') && reserve.suivis.suivi_phychi_azot == 6) ||
    (args.query_suivis_phychi.includes('suivi_phychi_mes') && reserve.suivis.suivi_phychi_mes == 6) ||
    (args.query_suivis_phychi.includes('suivi_phychi_oxyd') && reserve.suivis.suivi_phychi_oxyd == 6) ||
    (args.query_suivis_phychi.includes('suivi_phychi_carb') && reserve.suivis.suivi_phychi_carb == 6) ||
    (args.query_suivis_phychi.includes('suivi_phychi_autr') && reserve.suivis.suivi_phychi_autr == 6) ||
    (args.query_suivis_phychi.includes('aucun') && reserve.suivis.suivi_phychi_phos != 6
      && reserve.suivis.suivi_phychi_ph != 6
      && reserve.suivis.suivi_phychi_turb != 6
      && reserve.suivis.suivi_phychi_cond != 6
      && reserve.suivis.suivi_phychi_azot != 6
      && reserve.suivis.suivi_phychi_mes != 6
      && reserve.suivis.suivi_phychi_oxyd != 6
      && reserve.suivis.suivi_phychi_carb != 6
      && reserve.suivis.suivi_phychi_autr != 6) ||
    (args.query_suivis_phychi.includes('null') 
    && reserve.suivis.suivi_phychi_phos == null
      && reserve.suivis.suivi_phychi_ph == null
      && reserve.suivis.suivi_phychi_turb == null
      && reserve.suivis.suivi_phychi_cond == null
      && reserve.suivis.suivi_phychi_azot == null
      && reserve.suivis.suivi_phychi_mes == null
      && reserve.suivis.suivi_phychi_oxyd == null
      && reserve.suivis.suivi_phychi_carb == null
      && reserve.suivis.suivi_phychi_autr == null)
  ))
  return data
}

function actions(args, data) {
  data = data.filter(reserve => (
    (args.query_actions.includes('action_scie') && reserve.actions.action_scie == true) ||
    (args.query_actions.includes('action_arche') && reserve.actions.action_arche == true) ||
    (args.query_actions.includes('action_educ') && reserve.actions.action_educ == true) ||
    (args.query_actions.includes('action_amen') && reserve.actions.action_amen == true) ||
    (args.query_actions.includes('aucun') && reserve.actions.action_scie != true
      && reserve.actions.action_arche != true
      && reserve.actions.action_educ != true
      && reserve.actions.action_amen != true) ||
    (args.query_actions.includes('null') 
    && reserve.actions.action_scie == null
      && reserve.actions.action_arche == null
      && reserve.actions.action_educ == null
      && reserve.actions.action_amen == null)
  ))
  return data
}

function pressions(args, data) {
  data = data.filter(reserve => {
    let a = false;
    for (var tourb of reserve.tourbieres) {      
      if (args.query_tourisme.includes(tourb.pression.pres_tourism_now)) {
        a = true;
        break;
      }
    }
    return a;
  })
  data = data.filter(reserve => {
    let a = false;
    for (var tourb of reserve.tourbieres) {      
      if (args.query_incendie.includes(tourb.pression.pres_incend_now)) {
        a = true;
        break;
      }
    }
    return a;
  })
  data = data.filter(reserve => {
    let a = false;
    for (var tourb of reserve.tourbieres) {      
      if (args.query_dereglement_hydrique.includes(tourb.pression.pres_derhyd_now)) {
        a = true;
        break;
      }
    }
    return a;
  })
  data = data.filter(reserve => {
    let a = false;
    for (var tourb of reserve.tourbieres) {      
      if (args.query_sylviculture.includes(tourb.pression.pres_sylvic_now)) {
        a = true;
        break;
      }
    }
    return a;
  })
  data = data.filter(reserve => {
    let a = false;
    for (var tourb of reserve.tourbieres) {      
      if (args.query_surenrichissement.includes(tourb.pression.pres_enrich_now)) {
        a = true;
        break;
      }
    }
    return a;
  })
  data = data.filter(reserve => {
    let a = false;
    for (var tourb of reserve.tourbieres) {      
      if (args.query_pollution.includes(tourb.pression.pres_polchim_now)) {
        a = true;
        break;
      }
    }
    return a;
  })
  data = data.filter(reserve => {
    let a = false;
    for (var tourb of reserve.tourbieres) {      
      if (args.query_pastoralisme.includes(tourb.pression.pres_patur_now)) {
        a = true;
        break;
      }
    }
    return a;
  })
  data = data.filter(reserve => {
    let a = false;
    for (var tourb of reserve.tourbieres) {      
      if (args.query_perturbation_climatique.includes(tourb.pression.pres_pertclim_now)) {
        a = true;
        break;
      }
    }
    return a;
  })
  return data
}

function pressions_evol(args, data) {
  data = data.filter(reserve => {
    let a = false;
    for (var tourb of reserve.tourbieres) {      
      if (args.query_tourisme_evol.includes(tourb.pression.pres_tourism_evol)) {
        a = true;
        break;
      }
    }
    return a;
  })
  data = data.filter(reserve => {
    let a = false;
    for (var tourb of reserve.tourbieres) {      
      if (args.query_incendie_evol.includes(tourb.pression.pres_incend_evol)) {
        a = true;
        break;
      }
    }
    return a;
  })
  data = data.filter(reserve => {
    let a = false;
    for (var tourb of reserve.tourbieres) {      
      if (args.query_dereglement_hydrique_evol.includes(tourb.pression.pres_derhyd_evol)) {
        a = true;
        break;
      }
    }
    return a;
  })
  data = data.filter(reserve => {
    let a = false;
    for (var tourb of reserve.tourbieres) {      
      if (args.query_sylviculture_evol.includes(tourb.pression.pres_sylvic_evol)) {
        a = true;
        break;
      }
    }
    return a;
  })
  data = data.filter(reserve => {
    let a = false;
    for (var tourb of reserve.tourbieres) {      
      if (args.query_surenrichissement_evol.includes(tourb.pression.pres_enrich_evol)) {
        a = true;
        break;
      }
    }
    return a;
  })
  data = data.filter(reserve => {
    let a = false;
    for (var tourb of reserve.tourbieres) {      
      if (args.query_pollution_evol.includes(tourb.pression.pres_polchim_evol)) {
        a = true;
        break;
      }
    }
    return a;
  })
  data = data.filter(reserve => {
    let a = false;
    for (var tourb of reserve.tourbieres) {      
      if (args.query_pastoralisme_evol.includes(tourb.pression.pres_patur_evol)) {
        a = true;
        break;
      }
    }
    return a;
  })
  data = data.filter(reserve => {
    let a = false;
    for (var tourb of reserve.tourbieres) {      
      if (args.query_perturbation_climatique_evol.includes(tourb.pression.pres_pertclim_evol)) {
        a = true;
        break;
      }
    }
    return a;
  })
  return data
}

function conservation_biologique(args, data) {
  data = data.filter(reserve => {
    let a = false;
    for (var tourb of reserve.tourbieres) {            
      if (args.query_etat_cons_biol.includes(tourb.etat_conservation.etcons_biodi_actu)) {
        a = true;
        break;
      }
    }
    return a;
  })
  data = data.filter(reserve => {
    let a = false;
    for (var tourb of reserve.tourbieres) {      
      if (args.query_etat_cons_biol_evol.includes(tourb.etat_conservation.etcons_biodi_tend)) {
        a = true;
        break;
      }
    }
    return a;
  })
}
function conservation_fonctionnel(args, data) {

  data = data.filter(reserve => {
    let a = false;
    for (var tourb of reserve.tourbieres) {      
      if (args.query_etat_cons_fonc.includes(tourb.etat_conservation.etcons_fonct_actu)) {
        a = true;
        break;
      }
    }
    return a;
  })
  data = data.filter(reserve => {
    let a = false;
    for (var tourb of reserve.tourbieres) {      
      if (args.query_etat_cons_fonc_evol.includes(tourb.etat_conservation.etcons_fonct_tend)) {
        a = true;
        break;
      }
    }
    return a;
  })
  return data
}

function genese(args, data) {
  
data = data.filter(reserve => {
  let a = false;
  for (var tourb of reserve.tourbieres) {      
    if (
      (args.query_genese_t.includes('origi_lim') && tourb.origine.origi_lim == true) ||
      (args.query_genese_t.includes('origi_flu') && tourb.origine.origi_flu == true) ||
      (args.query_genese_t.includes('origi_omb') && tourb.origine.origi_omb == true) ||
      (args.query_genese_t.includes('origi_top') && tourb.origine.origi_top == true) ||
      (args.query_genese_t.includes('origi_sol') && tourb.origine.origi_sol == true) ||
      (args.query_genese_t.includes('origi_nsp') && tourb.origine.origi_nsp == true)
    ) {
      a = true;
      break;
    }
  }
  return a;
})
return data
}

function typet(args, data) {
  
  data = data.filter(reserve => {
    let a = false;
    for (var tourb of reserve.tourbieres) {      
      if (
        (args.query_type_t.includes('type_hau') && tourb.type.type_hau == true) ||
        (args.query_type_t.includes('type_bas') && tourb.type.type_bas == true) ||
        (args.query_type_t.includes('type_tra') && tourb.type.type_tra == true) ||
        (args.query_type_t.includes('type_autr') && tourb.type.type_autr != null)
      ) {
        a = true;
        break;
      }
    }
    return a;
  })
  return data
  }