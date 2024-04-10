class ControleCalculadora {
    constructor() {
      this.displayCalcEL = document.getElementById("display");
      this.displayHoraEL = document.getElementById("hora");
      this.displayDataEL = document.getElementById("data");
      this.regiao = "pt-br"
      this.inicializar();
      this.iniciaBotaoEventos();
      this.operacao = [];
    }
  
    inicializar() {
      this.displayCalc = "0";
      setInterval(() => {
        this.displayHora = new Date().toLocaleTimeString(this.regiao)
        this.displayData = new Date().toLocaleDateString(this.regiao)
      }, 1000);
    }
  
    setaErro() {
      console.log("ERRO")
      this.displayCalc = "Erro"
    }
  
    limpaTudo() {
      this.operacao = [];
      this.displayCalc="0"
      console.log(this.operacao)
    }
  
    limpaUltimo() {
      this.operacao.pop();
      console.log(this.operacao)
      if(this.ultimoOperador()){
        this.operacao.pop();
        console.log(this.operacao)
        this.ultimoNumeroDisplay()
      }
      if(this.operacao[0] == null){
        this.displayCalc = "0"
      }
    }
  
    // Pega o ultima tecla digitada
    ultimoOperador() {
      return this.operacao[this.operacao.length - 1]
  
    }
  
    // Verifica se o que foi digitado e um sinal 
    verificaOperador(valor) {
      return ["+", "-", "*", "/", "%"].indexOf(valor) > -1
    }
  
    // Volta um valor no array, para trocar o sinal ou colocar o novo valor concatenado
    setaUltimaOperacao(valor) {
      this.operacao[this.operacao.length - 1] = valor
    }
    /*********************************************/
    adicionaPonto(){
      let ultimo = this.ultimoOperador()
      if(this.verificaOperador(ultimo) || !ultimo){
        this.operacao.push("0.")
      }else{
        this.setaUltimaOperacao(ultimo.toString()+ ".")
      }
      console.log(ultimo)
      this.ultimoNumeroDisplay()
    }
    /*********************************************/
   
    calcular(){
      let ultima = ''
      if(this.operacao.length >3){
        ultima = this.operacao.pop()
      }
      let resultado =eval(this.operacao.join(""))
      if(ultima =="%"){
        resultado = resultado/100
        this.operacao=[resultado]
      }else{
        this.operacao=[resultado]
        if(ultima){
          this.operacao.push(ultima)
        }
        console.log(this.operacao)
      }
      this.ultimoNumeroDisplay()
    }

 /*********************************************/
  
    ultimoNumeroDisplay(){
      for(let i= this.operacao.length -1; i >=0; i--){
        console.log(i)
        if(!this.verificaOperador(this.operacao[i])){
        var ultimonumero= this.operacao[i]
        console.log(this.operacao[i])
         break
        }
      }
      this.displayCalc= ultimonumero
    }
  
    adicionaOperacao(valor) {
      if (isNaN(this.ultimoOperador())) {
        if (this.verificaOperador(valor) || (valor == null)) {
          this.setaUltimaOperacao(valor)
        } else {
          this.operacao.push(valor)
          if(this.operacao.length > 3){
           this.calcular()
          }
          this.ultimoNumeroDisplay()
        }
      } else {
        if(this.verificaOperador(valor)){
          this.operacao.push(valor)
          if(this.operacao.length > 3){
           this.calcular()
         }
         this.ultimoNumeroDisplay()
        }else{
          let novovalor=this.ultimoOperador().toString() + valor.toString()
          this.setaUltimaOperacao(parseFloat(novovalor))
          this.ultimoNumeroDisplay()
        }
  
      }
    }
  
  
  
    execBtn(valor) {
      switch (valor) {
        case "ac":
          this.limpaTudo();
          break
  
        case "ce":
          this.limpaUltimo();
          break
  
        case "porcento":
          this.adicionaOperacao("%");
          break
  
        case "divisao":
          this.adicionaOperacao("/");
          break
  
        case "multiplicacao":
          this.adicionaOperacao("*");
          break
  
        case "subtracao":
          this.adicionaOperacao("-");
          break
  
        case "soma":
          this.adicionaOperacao("+");
          break
  
        case "igual":
          this.calcular();
          break
  
        case "ponto":
          this.adicionaPonto(".");
          break
  
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          this.adicionaOperacao(parseInt(valor));
          break
        default:
          this.setaErro();
          break
      }
  
    }
  
    iniciaBotaoEventos() {
      let botao = document.querySelectorAll("#buttons>g,#parts>g");
      botao.forEach(btn => {
        btn.addEventListener("click", () => {
          let textBtn = btn.className.baseVal.replace("btn-", "");
          this.execBtn(textBtn);
        });
  
        btn.addEventListener("mouseover", () => {
          btn.style.cursor = "pointer";
        })
  
      });
  
  
    }
  
    get displayCalc() {
      return this.displayCalcEL.innerHTML
    }
  
    set displayCalc(valor) {
      return this.displayCalcEL.innerHTML = valor
    }
  
    get displayHora() {
      return this.displayHoraEL.innerHTML
    }
  
    set displayHora(valor) {
      return this.displayHoraEL.innerHTML = valor
    }
    get displayData() {
      return this.displayDataEL.innerHTML
    }
  
    set displayData(valor) {
      return this.displayDataEL.innerHTML = valor
    }
  
  }