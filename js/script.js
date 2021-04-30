// mise en place du curseur//

var hoverables = document.querySelectorAll('.hoverable');

document.addEventListener('DOMContentLoaded', debut);

function debut(evt) {
  souris();
  carte();
  carteanim();
}

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


function carte() {
  var carte = document.querySelector('.ensemble-carte');

  carte.addEventListener('click', retourne);

  function retourne(evt) {
    carte.classList.toggle('retourne');
  }

}

function carteanim() {
  console.log('carteanim');
  if (window.matchMedia("(min-width: 768px)").matches) {
    coordsouris();
  } else {
    coordtel();
  }


}

function coordsouris() {
  console.log('souris');
  var flip = document.querySelector('.carte-flip');
  var carte = document.querySelector('.ensemble-carte');
  let mousePosX = 0,
    mousePosY = 0;
  document.addEventListener('mousemove', coord);

  function coord(e) {
    mousePosX = e.pageX;
    mousePosY = e.pageY;
    mousePosX = mousePosX / 20;
    mousePosY = mousePosY / 20;

    if (carte.classList.contains('retourne') == true) {
      mousePosX = mousePosX + 180;
    }
    flip.style.transform = 'rotateX(' + mousePosY + "deg)" + ' rotateY(' + mousePosX + 'deg)';
  }



}

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
