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

var str = [055, 2, '*']
var num = calculatePostfix(str);
console.log(num);