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
  galerie();
  cmd();
  trie();
}
// gere l'affichage du pointeur sur pc//
function souris() {
  const grandCercle = document.querySelector('.cursor2');
  const petitCercle = document.querySelector('.cursor');
  var carte = document.querySelector('.carte-flip');
  if (window.matchMedia("(min-width: 1025px)").matches) {
    let mousePosX = 0,
      mousePosY = 0;

    document.addEventListener('mousemove', coor);

    function coor(e) {
      mousePosX = e.clientX;
      mousePosY = e.clientY;
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
  // et aussi les animations des logos dans mes compétences puis graphisme //
  var moosic = document.querySelector('.logo-moosic');
  moosic.addEventListener('click', logo1);
  var diamyra = document.querySelector('.logo-diamyra');
  diamyra.addEventListener('click', logo2);
  var phanpharma = document.querySelector('.logo-phanpharma');
  phanpharma.addEventListener('click', logo3);

  function retourne(evt) {
    carte.classList.toggle('retourne');
  }

  function logo1(evt) {
    moosic.classList.add('logo-active');
    window.setTimeout(attente, 1000);

    function attente() {
      moosic.classList.remove('logo-active');
    }
  }

  function logo2(evt) {
    diamyra.classList.add('logo-activeb');
    window.setTimeout(attenteb, 1000);

    function attenteb() {
      diamyra.classList.remove('logo-activeb');
    }
  }

  function logo3(evt) {
    phanpharma.classList.add('logo-activec');
    window.setTimeout(attentec, 1000);

    function attentec() {
      phanpharma.classList.remove('logo-activec');
    }
  }

}
//détermine si l'utilisateur est sur pc ou smartphone//
function carteanim() {
  console.log('carteanim');
  if (window.matchMedia("(min-width: 1025px)").matches) {
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
    threshold: 0.3
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

  function timer(evt) {

  }

  function handleOrientation(e) {

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
  var message = "hello world.";
  var taille = 12;
  var negativ = false;
  var barre = document.querySelector('.code-underscore');
  var zone = document.querySelector('#code-anim');
  var i = 0;
  var lettre = message.substr(i, 1);
  window.setInterval(cligno, 400);

  function cligno() {
    barre.classList.toggle('cache');
  }
  mot();

  function mot() {
    var timer = window.setInterval(letter, 200);

    function letter() {
      zone.innerHTML = message.substr(0, i);
      if (negativ == false) {
        i++;
      } else {
        i--;
      }
      if (i == 13 | i == -1) {
        window.clearInterval(timer);
        window.setTimeout(stop, 1000);
        console.log('change');
      }

      function stop() {
        if (negativ == false) {
          negativ = true;
        } else {
          negativ = false;
        }
        timer = window.setInterval(letter, 200);
      }
    }
  }

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

  function activ(evt) {
    if (i == 0) {
      menu.classList.remove('menu-off');
    } else if (i >= 1) {
      menu.classList.toggle('menu-off-b');
    }
    i = i + 1;
    menu.classList.toggle('menu-on');
    retour.classList.toggle('retour-off');
    retour.classList.toggle('retour-on');
    window.setTimeout(attente, 600);

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

//gere la galerie de mes outils //

function galerie() {
  const atom = {
    num: 1,
    src: 'content/outils/galerie/atom.svg',
    desc: 'Atom'
  };
  const affinityd = {
    num: 2,
    src: 'content/outils/galerie/affinityDesigner.svg',
    desc: 'Affinity Designer'
  };
  const affinityp = {
    num: 3,
    src: 'content/outils/galerie/affinityPhoto.svg',
    desc: 'Affinity Photo'
  };
  const figma = {
    num: 4,
    src: 'content/outils/galerie/figma.svg',
    desc: 'Figma'
  };
  const githubd = {
    num: 5,
    src: 'content/outils/galerie/github.svg',
    desc: 'Github Desktop'
  };
  const illustrator = {
    num: 6,
    src: 'content/outils/galerie/illustrator.svg',
    desc: 'Adobe Illustrator'
  };
  const notion = {
    num: 7,
    src: 'content/outils/galerie/notion.svg',
    desc: 'Notion.so'
  };
  const premier = {
    num: 8,
    src: 'content/outils/galerie/premier.svg',
    desc: 'Premier pro'
  };

  var avant = document.querySelector('.galerie-outils-avant');
  var arriere = document.querySelector('.galerie-outils-arriere');

  var face = false;
  var boutons = document.querySelectorAll('.rond-bouton-affichage');
  for (var bouton of boutons) {
    bouton.addEventListener('click', change);
  }

  function change(evt) {
    var image, text;
    if (face == false) {
      image = document.querySelector('.galerie-outils-arriere-img');
      text = document.querySelector('.galerie-outils-arriere-txt');
      face = true;
    } else {
      image = document.querySelector('.galerie-outils-avant > img');
      text = document.querySelector('.galerie-outils-avant-txt');
      face = false;
    }

    var nbr = this.dataset.num;
    this.innerHTML = '<circle cx="8.5" cy="7.5073" r="7.5073" fill="#363636" />';

    switch (nbr) {
      case '1':
        image.src = atom.src;
        image.alt = atom.desc;
        text.innerHTML = atom.desc;
        break;
      case '2':
        image.src = affinityd.src;
        image.alt = affinityd.desc;
        text.innerHTML = affinityd.desc;
        break;
      case '3':
        image.src = affinityp.src;
        image.alt = affinityp.desc;
        text.innerHTML = affinityp.desc;
        break;
      case '4':
        image.src = figma.src;
        image.alt = figma.desc;
        text.innerHTML = figma.desc;
        break;
      case '5':
        image.src = githubd.src;
        image.alt = githubd.desc;
        text.innerHTML = githubd.desc;
        break;
      case '6':
        image.src = illustrator.src;
        image.alt = illustrator.desc;
        text.innerHTML = illustrator.desc;
        break;
      case '7':
        image.src = notion.src;
        image.alt = notion.desc;
        text.innerHTML = notion.desc;
        break;
      case '8':
        image.src = premier.src;
        image.alt = premier.desc;
        text.innerHTML = premier.desc;
        break;
    }

    avant.classList.toggle('galerie-outils-rot');
    arriere.classList.toggle('galerie-outils-rot');

  }
}


//desactiver le click droit//

document.oncontextmenu = function() {
  return false;
}

// gere le mode nuit //

function night() {
  var head = document.querySelector('header');
  let root = document.querySelector(':root');
  var black = false;
  head.addEventListener('click', change);

  function change(evt) {
    if (black == false) {
      root.style.setProperty('--background', '#363636');
      root.style.setProperty('--grey', '#F0F0F3');
      black = true;
    } else {
      root.style.setProperty('--background', '#F0F0F3');
      root.style.setProperty('--grey', '#363636');
      black = false;
    }

  }
}

//tri de la grille //

function trie() {
  var tous = document.querySelector('.bouton-grille-tous');
  var graphisme = document.querySelector('.bouton-grille-graphisme');
  var webdesign = document.querySelector('.bouton-grille-webdesign');
  var developpement = document.querySelector('.bouton-grille-dev');
  var items = document.querySelectorAll('.item-grille-projet');
  var itemswebdesign = document.querySelectorAll('.item-grille-projet-webdesign');
  var itemsgraphisme = document.querySelectorAll('.item-grille-projet-graphisme');
  var itemsdev = document.querySelectorAll('.item-grille-projet-dev');

  tous.classList.add('bouton-trie-select');


  tous.addEventListener('click', trietout);
  graphisme.addEventListener('click', triegraphisme);
  webdesign.addEventListener('click', triewebdesign);
  developpement.addEventListener('click', triedev);


  function trietout( evt ) {
    graphisme.classList.remove('bouton-trie-select');
    webdesign.classList.remove('bouton-trie-select');
    developpement.classList.remove('bouton-trie-select');
    if (this.classList.contains('bouton-trie-select') == false) {
        this.classList.add('bouton-trie-select');
        for (let itemgraphisme of itemsgraphisme){
          itemgraphisme.style.opacity = '1';
        }
        for (let itemwebdesign of itemswebdesign){
          itemwebdesign.style.opacity = '1';
        }
        for (let itemdev of itemsdev){
          itemdev.style.opacity = '1';
        }
    }
  }

  function triegraphisme( evt ){
    tous.classList.remove('bouton-trie-select');
    webdesign.classList.remove('bouton-trie-select');
    developpement.classList.remove('bouton-trie-select');
    if (this.classList.contains('bouton-trie-select') == false) {
        this.classList.add('bouton-trie-select');
        for (let item of items){
          item.style.opacity = '0';
        }
        for (let itemgraphisme of itemsgraphisme){
          itemgraphisme.style.opacity = '1';
        }
    }
  }

  function triewebdesign( evt ){
    tous.classList.remove('bouton-trie-select');
    graphisme.classList.remove('bouton-trie-select');
    developpement.classList.remove('bouton-trie-select');
    if (this.classList.contains('bouton-trie-select') == false) {
        this.classList.add('bouton-trie-select');
        for (let item of items){
          item.style.opacity = '0';
        }
        for (let itemwebdesign of itemswebdesign){
          itemwebdesign.style.opacity = '1';
        }
    }
  }

  function triedev( evt ){
    tous.classList.remove('bouton-trie-select');
    webdesign.classList.remove('bouton-trie-select');
    graphisme.classList.remove('bouton-trie-select');
    if (this.classList.contains('bouton-trie-select') == false) {
        this.classList.add('bouton-trie-select');
        for (let item of items){
          item.style.opacity = '0';
        }
        for (let itemdev of itemsdev){
          itemdev.style.opacity = '1';
        }
    }
  }

}
