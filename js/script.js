// mise en place du curseur//

var hoverables = document.querySelectorAll('.hoverable');

document.addEventListener('DOMContentLoaded', debut);
//fonction general//
function debut(evt) {
  souris();
  carte();
  menu();
  carteanim();
  tuto();
  animoosic();

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

    let delai = 6,
      calculMousePosX = 0,
      calculMousePosY = 0;

    function delayMouseFollow() {
      requestAnimationFrame(delayMouseFollow);

      calculMousePosX += (mousePosX - calculMousePosX) / delai;
      calculMousePosY += (mousePosY - calculMousePosY) / delai;

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
  //gere l'animation quand elle est visible//
  let visible = true;
  var options = {
    rootMargin: '0px',
    threshold: 0.1
  }
  var observer = new IntersectionObserver(callback, options);
  observer.observe(carte);

  function callback() {

    if (visible == true) {
      document.addEventListener('mousemove', coord);
      visible = false;
      console.log('ajoute');
    } else {
      document.removeEventListener('mousemove', coord);
      visible = true;
      console.log('retire');
    }
  }


  function coord(e) {
    window.setTimeout(attente,100);
    function attente() {

    }
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

  let visible = true;
  var options = {
    rootMargin: '0px',
    threshold: 0.1
  }
  var observer = new IntersectionObserver(callback, options);
  observer.observe(carte);

  function callback() {

    if (visible == true) {
      window.addEventListener('deviceorientation', handleOrientation);
      visible = false;
      console.log('ajoute');
    } else {
      window.removeEventListener('deviceorientation', handleOrientation);
      visible = true;
      console.log('retire');
    }
  }

  function timer ( evt ) {

  }
  function handleOrientation(e) {
    window.setTimeout(attente,100);
    function attente() {

    }
    mousePosX = e.gamma;
    mousePosY = e.beta;
    mousePosY = mousePosY - 30;

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

//affiche le texte quand on appuie sur le bouton avec le '?' + change le bouton//
function tuto() {
  var bouton = document.querySelector('.bouton-tuto');
  var zone = document.querySelector('.ensemble-bouton-tuto');
  let phrase = document.createElement('p');
  phrase.textContent = "Je me doutais bien que tu allais appuyer sur ce bouton, concrètement il sert à rien mais au moins tu sais comment sont les boutons sur ce site.";
  phrase.classList.add('bouton-tuto-txt');

  bouton.addEventListener('click', affiche);

  function affiche(evt) {
    zone.append(phrase);
    bouton.src = "content/presentation/help_active.svg";
  }
}

//déclanche l'animation des pages de webdesign au scroll//
function animoosic() {
  var pagea = document.querySelector('.moosic');
  var pageb = document.querySelector('.moosic-b');
  var parent = document.querySelector('.web-design');

  let visible = true;
  pagea.style.display = 'none';
  pageb.style.display = 'none';
  var options = {
    rootMargin: '0px',
    threshold: 0.1
  }
  var observer = new IntersectionObserver(callback, options);
  observer.observe(parent);

  function callback() {

    if (visible == true) {
      pagea.style.display = 'none';
      pageb.style.display = 'none';
      visible = false;
      console.log('ajoute');
    } else {
      pagea.style.display = 'inline';
      pageb.style.display = 'inline';
      visible = true;
      console.log('retire');
    }
  }
}

// anime le cmd de windows //

function cmd() {

}

// gere le menu //

function menu() {
  var menu = document.querySelector('nav');
  var retour = document.querySelector('.retour');
  var rond = document.querySelector('.rond');
  menu.classList.add('menu-off');
  retour.classList.add('retour-off');
  retour.style.display = 'none';
  rond.addEventListener('click', activ);
  var affiche = false;
  var i = 0;

  function activ( evt ) {
    if (i == 0){
      menu.classList.remove('menu-off');
    }else if (i >= 1) {
      menu.classList.toggle('menu-off-b');
    }
    i = i+1;
    menu.classList.toggle('menu-on');
    retour.classList.toggle('retour-off');
    retour.classList.toggle('retour-on');
    window.setTimeout(attente,600);
    function attente() {
        if (affiche == false) {

          retour.style.display = 'flex';
          affiche = true;
        } else {

          retour.style.display = 'none';
          affiche = false;
        }

    }

  }
}
