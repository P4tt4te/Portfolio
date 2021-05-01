// mise en place du curseur//

var hoverables = document.querySelectorAll('.hoverable');

document.addEventListener('DOMContentLoaded', debut);
//fonction general//
function debut(evt) {
  souris();
  carte();
  carteanim();
  tuto();
}
// gere l'affichage du pointeur sur pc//
function souris() {
  const grandCercle = document.querySelector('.cursor2');
  const petitCercle = document.querySelector('.cursor');
  var carte = document.querySelector('.carte-flip');
  if (window.matchMedia("(min-width: 768px)").matches) {
    let mousePosX = 0,
      mousePosY = 0;

    document.addEventListener('mousemove', coor);

    function coor(e) {
      mousePosX = e.pageX;
      mousePosY = e.pageY;
      petitCercle.style.top = mousePosY + "px";
      petitCercle.style.left = mousePosX + "px";


    }

    let delay = 6,
      calculMousePosX = 0,
      calculMousePosY = 0;

    function delayMouseFollow() {
      requestAnimationFrame(delayMouseFollow);

      calculMousePosX += (mousePosX - calculMousePosX) / delay;
      calculMousePosY += (mousePosY - calculMousePosY) / delay;

      grandCercle.style.top = calculMousePosY + "px";
      grandCercle.style.left = calculMousePosX + "px";
    }
    delayMouseFollow();
  } else {
    petitCercle.style.display = 'none';
    grandCercle.style.display = 'none';
  }
}

// gere le retournement de la carte//
function carte() {
  var carte = document.querySelector('.ensemble-carte');

  carte.addEventListener('click', retourne);

  function retourne(evt) {
    carte.classList.toggle('retourne');
  }

}
//détermine si l'utilisateur est sur pc ou smartphone//
function carteanim() {
  console.log('carteanim');
  if (window.matchMedia("(min-width: 768px)").matches) {
    coordsouris();
    descimage(1);
  } else {
    coordtel();
    descimage(0);
  }


}
//gere les coordonnées sur pc (en fonction de la postion de la souris)//
function coordsouris() {
  console.log('souris');
  var flip = document.querySelector('.carte-flip');
  var carte = document.querySelector('.ensemble-carte');
  let mousePosX = 0,
    largeur,
    longeur,
    mousePosY = 0;
  document.addEventListener('mousemove', coord);

  function coord(e) {
    mousePosX = e.pageX;
    mousePosY = e.pageY;

    largeur = window.innerWidth;
    longeur = window.innerHeight;

    mousePosX = ((mousePosX * 2) - largeur) / 40;
    mousePosY = ((mousePosY * 2) - longeur) / 40;

    if (carte.classList.contains('retourne') == true) {
      mousePosX = mousePosX + 180;
    }

    if (mousePosX < largeur) {
      mousePosX = -(mousePosX);
    }
    if (mousePosY < longeur) {
      mousePosY = -(mousePosY);
    }
    flip.style.transform = 'rotateX(' + mousePosY + "deg)" + ' rotateY(' + mousePosX + 'deg)';
  }



}
//gere les coordonnées sur téléphone (avec le gyroscope)//
function coordtel() {
  console.log('tel');
  var flip = document.querySelector('.carte-flip');
  var carte = document.querySelector('.ensemble-carte');
  let mousePosX = 0,
    mousePosY = 0;

  window.addEventListener('deviceorientation', handleOrientation);

  function handleOrientation(e) {
    mousePosX = e.gamma;
    mousePosY = e.beta;

    if (carte.classList.contains('retourne') == true) {
      mousePosX = mousePosX + 180;
    }
    flip.style.transform = 'rotateX(' + mousePosY + "deg)" + ' rotateY(' + mousePosX + 'deg)';
  }
}
//gere l'affichage du texte de description de l'image de présentation en fonction du support de l'utilisateur (pc ou mobile)//
function descimage(type) {
  var zone = document.querySelector('.desc-carte-txt');
  let texte = document.createElement('p');

  if (type > 0) {
    texte.textContent = "Clique sur l'image ;";
  } else {
    texte.textContent = "Tappote l'image ;";
  }
  texte.classList.add('texte-clique');
  zone.prepend(texte);
}

function tuto() {
  var bouton = document.querySelector('.bouton-tuto');
  var zone = document.querySelector('.ensemble-bouton-tuto');
  let phrase = document.createElement('p');
  phrase.textContent = "Je me doutais bien que tu allais appuyer sur ce bouton, concrètement il sert à rien mais au moins tu sais comment sont les boutons sur ce site.";
  phrase.classList.add('bouton-tuto-txt');

  bouton.addEventListener('click',affiche);

  function affiche ( evt ){
    zone.append(phrase);
    bouton.src = "content/presentation/help_active.svg";
  }
}
