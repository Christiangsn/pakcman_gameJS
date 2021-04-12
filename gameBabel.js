//CAVAS

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d'); // contexto do canvas que vocce ira utilizad
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas); //colocou um filho no body dentro da arvore html

// colocar imagem de fundo

// Imagem de fundo
let bgReady = false;
const bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = 'images/background.png';

// Imagem do herói
let heroReady = false;
const heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;
};
heroImage.src = 'images/bomb.png';

// Imagem do monstro
let monsterReady = false;
const monsterImage = new Image();
monsterImage.onload = function () {
  monsterReady = true;
};
monsterImage.src = 'images/ie.png';

//objetos do jogo
const hero = {
    speed: 256 //movimento em pixels por segundo
}
const monster = {};
let monstersCaught = 0;

// controle do teclado
const keysDown = {};

// tecla para andar'
window.addEventListener('keydown', (e) => {
    keysDown[e.keyCode] = true;
});
// função parar de andar
window.addEventListener('keyup', (e) => {
    delete keysDown[e.keyCode];
});

// resetar o ojogo quando finalizar
const reset = () => {
    hero.x = canvas.width /2;
    hero.y = canvas.height /2;

      //posicionar o monstro aleatoriamente
     monster.x = 32 + (Math.random() * (canvas.width - 64)); 
     monster.y = 32 + (Math.random() * (canvas.height - 64)); 
};

// atualizar os objetos do jogo

const update = (modifier) => 

    {  //movimentos do heroi
    if (38 in keysDown) { // ao pressionar a seta 
        hero.y -= hero.speed * modifier;
    }
    if ( 40 in keysDown) { // pressionado para baixo
        hero.y += hero.speed * modifier;
    }
    if ( 37 in keysDown) {  // pressionado para baixo
        hero.x -= hero.speed * modifier;
    }
    if ( 39 in keysDown) { // pressionado para baixo
        hero.x += hero.speed * modifier;
    }

    // saber se os personagens se encontraram
    if (
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + 32)
    )  {
        ++monstersCaught;
        reset();
    }
};

let respawDoMonstro = window.setInterval(respaw, 1000);
function respaw() {
  monster.x = 32 + Math.random() * (canvas.width - 64);
  monster.y = 32 + Math.random() * (canvas.height - 64);
}
//  rendenizar tudo

const render = () => {
    if (bgReady) {
        ctx.drawImage(bgImage, 2, 2);
    }

    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }

    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    //pontuação

    ctx.fillStyle ='rgb(250, 250 250)';
    ctx.font = '24px Helvetica';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Monstros pegos: ' + monstersCaught, 32, 32);
};

// Controle o loop do jogo
 const main = () => {
     const now = Date.now();
     const delta = now - then;

     update(delta / 1000); //enviado para mexer no presente o personagem
     render();

     then = now;

     // executar o mais breve possivel
     requestAnimationFrame(main);

 };

 // suporte para para enviar ao requestanimationframe
 const w = window;
 const requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

 let then = Date.now();
 reset();
 main();
