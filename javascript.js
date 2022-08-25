
//Practicas

/*const text= 'Daniel';
const hola = `buenos dias ${text ? text : 'no hay nombre'}`
const names = ['Jose', 'Daniel', 'Manuel', 'Jorge', 'Samuel']
names.forEach(function(name){
    console.log(name);
})

names.map((name,index)=>{
    return console.log(`Hola ${name} en posicion ${index}`);
})

names.find((name)=>{
    if(name==='Jose'){
        return console.log(`Hola ${name}`);
    }
})

names.filter((name)=>{
    if(name!=='Jose'){
        return console.log(`Hola ${name}`);
    }
})

const ul = document.createElement("ul");
let datos = fetch('https://jsonplaceholder.typicode.com/posts').then(function(response){
    return response.json();
}).then((data)=>{
    console.log(data)
    data.forEach((post)=>{
        const li = document.createElement("li");
        li.innerHTML = post.title;
        ul.appendChild(li);
    });
    document.body.append(ul);
})
*/
//Snake
//variables
//Stop
const buttonStop = document.getElementById('stop');
buttonStop.innerText= 'start';
buttonStop.style = "margin-top: 5px"
const contenedor = document.getElementById('contenedor');
const objeto = document.getElementById('snake');


//objetos
function Snakes() {
    this.body = [];
    this.rastroX = [];
    this.rastroY = [];
    this.head = {
        x : 0,
        y : 0,
        state : "left",
    },

    this.addCola = function(){
        const item=document.createElement("div");
        const nuevo = new Cola(item);
        nuevo.item.style = `display: block; position: absolute;width: 10px; height: 10px; background-color: rgb(17, 94, 17); right: ${this.head.y};  top: ${this.head.x};`
        contenedor.append(nuevo.item)
        this.body[this.body.length] = nuevo; 
    }

    this.actualizar = function(){
       this.body.forEach((item)=>{
         if(item.posX<0 || item.posY<0){
            item.item.style = `display: none;`
         }else{
            item.item.style = `display: block; position: absolute;width: 10px; height: 10px; background-color: rgb(17, 94, 17); right: ${this.rastroY[item.posY]}px;  top: ${this.rastroX[item.posX]}px;`
         }
       })
    }
}

function Cola(item){
    this.posX = 0; 
    this.posY = 0; 
    this.item = item;
}

function Fruta(){
    this.posX = 0; 
    this.posY = 0; 
    this.item = {};
}


const snake = new Snakes();
const apple = new Fruta();

//RELOJ
var sec = 0;
var movebool= false;
var idMove = 0;  

let b = document.createElement("b");
document.body.append(b);

function reloj(){
    sec++;
    b.innerHTML = `${sec}`;
}

const idReloj = setInterval(reloj,1000);

//colicion fruta+
function colisionFruta(){
    if(snake.head.x==apple.posX){//comprueba que sea igual las posiciones de la cabeza con el resto del cuerpo en x
        if(snake.head.y==apple.posY){ //comprueba que sea igual las posiciones de la cabeza con el resto del cuerpo en y
            snake.addCola();
            snake.addCola();
            snake.addCola();
            snake.addCola();
            snake.addCola();
            snake.addCola();
            snake.addCola();
            snake.addCola();
            snake.addCola();
            snake.addCola();
            snake.addCola();
            snake.addCola();
            fruta();
        }
    }
}
//funcion colision con cola
const colision = function (){
    for(var i = 0;i < snake.body.length;i++){
        if(snake.head.x==snake.rastroX[snake.body[i].posX]){//comprueba que sea igual las posiciones de la cabeza con el resto del cuerpo en x
            if(snake.head.y==snake.rastroY[snake.body[i].posY]){ //comprueba que sea igual las posiciones de la cabeza con el resto del cuerpo en y
                stop();
            }
        }
    }
}


//colision bordes

const bordes = function(){
    if(snake.head.y>790 || snake.head.y<0){
        stop();
    }else if(snake.head.x>590 || snake.head.x<0){
        stop();
    }
}

//fruta aleatoria
var boolfruta=false;
const fruta =  function(){
    if(boolfruta==false){
    const frut=document.createElement('div');
    apple.item=frut;
    boolfruta=true;
    }
    let numY=parseInt((Math.random()*800));
    let numX=parseInt((Math.random()*600));
    for(var i=0;i<10;i++){
        if((numX%10) == 0){
            break;
        }
        numX++;
    }
    for(var i=0;i<10;i++){
        if((numY%10) == 0){
            break;
        }
        numY++;
    }
    apple.posX=numX;
    apple.posY=numY;
    apple.item.style = `display: block; position: absolute;z-index: 5; width: 10px; height: 10px; background-color: red; right: ${numY}px;  top: ${numX}px;`
    contenedor.append(apple.item);
}

//events
document.addEventListener('keypress',OnKeyPress)
document.addEventListener('keydown',OnKeyDown)
buttonStop.addEventListener('click',stop)

function stop(){
    if(movebool){
        clearInterval(idMove);
        movebool = false;
        buttonStop.innerText= 'start';
    }else{
        idMove = setInterval(move,100);
        movebool = true;
        buttonStop.innerText= 'stop';
    }
}

snake.addCola();
snake.addCola();
snake.addCola();
fruta();

function move(){
    if(snake.head.state=='right'){
        snake.rastroX[snake.rastroX.length]=snake.head.x;
        snake.rastroY[snake.rastroY.length]=snake.head.y;
        objeto.style.right = (snake.head.y-=10)+'px';
    }
    if(snake.head.state=='left'){
        snake.rastroX[snake.rastroX.length]=snake.head.x;
        snake.rastroY[snake.rastroY.length]=snake.head.y;
        objeto.style.right = (snake.head.y+=10)+'px';
    }
    if(snake.head.state=='up'){
        snake.rastroX[snake.rastroX.length]=snake.head.x;
        snake.rastroY[snake.rastroY.length]=snake.head.y;
        objeto.style.top = (snake.head.x-=10)+'px';
    }
    if(snake.head.state=='down'){
        snake.rastroX[snake.rastroX.length]=snake.head.x;
        snake.rastroY[snake.rastroY.length]=snake.head.y;
        objeto.style.top = (snake.head.x+=10)+'px';
    }

    //comprobar colision
    colision();
    //colision fruta
    colisionFruta();
    //colision bordes
    bordes();

    for(var i=0;i<snake.body.length;i++){
        snake.body[i].posXant = snake.body[i].posX;
        snake.body[i].posYant = snake.body[i].posY;
        snake.body[i].posX = snake.rastroX.length-(i+1);
        snake.body[i].posY = snake.rastroY.length-(i+1);
        snake.actualizar();
    }
}

function OnKeyPress(event){
    if(event.key=='w'){

        snake.head.state='up';

    }else if(event.key=='s'){

        snake.head.state='down';

    }else if(event.key=='d'){

        snake.head.state='right';

    }else if(event.key=='a'){

        snake.head.state='left';

    }
}

function OnKeyDown(event){
    if(event.key=='ArrowUp'){

        snake.head.state='up';

    }else if(event.key=='ArrowDown'){

        snake.head.state='down';

    }else if(event.key=='ArrowRight'){

        snake.head.state='right';

    }else if(event.key=='ArrowLeft'){

        snake.head.state='left';

    }
}