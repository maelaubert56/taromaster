import './Rules.css'

function Rules() {
    return (
        <div className='rules'>
            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="24" viewBox="0 0 33 24" fill="none" className='backarrow' onClick={() => window.location.href = '/'}>
                <path d="M0.939339 10.9393C0.353554 11.5251 0.353554 12.4749 0.939339 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.80761 11.0711 0.80761 10.4853 1.3934L0.939339 10.9393ZM33 10.5L2 10.5L2 13.5L33 13.5L33 10.5Z"/>
            </svg>
            <h1>Règles du jeu</h1>
            <div className='rules-content'>
                <h2>Préparation</h2>
                <p>Un joueur est désigné pour distribuer. Celui-ci donne alors à chaque joueur les cartes 3 par 3.</p>
                <p>Le donneur doit également constituer "Le chien", composé de 6 cartes pour 3 ou 4 joueurs, ou de 3 cartes pour 5 joueurs, en veillant à ce que ces cartes ne soient ni les premières ni les dernières à être distribuées.</p>
                <p>Chaque joueur retourne alors ses cartes sans les trier, et c'est le joueur situé à gauche du donneur qui procède en premier à l'annonce des contrats.</p>

                <h2>Les annonces</h2>
                <p>Les annonces (ou enchères), permet de déterminer les équipes lors d'une nouvelle donne.<br />En fonction de son jeu et de sa stratégie, un joueur est libre de décider d'annoncer un contrat ou non, dans ce dernier cas on dit qu'il "passe". Dans le cas d'une prise par un joueur, celui-ci doit parier sa victoire en prenant plus ou moins de risques selon le niveau d'enchères choisi :</p>
                <ul>
                    <li><p>une Petite (pts x1)</p></li>
                    <li><p>une Garde (pts x2)</p></li>
                    <li><p>une Garde sans (pts x4)</p><span>(l'annonceur garde le chien mais ne le regarde pas)</span></li>
                    <li><p>une Garde Contre (pts x6)</p><span>(le chien revient à l'équipe adverse et ne le regarde pas)</span></li>
                </ul>
                <p>Suite à l'annonce d'une prise par un joueur, un autre joueur peut surenchérir en prenant un contrat plus grand.<br />Si aucun joueur n'annonce de contrat, le donneur reprend et redistribue les cartes.</p>
                <p>Une variante existe : si aucun joueur de prend de contrat trois tours consécutifs, alors une "vachette" est mise place :<br />Le but est désormais de faire le moins de points possible, pénalisant ainsi les joueurs pouvant réaliser une prise.<br />Le chien est remporté par celui réalisant le dernier pli.</p>

                <h2>Déroulement de la partie :</h2>
                <p>A l'issu de la prise d'un joueur, le chien composé de 6 cartes est retourné à la vue de tous et donnée au preneur qui se retrouve seul face à la défense. Dans le cas d'un chien composé de 3 cartes, le preneur doit "appeler" un Roi (parmi les 4) avant de dévoiler le chien, le joueur possédant ce Roi se retrouve donc dans la même équipe que le preneur et ne doit pas l'annoncer aux autres.</p>
                <p>Le preneur doit constituer à son tour un chien du même nombre de cartes qu'il déposera faces cachées dans ses plis remportés.</p>
                <p>Le but de chaque équipe (l'attaque et la défense) est de réaliser le plus de points possibles parmi ses plis.<br />C'est au joueur situé à gauche du donneur de commencer la partie. Dans le cas d'une partie à 5 joueurs (donc d'un Roi appelé), le premier joueur n'a pas le droit de jouer la couleur du Roi appelé, à moins d'être le Roi lui-même.</p>
                <p>Un joueur joue une couleur et les autres ont l'obligation de fournir la couleur demandée. S'ils n'en possèdent pas, ils doivent "couper" à l'atout, les cartes portant un numéro allant de 1 à 21 : les atouts remportent les plis sur toutes les couleurs. Plus il est grand, plus il est puissant, par exemple l'atout 21 remporte sur toutes les cartes du jeu. De plus, les joueurs ont l'obligation de monter à l'atout, c'est à dire une carte d'atout supérieure à celle précédemment jouée. Si un joueur ne possède ni de carte de la couleur demandée ni d'atout, il peut poser la carte qu'il souhaite.</p>
                <p>Le gagnant du pli est celui qui ouvre au tour suivant.</p>
                <p>L'excuse est la carte du joueur de mandoline, elle peut être jouée n'importe quand et permet de ne pas jouer un pli, on dit que le joueur "s'excuse". L'excuse est toujours conservée par le joueur qui la possède, mais ne peut remporter aucun pli. Le joueur doit donc donner une carte sans valeur parmi ses précédents plis remportés. L'excuse ne peut cependant pas être jouéee au dernier tour sous peine d'être remportée par l'équipe adverse.</p>


                <h2>Les points</h2>
                <p>A la fin de chaque partie, il faut compter séparemment le total des plis de l'attaque et de la défense, le total faisant toujours 91 points.</p>
                <p>La valeur des cartes est la suivante :</p>
                <ul>
                    <li><p>Le Valet vaut 1.5 pt</p></li>
                    <li><p>Le Cavalier vaut 2.5 pts</p></li>
                    <li><p>La Dame vaut 3.5 pts</p></li>
                    <li><p>Le Roi vaut 4.5 pts</p></li>
                    <li><p>Les Bouts (1, 21 et excuse) valent 4.5 pts</p></li>
                    <li><p>Les autres cartes valent 0.5 pt</p></li>
                </ul>
                <p>Comme chaque carte basse vaut 0.5 point, on compte toujours une figure ou un bout pour chaque paire de cartes basses.<br />Ainsi, un Roi + un 5 de trèfle valent à eux deux 5 points.</p>
                <p>Pour valider son contrat, le preneur doit valider un certain nombre de points en fonction du nombre de Bouts qu'il possède (1, 21 et excuse) :</p>
                <ul>
                    <li><p>0 Bout : 56 pts</p></li>
                    <li><p>1 Bout : 51 pts</p></li>
                    <li><p>2 Bouts : 41 pts</p></li>
                    <li><p>3 Bouts : 36 pts</p></li>
                </ul>

                <p>Si le contrat est validé, le preneur gagne 25 points plus le nombre de points au-dessus de l'objectif qu'il a réalisé, le tout multiplié par le coefficient de son contrat. Ensuite, ce résultat est soustrait aux scores de chaque défenseur, et le preneur reçoit ce même résultat, mais en points positifs, multiplié par le nombre de défenseurs. Dans une partie à 5 joueurs, le preneur et son partenaire se partagent ces points, avec le preneur obtenant 2/3 et son partenaire 1/3.</p>
                <p>En revanche, si le joueur ne valide pas le contrat, le processus est similaire, mais cette fois le preneur obtient les mêmes résultats en points négatifs, tandis que les défenseurs enregistrent des points positifs.</p>

                <h2>Bonus/Malus :</h2>
                <p>Nan frérot abuse pas c'est déja assez compliqué comme ca ...</p>
            </div>
        </div>
    )
}

export default Rules