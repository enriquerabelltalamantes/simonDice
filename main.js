const textoNivel = document.getElementById('textoNivel');
const btnEmpezar = document.getElementById('btnEmpezar');
const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const ultimoNivel = 15;

class Juego{
    constructor(){
        this.inicializar();        
        setTimeout(() => {
            this.siguienteNivel();
        }, 500);
    }
    inicializar(){
        this.generarSecuencia();
        this.elegirColor = this.elegirColor.bind(this);
        this.siguienteNivel = this.siguienteNivel.bind(this);
        this.agregarClicks = this.agregarClicks.bind(this);
        this.toggleBtnEmpezar();
        this.nivel = 1;
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde,
        }
    }
    toggleBtnEmpezar(){
        if(btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide');
        }else{
            btnEmpezar.classList.add('hide');
        }
    }
    generarSecuencia(){
        this.secuencia = new Array(ultimoNivel).fill(0).map(number => 
            Math.floor(Math.random() * 4));
        
        
    }
    siguienteNivel(){
        this.subnivel = 0;
        this.actualizarNivel();
        this.iluminarSecuencia();
        setTimeout(this.agregarClicks, this.nivel*1000);
    }
    actualizarNivel(){
        let nivelMostrado = this.maxClamp(this.nivel, ultimoNivel);
        textoNivel.innerHTML = `Nivel actual: ${nivelMostrado}`;
    }
    maxClamp(numero, maximo){
        if(numero > maximo){
            return maximo
        }else {
            return numero
        }
    }
    numeroAColor(numero){
        switch(numero){
            case 0:
                return 'celeste';
            case 1: 
                return 'violeta';
            case 2:
                return 'naranja';
            case 3:
                return 'verde';
        }
    }
    colorANumero(color){
        switch(color){
            case 'celeste':
                return 0;
            case 'violeta': 
                return 1;
            case 'naranja':
                return 2;
            case 'verde':
                return 3;
        }
    }
    iluminarSecuencia(){
        for(var i = 0;i < this.nivel; i++ ){
            let color = this.numeroAColor(this.secuencia[i]);
            setTimeout(() => this.iluminarColor(color), 1000 * i);
        }
    }
    iluminarColor(color){
        this.colores[color].classList.add('light');
        setTimeout(() => this.apagarColor(color), 350);
    }
    apagarColor(color){
        this.colores[color].classList.remove('light');
    }
    agregarClicks(){
        this.colores.celeste.addEventListener('click', this.elegirColor);
        this.colores.verde.addEventListener('click', this.elegirColor);
        this.colores.violeta.addEventListener('click', this.elegirColor);
        this.colores.naranja.addEventListener('click', this.elegirColor);
    }
    eliminarClicks(){
        this.colores.celeste.removeEventListener('click', this.elegirColor);
        this.colores.verde.removeEventListener('click', this.elegirColor);
        this.colores.violeta.removeEventListener('click', this.elegirColor);
        this.colores.naranja.removeEventListener('click', this.elegirColor);
    }
    elegirColor(ev){
        const nombreColor = ev.target.dataset.color;
        const numeroColor = this.colorANumero(nombreColor);
        this.iluminarColor(nombreColor);
        if(numeroColor == this.secuencia[this.subnivel]){
            this.subnivel++;
            if(this.subnivel === this.nivel){
                this.nivel++;
                this.eliminarClicks();
                if(this.nivel === (ultimoNivel + 1)){
                    this.victory();
                }else{
                    setTimeout(this.siguienteNivel, 1500);
                }
            }

        }else {
            this.defeat();
        }
    }
    victory(){
        swal('Felicitaciones', `Ganaste, pasaste los ${ultimoNivel} niveles :)`, 'success')
        .then(() => {
            this.inicializar();
        });
    }
    defeat(){
        swal('Lo siento', `Has perdido :(, llegaste al ${this.nivel} nivel`, 'error')
        .then(() => {
            this.eliminarClicks();
            this.inicializar();
        });
    }
}
const empezarJuego = () =>{
    let juego = new Juego();
}