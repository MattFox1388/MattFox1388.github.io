var app = angular.module('calculator',[]);
app.controller('calcCtrl',function(){
  var numberEnteredLast = false;
  this.number = 0;
  this.numArr = [];
  this.opArr = [];
  this.number = 0;
  //checking a num
  this.view = function(num){//add number to stack
    this.number = num;
    this.numArr.push(parseInt(num));
    numberEnteredLast = true;
  }
  this.addOperation = function(char){
    if(numberEnteredLast){
      this.opArr.push(char);
    }
    numberEnteredLast = false;
  }
  this.operation = function(){//complete chain of operations
    while(opArr.length!=0){
      var result = 0;
      var last = numArr.pop();
      var first = numArr.pop();
      var op = opArr.pop();
      switch(op){
        case '+':
          result = last + first;
          
        case '/':
        case '*':
        case '-':

      }
    }
  }
  this.changeSign = function(){

  }
  this.clearStacks = function(){
    this.number = 0;
    for(var i = 0; i<opArr.length;i++){//empty opArr
      opArr.pop();
    }
    for(var i =0; i<numArr.length;i++){//emtpy numArr
      numArr.pop();
    }
    numberEnteredLast = false;
  }
  this.equals = function(){
    if(numArr.length ==2 && opArr.length ==1){
      this.operation();
    }
    numberEnteredLast = false;
  }
});
