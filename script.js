var bottles = document.getElementsByClassName("bottle");
var curtain = document.getElementById('curtain');
var gamebottles = document.getElementsByClassName("game_bottle");
var template_colors = ["blue", "purple", "red", "yellow",  "green"];
var game_colors = ["red", "green", "blue", "yellow",  "purple"];
var trackMoved = [0, 0, 0, 0, 0];
var counterDisp = document.getElementById('counter');


function attach_clickListeners(){
    for(let i = 0; i < gamebottles.length; i++){
        gamebottles[i].addEventListener('click', function(){
            if(gamebottles[i].classList.contains('moveUp')){
                gamebottles[i].classList.remove('moveUp');
                trackMoved[i] = 0;
            }
            else {
                gamebottles[i].classList.add('moveUp');
                trackMoved[i] = 1;
                checktoSwap();
                checkGame();
            }
        });
        console.log("clicked")

    }
}

function checkGame(){
    let count = 0;
    for(let i = 0; i < template_colors.length; i++){
        if(template_colors[i] == game_colors[i]){
            count++;
        }
    }
    if (count == 5){
        counterDisp.innerHTML = "<h1> You Got It </h1>"
        curtain.style.display = 'none';
        show_templates();
        color_templates();
    }
    else{
        counterDisp.innerHTML = "<h1>"+ count +"</h1>"
    }
    return count;
}

function checktoSwap(){
    let c = [];
    
    for(let i = 0; i < trackMoved.length; i++){
        if(trackMoved[i] == 1)
        c.push(i);
    }

    if (c.length > 1){
        let temp = game_colors[c[0]];
        game_colors[c[0]] = game_colors[c[1]];
        game_colors[c[1]] = temp;
        trackMoved = [0, 0, 0, 0, 0]
        resetMove();
        color_game();
    }
}

function resetMove(){
    for(let i = 0; i <  gamebottles.length; i++){
        gamebottles[i].classList.remove('moveUp');
    }
}

function color_templates(){
    for(let i = 0; i < bottles.length; i++){
        bottles[i].style.backgroundColor = template_colors[i];
    }
}

function show_templates(){
    for(let i = 0; i < bottles.length; i++){
        bottles[i].style.display = 'flex';
    }
}

function color_game(){
    for(let i = 0; i < gamebottles.length; i++){
        gamebottles[i].style.backgroundColor = game_colors[i];
    }
}
  
function shuffle(o){
   for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
   return o;
}
  
function checkShuffle(){
    while(checkGame() > 0){
        shuffle(template_colors);
    }
}

checkShuffle()
color_templates();
color_game();
attach_clickListeners();
checkGame();
