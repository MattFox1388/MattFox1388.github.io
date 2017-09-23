var app = angular.module('calculator',[]);
app.controller('calcCtrl',function(){
  this.number =0;
  this.tempNum = 0;
  this.indicator = 0;//1 => add 2 => minus 3 => multi 4 => divi
  //checking a num
  this.containsNum = function(num){
    if(this.number !== 0 && this.number.toString().length<8){//not zero
      var x = ""+this.number;
      var y = ""+ num;
      return parseFloat(x+y,10);
    }else{//zero
      if(this.number.toString().length<8){
          return num;
      }
      return this.number;
    }
  };
  this.addition = function(){
      this.tempNum = this.number;
      this.number = 0;
      this.indicator = 1;
  };
  this.subtraction = function(){
    this.tempNum = this.number;
    this.number = 0;
    this.indicator = 2;
  };
  this.division = function(){
    this.tempNum = this.number;
    this.number = 0;
    this.indicator = 3;
  };
  this.multiplication = function(){
    this.tempNum = this.number;
    this.number = 0;
    this.indicator = 4;
  };
  //when plus minus sign is pressed
  this.plusMinus = function(){
    if(this.number<0){//neg
      this.number = Math.abs(this.number);
    }else{
      this.number = -Math.abs(this.number);
    }
  };
  this.error = function(){
    this.number = 0;
    this.tempNum = 0;
    window.alert("Value too big!");
  };
  //check if button already pressed
  this.chain = function(){
    
  };
  //when equals sign is pressed
  this.equals = function(){
    switch(this.indicator){
      case 1:
          if((this.number + this.tempNum).toString().length >8 ){
              this.error();
          }else{
              this.number += this.tempNum;
          }
          break;
      case 2:
          if((this.number - this.tempNum).toString().length >8 ){
              this.error();
          }else{
              this.number -= this.tempNum;
          }
          break;
      case 3:
          if((this.number / this.tempNum).toString().length >8 ){
              this.error();
          }else{
              this.number /= this.tempNum;
          }
          break;
      case 4:
          if((this.number * this.tempNum).toString().length >8 ){
            this.error();
          }else{
              this.number *= this.tempNum;
          }
          break;
      default:

    }
  };

});
