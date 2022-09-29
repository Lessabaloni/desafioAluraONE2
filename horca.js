const mobileKeyboard = document.querySelectorAll('.mobileKeyboardLetter');
console.log(mobileKeyboard);
const mobileKeyboardHidden = document.querySelector('.mobileKeyboard')
const buttonArea = document.querySelector('.buttonsCenter');
const mainButton = document.querySelector('.iniciarJuegoButton');
const secundaryButton = document.querySelector('.agregarPalabraButton');
const screen = document.querySelector('.canvas');
const canvas = screen.getContext('2d');
const textArea = document.querySelector('.input_word');
const maxWord = document.querySelector('.useRestrictionArea');
const text = document.querySelector('.useRestrictionText');
const ganaste = document.getElementById('ganaste');
const perdiste = document.getElementById('perdiste');
let predifinedWords = ['FLOR','CONEJO','MUNDO','MARIPOSA','LUZ','LAPIZ'];
console.log(predifinedWords);
let localStorageWordsList;
console.log(localStorageWordsList);
let wordsList;
console.log(wordsList);
const userWordsList = verifyWordList();
let randomWord;
let division;
let letter;
let tecladoVirtualLetter;
let letrasRepetidas = [0];
let aciertos = 0;
let posicionLetras = 0;
let attempts = 0;
let secundaryButtonNumber = 0;
let mainButtonNumber = 0;
textArea.style.visibility = 'hidden';
useRestrictionArea.style.visibility = 'hidden';
mainButton.onclick = mainButtonCase;
secundaryButton.onclick = secundaryButtonCase;
textArea.oninput = verificar;

function verifyWordList () {

    wordsList = predifinedWords;
    concatWordsList = false;
    console.log(wordsList);
        
        if (localStorage.getItem('words') != null) {
            concatWordsList = true;
            console.log(concatWordsList);
        }

        else{
            concatWordsList = false;
            console.log(concatWordsList);
            localStorage.words = ['MARIPOSA'];
            localStorageWordsList = localStorage.words;
            console.log(localStorageWordsList);
            localStorageWordsList = localStorage.words.split(',')
            console.log(localStorageWordsList);
            wordsList = predifinedWords.concat(localStorageWordsList);
            console.log(wordsList);
               
        }
        
    if (concatWordsList === true) {
            localStorageWordsList = localStorage.words;
            console.log(localStorageWordsList);
            localStorageWordsList = localStorage.words.split(',')
            console.log(localStorageWordsList);
            wordsList = predifinedWords.concat(localStorageWordsList);
            console.log(wordsList);
    }
}

function drawLine (lineColor, xinicial, yinicial, xfinal, yfinal) {
    canvas.fillStyle = lineColor;
    canvas.beginPath();
    canvas.moveTo(xinicial, yinicial);
    canvas.lineTo(xfinal, yfinal);
    canvas.stroke();
}

function drawCircle (lineColor, x, y, radius) {
    canvas.fillStyle = lineColor;
    canvas.beginPath();
    canvas.arc(x, y, radius, 0, 2 * 3.14);
    canvas.stroke();
}

function verificar ()
  {
    const verificacion = textArea.value;
    const regex = /^[a-zA-Z\s]*$/;
    const regexVerificado = !regex.test(verificacion);

      regexVerificado ? (text.style.color = 'red',
      text.textContent = 'Ingresa solo letras',
      mainButton.disabled = true,
      secundaryButton.disabled = true):(text.style.color = '#495057',
      text.textContent = 'Max de 8 Letras',
      mainButton.disabled = false,
      secundaryButton.disabled = false);

  }

function localStorageFunction () {
let newWord = textArea.value.toUpperCase();  
console.log(newWord);
let addNewWord = false;

for (let index = 0; index < wordsList.length; index++) {
    if (newWord === wordsList[index] || newWord === '') {
        addNewWord = false;
        console.log(addNewWord);
        break;
    }
    else{
        addNewWord = true;
        console.log(addNewWord);
    }
    
}

     if (addNewWord === true) {
        localStorageWordsList = localStorage.words.split(',');
        console.log(localStorageWordsList);
        localStorageWordsList.push(newWord);
        localStorage.words = localStorageWordsList;
        console.log('AGREGADA LA PALABRA');
        console.log(localStorageWordsList);  
        wordsList = predifinedWords.concat(localStorageWordsList);
        console.log(wordsList);
     }
    
}

function random () {
    return Math.floor(Math.random()*wordsList.length);    
}

function mainButtonCase () {
    switch (mainButtonNumber) {
        case 0:
            mainButtonCase0();
            break;
        
        case 1:
            mainButtonCase0();
            mainButtonNumber = 0;
            localStorageFunction();
            textArea.value = '';
            break;
    
        default:
            break;
    }
    
}

function mainButtonCase0 () {
    
    canvas.clearRect(0, 0, screen.width, screen.height);
    letrasRepetidas = [0];
    aciertos = 0;
    posicionLetras = 0;
    attempts = 0;
    mobileKeyboardHidden.classList.add('mobileKeyboardVisible');
    textArea.style.visibility = 'hidden';
    useRestrictionArea.style.visibility = 'hidden';
    buttonArea.classList.add('buttonsBottom');
    mainButton.classList.add('nuevoJuegoButton');
    mainButton.textContent = 'Nuevo Juego';
    secundaryButton.textContent = 'Desistir';
    secundaryButtonNumber = 1;
    document.addEventListener("keydown", itIsALetter);
    console.log(mobileKeyboard);
    randomWord = wordsList[random()];
    division = randomWord.split('');
    console.log(division);

    let xinicialHorca = screen.width * 0.1;
    let yinicialHorca = screen.height * 0.76
    let xfinalHorca = screen.width * 0.90;
    let yfinalHorca = screen.height * 0.76;
    
    drawLine('black', xinicialHorca, yinicialHorca, xfinalHorca, yfinalHorca);

    let lineNumbers = randomWord.length;
    let anchoNumeroEspacios = screen.width / (lineNumbers * 2);
    let anchoLineas = anchoNumeroEspacios + (anchoNumeroEspacios/2);
    let anchoEspacios = anchoNumeroEspacios - (anchoNumeroEspacios/2);
    let xinicial = 0;
    let yinicial = screen.height * 0.90;
    let xfinal = anchoLineas - anchoLineas;
    let yfinal = screen.height * 0.90;
    
    for (let index = 0; index < lineNumbers; index++) {
            
                xinicial = xfinal + anchoEspacios;
                xfinal = xinicial + anchoLineas;
        
                drawLine('black', xinicial, yinicial, xfinal, yfinal);  
    }

    for (let index = 0; index < mobileKeyboard.length; index++) {
        mobileKeyboard[index].addEventListener('click', tecladoVirtual);
    }

}

function tecladoVirtual(e) {
    letter = e.target.textContent;
    console.log(letter);
    duplicate();
}

function itIsALetter (event) {
    let codigo = event.which;
    letter = String.fromCharCode(codigo);

    if (codigo >= 65 && codigo <= 90) {
        duplicate();
    }
}

function duplicate() {

    let verificar = true;

    for (let index = 1; index < letrasRepetidas.length; index++) {
        if (letter == letrasRepetidas[index]) {
            verificar = false;
            break;
        }
    }
    
    if (verificar == true) {
        letrasRepetidas.push(letter);
        console.log(letrasRepetidas);
        verifyLetter();
    }
}

function verifyLetter () {    

    let drawLetter = false;

    for (let index = 0; index < division.length; index++) {
        
        if (letter == division[index]) {
            drawLetter = true;
            break;
        }
    }
    
    if (drawLetter == true) {
        drawCorrectLetter();
        
    } else {
        drawWrongLetter();
        drawGallows();
    }
}

function drawLetterFunction (textColor, font, texto, xinicial, yinicial) {
    canvas.fillStyle = textColor;
    canvas.font = font;
    canvas.strokeText(texto, xinicial, yinicial);
}

function drawCorrectLetter () {
    
    let lineNumbers = randomWord.length;
    let anchoNumeroEspacios = screen.width / (lineNumbers * 2);
    let anchoLineas = anchoNumeroEspacios + (anchoNumeroEspacios/2);
    let anchoEspacios = anchoNumeroEspacios - (anchoNumeroEspacios/2);
    let xinicial = 0;
    let yinicial = screen.height * 0.88;
    let xfinal = anchoLineas - anchoLineas;

    for (let index = 0; index < division.length; index++) {
        
        if (letter == division[index]) {       
            xinicial = xfinal + anchoEspacios;
            xfinal = xinicial + anchoLineas;
            drawLetterFunction('#0A3871', '2em sans-serif', letter, xinicial, yinicial);
            console.log(canvas);
            aciertos++;
        }

        else {
            xinicial = xfinal + anchoEspacios;
            xfinal = xinicial + anchoLineas;
        }
        
        if (aciertos == lineNumbers) {
            won();
        }

    }
    
}

function drawWrongLetter () {
    
    let lineNumbers = 9;
    let anchoNumeroEspacios = screen.width / (lineNumbers * 2);
    let anchoLetras = anchoNumeroEspacios + (anchoNumeroEspacios/2);
    let anchoEspacios = anchoNumeroEspacios - (anchoNumeroEspacios/2);
    let xinicial = 0;
    let yinicial = screen.height * 0.96;
    
    for (let index = 0; index < division.length; index++) {
        
        if (letter != division[index]) {
            
            xinicial =  anchoEspacios + anchoLetras * (posicionLetras);
            drawLetterFunction('#0A3871', '1.4em sans-serif', letter, xinicial, yinicial);
            posicionLetras++;
            break;
        }       
    }
}

function drawGallows () {
 
            let xinicialTrazo = screen.width;
            let yinicialTrazo = screen.height;
            let xfinalTrazo = screen.width;
            let yfinalTrazo = screen.height;
            let radius = screen.width * 0.1;
    

    switch (attempts) {
        case 0:

            drawLine('black', xinicialTrazo * 0.2, yinicialTrazo * 0.1, xfinalTrazo * 0.2, yfinalTrazo * 0.76);
            attempts++;
            break;
        case 1:

            drawLine('black', xinicialTrazo * 0.2, yinicialTrazo * 0.1, xfinalTrazo * 0.68, yfinalTrazo * 0.1);
            attempts++;
            break;
        case 2:
            drawLine('black', xinicialTrazo * 0.68, yinicialTrazo * 0.1, xfinalTrazo * 0.68, yfinalTrazo * 0.2);
            attempts++;
            break;
         case 3:
            drawCircle('black', xinicialTrazo * 0.68, radius + (yinicialTrazo * 0.2), radius);
            attempts++;
            break;
         case 4:
            drawLine('black', xinicialTrazo * 0.68, (radius * 2) + (yinicialTrazo * 0.2), xfinalTrazo * 0.68, yfinalTrazo * 0.52);
            attempts++;
            break;
         case 5:
            drawLine('black', xinicialTrazo * 0.68, yinicialTrazo * 0.52, xfinalTrazo * 0.58, yfinalTrazo * 0.62);
            attempts++;
            break;
         case 6:
            drawLine('black', xinicialTrazo * 0.68, yinicialTrazo * 0.52, xfinalTrazo * 0.78, yfinalTrazo * 0.62);
            attempts++;
            break;
         case 7:
            drawLine('black', xinicialTrazo * 0.68, yinicialTrazo * 0.42, xfinalTrazo * 0.56, yfinalTrazo * 0.52);
            attempts++;
            break;
         case 8:
            drawLine('black', xinicialTrazo * 0.68, yinicialTrazo * 0.42, xfinalTrazo * 0.82, yfinalTrazo * 0.52);
            attempts++;
            youLost();
            break;
         default:
            break;
    }
}

function youLost () {
    if (attempts == 9) {
        console.log('PERDISTE');
        perdiste.classList.add('perdisteMensaje');
        perdiste.textContent = 'PERDISTE, LA PALABRA CORRECTA ERA ' + '"' + randomWord + '"';
        document.removeEventListener("keydown", itIsALetter);

        
    setTimeout(() =>
    {
      perdiste.classList.remove('perdisteMensaje');
      perdiste.textContent = '';
    }, 5000);

    for (let index = 0; index < mobileKeyboard.length; index++) {
        mobileKeyboard[index].removeEventListener('click', tecladoVirtual);
        
    }

    }
    
   
}

function won () {
    console.log('GANASTE');
    ganaste.classList.add('ganasteMensaje');
    ganaste.textContent = 'GANASTE';
    document.removeEventListener("keydown", itIsALetter);

    setTimeout(() =>
      {
        ganaste.classList.remove('ganasteMensaje');
        ganaste.textContent = '';
      }, 3000);

      for (let index = 0; index < mobileKeyboard.length; index++) {
        mobileKeyboard[index].removeEventListener('click', tecladoVirtual);
        
    }
}

function secundaryButtonCase () {
    
    switch (secundaryButtonNumber) {
        case 0:
        textArea.style.visibility = 'visible';
        useRestrictionArea.style.visibility = 'visible';
        textArea.focus();
        buttonArea.classList.add('buttonsBottom');
        mainButton.classList.add('nuevoJuegoButton');
        mainButton.textContent = 'Guardar y empezar';
        secundaryButton.textContent = 'Cancelar';
        mainButtonNumber = 1;
        secundaryButtonNumber = 1;
            break;

        case 1:
            textArea.style.visibility = 'hidden';
            useRestrictionArea.style.visibility = 'hidden';
            mobileKeyboardHidden.classList.remove('mobileKeyboardVisible');
            buttonArea.classList.replace('buttonsBottom', 'buttonsCenter');
            mainButton.classList.replace('nuevoJuegoButton', 'iniciarJuegoButton');
            mainButton.textContent = 'Iniciar Juego';
            secundaryButton.textContent = 'Agregar nueva palabra';
            canvas.clearRect(0, 0, screen.width, screen.height);
            document.removeEventListener("keydown", itIsALetter);
            secundaryButtonNumber = 0;

            for (let index = 0; index < mobileKeyboard.length; index++) {
                mobileKeyboard[index].removeEventListener('click', tecladoVirtual);
                
            }
            break;
    
        default:
            break;
    }
}