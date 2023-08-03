import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtreReserves'
})
export class FiltreReservesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return null;
    if (!args) return value;

    //filtre sur les réserves

    let data = value.filter(reserve => (
      args.query_enjeux_st.includes(reserve.enjx_st) &&
      reserve.tourbieres.length >= args.query_nb_tourb_min &&
      reserve.tourbieres.length <= args.query_nb_tourb_max
    ))

    data = determination(args, data)
    data = suivis_biologiques(args, data)
    data = suivis_hydro(args, data)
    data = suivis_climat(args, data)
    data = suivis_phychi(args, data)
    data = actions(args, data)


    //filtre sur les tourbières

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

    data = pressions(args, data)
    data = pressions_evol(args,data)
    data = etat(args,data)

    return data
  }

}

function determination(args, data) {
  data = data.filter(reserve => (
    (args.query_mode_determination.includes('carbone') && reserve.determinations.determ_carb_t == true) ||
    (args.query_mode_determination.includes('autre') && reserve.determinations.determ_autr_t == true) ||
    (args.query_mode_determination.includes('flore') && reserve.determinations.determ_flor_t == true) ||
    (args.query_mode_determination.includes('prof') && reserve.determinations.determ_prof_t == true)
  ))
  // if (!args.query_mode_determination.includes('carbone')) {
  //   data = data.filter(reserve => (
  //     reserve.determinations.determ_carb_t == false && 
  //     (reserve.determinations.determ_prof_t == true ||
  //     reserve.determinations.determ_autr_t == true ||
  //     reserve.determinations.determ_flor_t == true)
  //  ))
  // }
  //  if (!args.query_mode_determination.includes('autre')) {
  //   data = data.filter(reserve => (
  //     reserve.determinations.determ_autr_t == false && 
  //     (reserve.determinations.determ_prof_t == true ||
  //     reserve.determinations.determ_carb_t == true ||
  //     reserve.determinations.determ_flor_t == true)
  //  ))
  // }
  //  if (!args.query_mode_determination.includes('flore')) {
  //   data = data.filter(reserve => (
  //     reserve.determinations.determ_flor_t == false && 
  //     (reserve.determinations.determ_prof_t == true ||
  //     reserve.determinations.determ_carb_t == true ||
  //     reserve.determinations.determ_autr_t == true)
  //  ))
  // }
  // if (!args.query_mode_determination.includes('prof')) {
  //   data = data.filter(reserve => (
  //     reserve.determinations.determ_prof_t == false && 
  //     (reserve.determinations.determ_flor_t == true ||
  //     reserve.determinations.determ_carb_t == true ||
  //     reserve.determinations.determ_autr_t == true)
  //  ))
  // }
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
      && reserve.suivis.suivi_bio_pat != 6)
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
      && reserve.suivis.suivi_hydro_haut != 6)
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
      && reserve.suivis.suivi_clim_vent != 6)
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
      && reserve.suivis.suivi_phychi_autr != 6)
  ))
  return data
}

function actions(args, data) {
  data = data.filter(reserve => (
    (args.query_actions.includes('action_scie') && reserve.actions.action_scie == true) ||
    (args.query_actions.includes('action_arche') && reserve.actions.action_arche == true) ||
    (args.query_actions.includes('action_educ') && reserve.actions.action_educ == true) ||
    (args.query_actions.includes('action_amen') && reserve.actions.action_amen == true) ||
    (args.query_actions.includes('aucune') && reserve.actions.action_scie != true
      && reserve.actions.action_arche != true
      && reserve.actions.action_educ != true
      && reserve.actions.action_amen != true)
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

function etat(args, data) {
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
      if (args.query_etat_cons_biol_evol.includes(tourb.etat_conservation.etcons_biodi_tend)) {
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