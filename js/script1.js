//----------------------------------------------------------------
//JUGAR AHORA
//----------------------------------------------------------------
let btnJugar = document.querySelector(".btn-neon");
let juego = document.querySelector(".juego")
btnJugar.addEventListener("click", function(){
    juego.classList.add("active")
});


let palabras = [
    "cariño",
    "amargo",
    "filtro",
    "espuma",
    "graves",
    "accion",
    "bosque",
    "bombon",
    "chiste",
    "centro",
    "elegir"
];

const wordContainer = document.getElementById("wordContainer");
const startButton = document.getElementById("startButton");
const usedLetterElement = document.getElementById("usedLetters");

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.canvas.width = 0;
ctx.canvas.height = 0;

const bodyParts = [
    [4, 2, 1, 1],
    [4, 3, 1, 2],
    [3, 5, 1, 1],
    [5, 5, 1, 1],
    [3, 3, 1, 1],
    [5, 3, 1, 1],
]

let selectedWord;
let usedLetters;
let mistakes;
let hits;
let word;
let frase = document.getElementById("frase")

const addLetter = letter => {
    const letterElement = document.createElement("span");
    letterElement.innerHTML = letter.toUpperCase();
    usedLetterElement.appendChild(letterElement);
}

const addBodyPart = bodyParts => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(...bodyParts)
}

const wrongLetter = () => {
    addBodyPart(bodyParts[mistakes]);
    mistakes++;
    if(mistakes === bodyParts.length) endGame();
}

const endGame = () => {
    document.removeEventListener("keydown", letterEvent);
    startButton.style.display = "block"; 
    startButton.innerHTML = "Jugar otra vez";
    fraseDesistir.innerHTML="La palabra correcta era " + word;
    frase.appendChild(fraseDesistir);
    
}

const correctLetter = letter => {
   const {children} = wordContainer;
   for(let i = 0; i < children.length; i++) {
       if(children[i].innerHTML === letter){
           children[i].classList.toggle("hidden");
           hits++
       }
   } 
   if(hits === selectedWord.length) endGame();
}

const letterInput = letter => {
    if(selectedWord.includes(letter)){
        correctLetter(letter);
    }else{
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter)
}

const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if(newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter)
    }
}

const drawWord = () => {
    selectedWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);
    })
}


const palabraRandom = () => {
    word = palabras[Math.floor((Math.random()*palabras.length))].toUpperCase();
    selectedWord = word.split("")
};



const drawHangMan = () => {
    ctx.canvas.width = 120;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#d95d39";
    ctx.fillRect(0, 7, 4, 1);
    ctx.fillRect(1, 0, 1, 8);
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);
};

const botonDesistir = document.createElement("button")

const fraseDesistir = document.createElement("h2");
function desistir(){
    botonDesistir.disabled = true
    startButton.style.display = "block"; 
    startButton.innerHTML = "Jugar otra vez"
    frase.appendChild(fraseDesistir);
    fraseDesistir.innerHTML="La palabra correcta era " + word;
    

}


const startGame = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = "";
    usedLetterElement.innerHTML = "";
    fraseDesistir.innerHTML = ""
    startButton.style.display = "none";
    drawHangMan()
    palabraRandom();
    drawWord();
    document.addEventListener("keydown", letterEvent);
    botonDesistir.type="button"
    botonDesistir.innerHTML="desistir"
    botonDesistir.classList.add("desistir")
    botonDesistir.disabled = false
    botones.appendChild(botonDesistir)
}


botonDesistir.addEventListener("click", desistir);

startButton.addEventListener("click", startGame);



//----------------------------------------------------------------
//AGREGAR PALABRA
//----------------------------------------------------------------

let btnAbrirPopup = document.getElementById("btn-neon2")
let overlay = document.getElementById("overlay")
let popup = document.getElementById("popup")
let btnCerrarPopup = document.getElementById("btn-cerrar-popup")
let btnAgregar = document.getElementById("agregar");
let textarea = document.getElementById("textarea");


btnAbrirPopup.addEventListener("click", function () {
    overlay.classList.add("active")
    popup.classList.add("active")
});

btnCerrarPopup.addEventListener("click", function () {
    overlay.classList.remove("active")
    popup.classList.add("active")
});

btnAgregar.addEventListener("click", function () {
    let palabraEscrita = textarea.value;
    palabras.push(palabraEscrita)
    juego.classList.add("active")
    console.log(palabraEscrita)
    console.log(palabras)
});