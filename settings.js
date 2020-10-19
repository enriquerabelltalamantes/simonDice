const cellTemplate = '<div class="cell" id="/i"></div>';
const container = document.getElementById('container');
const panel = document.getElementById('panel');
const colorButtons = [
    document.getElementById('blue'), document.getElementById('pink'), 
    document.getElementById('orange'), document.getElementById('green')];

const columnTemplate = "repeat(columns, minmax(4rem, 10rem))";

let sizeButtons = [];
(() => {
    for(let i = 0; i < 5; i++){
        sizeButtons.push(document.getElementById(`difficulty${i+2}`));
    } 
})()

function togglePanel(){
    if(panel.classList.contains('hide')){
        panel.classList.remove('hide')
    }else{
        panel.classList.add('hide')
    }
}
panelButton.onclick = () =>{
    togglePanel();
}

class Size{
    replaceGrid(columns){
        let value = columnTemplate.replace("columns", columns);
        container.style.gridTemplateColumns = value ;
        container.style.gridTemplateRows = value; 
    }
    activateCell(number){
        let cell = document.getElementById(`${number}`);
        cell.classList.remove('hide');
    }
    deActivateCell(number){
        let cell = document.getElementById(`${number}`);
        cell.classList.add('hide');
    }
    activateCells(first, last, deActivate){
        if(deActivate){
            for(let i = first; i < last+1; i++){
                this.deActivateCell(i);
            }
        }else{
            for(let i = first; i < last+1; i++){
                this.activateCell(i);
            }
        }
    }
    setBoard(columns){
        if(columns > 1 && columns < 7){
            this.replaceGrid(columns);
            let lastCell = columns * columns;
            this.activateCells(5, 36, true);
            if(lastCell > 4){
                this.activateCells(5, lastCell);
            }
        }
    }
}

const sizeController = new Size();

const initButtons = () => {
    for(let i = 0; i < 5 ; i++){
        sizeButtons[i].onclick = () => {
            size = (i+2) * (i+2)
            sizeController.setBoard(i+2);
        }
    }
    colorButtons[0].onclick = () =>{
        colorClass = 'blue';
    };
    colorButtons[1].onclick = () =>{
        colorClass = 'pink';
    };
    colorButtons[2].onclick = () =>{
        colorClass = 'orange';
    };
    colorButtons[3].onclick = () =>{
        colorClass = 'green';
    };
}
initButtons();