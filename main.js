const startButton = document.getElementById('startButton');
const panelButton = document.getElementById('panelButton');
const resultBox = document.getElementById('result');
const resultText = document.getElementById('result-text');
const resultButton = document.getElementById('ok-button');
const levels = 7;
const cells = [];

let colorClass = 'blue';
let size = 4;

let game;

function startCells(){
    for(let i = 1; i < size+1 ; i++){
        cells.push(document.getElementById(i.toString()));
    }
}

startButton.onclick = () => { 
    game = new Game()
};

function togglePanelButton(){
    if(panelButton.classList.contains('hide')){
        panelButton.classList.remove('hide')
    }else{
        panelButton.classList.add('hide')
    }
}

class Game{
    constructor(){
        this.init();        
        setTimeout(() => {
            this.nextLevel();
        }, 500);
    }
    init(){
        startCells();
        this.generateSequence();
        this.pickedColor = this.pickedColor.bind(this);
        this.nextLevel = this.nextLevel.bind(this);
        this.addClicks = this.addClicks.bind(this);
        togglePanelButton();
        this.toggleStartButton();
        this.level = 1;
    }
    toggleStartButton(){
        if(startButton.classList.contains('hide')){
            startButton.classList.remove('hide');
        }else{
            startButton.classList.add('hide');
        }
    }
    generateSequence(){
        this.sequence = new Array(levels).fill(0).map(number => 
            Math.floor(Math.random() * size));    
    }
    nextLevel(){
        this.step = 0;
        this.enlightSequence();
        setTimeout(this.addClicks, this.nivel*1000);
    }
    enlightSequence(){
        for(var i = 0; i < this.level; i++ ){
            let cell = this.sequence[i];
            setTimeout(() => this.enlight(cell), (1000 * i) + 500);
        }
    }
    enlight(cell){
        cells[cell].classList.add(colorClass);
        setTimeout(() => this.de_enlight(cell), 350);
    }
    de_enlight(cell){
        cells[cell].classList.remove(colorClass);
    }
    addClicks(){
        for(let i = 0; i < size; i++){
            cells[i].addEventListener('click', this.pickedColor);
        }
    }
    removeClicks(){
        for(let i = 0; i < size; i++){
            cells[i].removeEventListener('click', this.pickedColor);
        }
    }
    pickedColor(ev){
        const cell = ev.target.id;
        this.enlight(cell-1);
        if(this.sequence[this.step] == cell-1){
            this.step++;
            if(this.step == this.level){
                this.removeClicks();
                this.level++;
                if(this.level-1 == levels){
                    this.victory();
                }else{
                    setTimeout(()=> this.nextLevel(), 1000);
                }
            }
        }else{
            this.removeClicks();
            this.defeat();
        }
    }
    victory(){
        resultText.innerHTML = `Congratulations, you have won the ${levels} levels`;
        resultBox.classList.remove('hide');
    }
    defeat(){
        resultText.innerHTML = `Oh, you lost :(  you got to level ${this.level} `;
        resultBox.classList.remove('hide');
    }
}

resultButton.onclick = () => {
    resultBox.classList.add('hide');
    game.init();
}
