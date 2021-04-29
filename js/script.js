// mise en place du curseur

var hoverables = document.querySelectorAll('.hoverable');

document.addEventListener('DOMContentLoaded', souris);

function souris( evt ) {
  const grandCercle = document.querySelector('.cursor2');
  const petitCercle = document.querySelector('.cursor');
  if (window.matchMedia("(min-width: 768px)").matches) {
    let mousePosX = 0,
        mousePosY = 0;

    document.addEventListener('mousemove',coor);
    function coor( e ) {
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
  }

}

// animation carte //

document.addEventListener('DOMContentLoaded',carte);

function carte( evt ){
  var carte = document.querySelector('.carte-flip');
  var devant = document.querySelector('.carte-flip-avant');
  var arriere = document.querySelector('.carte-flip-arriere');
  carte.addEventListener('onclick',retourne);
  function retourne( evt ){
      
  }
}
