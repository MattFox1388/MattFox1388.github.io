var app = angular.module('calculator',[]);
app.controller('calcCtrl',function(){
  var numberEnteredLast = false;
  var unused = true;
  this.str = '0';
  var unorderedList = [];
  /*
  * This method takes a number and 
  * adds the number into the expression
  * string
  */
  this.view = function(num){//add number to stack
    if(this.str.length<=15){
      if(unused){
        this.str = num.toString();
        unused = false;
      }else{
        this.str = this.str.concat(num.toString());
      }
      unorderedList.push()
      numberEnteredLast = true;
    }
  }
  function pushLastNum(str){
    var startIndex = 0;
    var arr = str.split('')
    for(var i = arr.length-1;i>=0;i--){
      if(isNaN(arr[i])){//not a number then get index
        if((i === 0 && arr[i] === '-') || arr[i] === '.'){
          break;
        }
        startIndex = i+1;
        break;
      }//if it is a number then skip
    }
    return startIndex;
  }
  /* 
  * This method takes a char and
  * uses it to add a operation sign 
  * onto the expression
  */
  this.addOperation = function(char){
    if(this.str.length<=15){
      if(numberEnteredLast){
        //TODO: add previous number to unorderedList
        startIndex = pushLastNum(this.str);
        unorderedList.push(this.str.substring(startIndex));
        this.str =  this.str.concat(char.toString());
         unorderedList.push(char);
       }
       numberEnteredLast = false;
       unused = false;
    }
  }
  /*
  * This methods resembles the
  * clear function on the calculator
  * essentially clearing all
  * the fields.
  */
  this.clearStacks = function(){
    numberEnteredLast = false;
    unused = true;
    this.str = '0';
    calculationStk = [];
    unorderedList = [];
  }
  this.equals = function(){
    //get unorderedList from string
    console.log("original string:" + this.str);
    //postfix
    startIndex = pushLastNum(this.str);
    unorderedList.push(this.str.substring(startIndex));
    console.log('UnorderedList: ' + unorderedList);
    var array = postfix(unorderedList);
    //calculate postfix
    console.log("unorderedList Postfix: "  + array);
    var newStr = calculatePostfix(array);
    console.log(newStr);
    numberEnteredLast = false;
    unused = true;
    this.str = '0';
    calculationStk = [];
    unorderedList = [];
    this.view(Number(newStr));
    this.str = Number(this.str).toString();
  }
  //helper methods for equals
  /*postfix assembler
  * This methods rearranges the code into 
  * a reverse polish notation also known as 
  * postfix 
  * Returns a string of polish notation
  */
  function postfix(arr){
    var calculationStk = [];
    var newArr = [];
    var num = arr[arr.length-1];
    if(isNaN(num)){//not a number so pop off extra
      arr.pop();
    }
    for(var i = 0;i<arr.length;i++){
     var elem = arr[i];
     if(!isNaN(elem)){//is a number so immediately to postfix
        newArr.push(elem);
     }else{//not a number
      if(0===calculationStk.length){//empty stack
        calculationStk.push(elem);
      }else{//not an empty stack
        if((elem === "-" || elem === "+") && (calculationStk[calculationStk.length-1] === '*' || calculationStk[calculationStk.length-1] === '/' )){//lower precedence ** pop all then push **
         while(calculationStk.length!==0){
             newArr.push(calculationStk.pop());
         }
          calculationStk.push(elem);
        }else{//higher precedence **
          calculationStk.push(elem);
        }
      }
     }
    }
    //pop remaining stack elements
    while(calculationStk.length!==0){
        newArr.push(calculationStk.pop());
    }
    return newArr;
  }
  /*Postfix calculator
  * This methods takes the postfix
  * expression, and it calculates it
  * into one number.
  * eturns a number in string format
  */
  function calculatePostfix(arr){
    var numberStk = [];
    var firstNum;
    var secondNum;
    for(var i =0;i<arr.length;i++){
      var elem = arr[i];
      if(!isNaN(elem)){//element is a number
        numberStk.push(elem);
      }else{//element is not number
        secondNum = numberStk.pop();
        firstNum = numberStk.pop();
        numberStk.push(eval(firstNum + ' ' + elem + ' ' + secondNum));
      }
    }
    return numberStk.pop();
  }
});
