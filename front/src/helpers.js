/**
 * 
 * @param {number} n Nombre de joueurs
 * @param {number} p ID du joueur preneur
 * @param {number} a ID du joueur appelé
 * @param {number[]} d IDs des joueur défenseurs
 * @param {number} coef Coefficient du contrat
 * @param {number} target Minimum de points requis pour le contrat
 * @param {boolean} isValidated Contrat validé ?
 * @param {boolean} petitLastPliAttaque Petit déposé au dernier pli par l'attaque
 * @param {boolean} petitLastPliDefense Petit déposé au dernier pli par la défense
 * @param {number} ptsAttaque Points de l'attaque initialement
 */
export const computePoints = (n, p, a = null, d, coef, target, isValidated, petitLastPliAttaque, petitLastPliDefense, ptsAttaque) => {
    let pts_p;
    let pts_c;
    let pts_d = 0;
    let pts = isValidated ? 25 + ptsAttaque : ptsAttaque - 25
    let s = pts - target
    if(petitLastPliAttaque) pts += 10
    else if(petitLastPliDefense) pts -= 10
    s *= coef
    let nAttaque = 1
    if(a) {
        nAttaque = 2
    }
    let new_pts = s * (n - nAttaque)
    if(isValidated){
        pts_d = -s;
        if(n === 5){
            if(a){
                pts_p = 2/3 * new_pts
                pts_c = 1/3 * new_pts
            }
            else{
                pts_p = new_pts
            }
        }
        else{
            pts_p = new_pts
        }
    }
    else{
        pts_d = -s;
        if(n === 5){
            if(a){
                pts_p = 2/3 * new_pts
                pts_c = 1/3 * new_pts
            }
            else{
                pts_p = new_pts
            }
        }
        else{
            pts_p = new_pts
        }
    }
    
    let attaque = [
        {id: p, points: pts_p}
    ]
    if(a){
        attaque.push({id: a, points: pts_c})
    }
    let defense = []
    for(let i=0; i<d.length; i++){
        defense.push({id: d[i], points: pts_d})
    }
    return attaque.concat(defense)
}

export function addMinutes(date, minutes) {
    date.setMinutes(date.getMinutes() + minutes);
    return date;
}
