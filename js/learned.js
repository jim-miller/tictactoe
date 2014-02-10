var learnTheGame = function() {
  var states;
  
  if (localStorage.getItem("ticTacToeStrategies")) {
    states = JSON.parse(localStorage.getItem("ticTacToeStrategies"));
  } else {
    
    states = {};

    states["100000000"] = [undefined,0,0,0,100,0,0,0,0];
    states["010000000"] = [0,undefined,0,0,100,0,0,0,0];
    states["001000000"] = [0,0,undefined,0,100,0,0,0,0];
    states["000100000"] = [0,0,0,undefined,100,0,0,0,0];
    states["000010000"] = [100,0,0,0,undefined,0,0,0,0];
    states["000001000"] = [0,0,0,0,100,undefined,0,0,0];
    states["000000100"] = [0,0,0,0,100,0,undefined,0,0];
    states["000000010"] = [0,0,0,0,100,0,0,undefined,0];
    states["000000001"] = [0,0,0,0,100,0,0,0,undefined];
  
    states["110020000"] = [undefined,undefined,100,0,undefined,0,0,0,0];
    states["101020000"] = [undefined,100,undefined,0,undefined,0,0,0,0];
    states["100120000"] = [undefined,0,0,undefined,undefined,0,100,0,0];
    states["100021000"] = [undefined,0,0,0,undefined,undefined,0,0,100];
    states["100020100"] = [undefined,0,0,100,undefined,0,undefined,0,0];
    states["100020010"] = [undefined,0,0,0,undefined,0,0,undefined,100];
    states["100020001"] = [undefined,0,0,0,undefined,0,0,100,undefined];

    states["011020000"] = [100,undefined,undefined,0,undefined,0,0,0,0];
    states["010120000"] = [100,undefined,0,undefined,undefined,0,0,0,0];
    states["010021000"] = [0,undefined,100,0,undefined,undefined,0,0,0];
    states["010020100"] = [0,undefined,100,0,undefined,0,undefined,0,0];
    states["010020010"] = [0,undefined,0,0,undefined,100,0,undefined,0];
    states["010020001"] = [100,undefined,0,0,undefined,0,0,0,undefined];
  
    states["001120000"] = [0,0,undefined,undefined,undefined,0,100,0,0];
    states["001021000"] = [0,0,undefined,0,undefined,undefined,0,0,100];
    states["001020100"] = [0,0,undefined,100,undefined,0,undefined,0,0];
    states["001020010"] = [0,0,undefined,0,undefined,0,100,undefined,0];
    states["001020001"] = [0,0,undefined,0,undefined,100,0,0,undefined];
  
    states["000121000"] = [0,100,0,undefined,undefined,undefined,0,0,0];
    states["000120100"] = [100,0,0,undefined,undefined,0,undefined,0,0];
    states["000120010"] = [0,0,0,undefined,undefined,0,100,undefined,0];
    states["000120001"] = [100,0,0,undefined,undefined,0,0,0,undefined];
  
    states["000021100"] = [0,0,100,0,undefined,undefined,undefined,0,0];
    states["000021010"] = [0,0,0,0,undefined,undefined,0,undefined,100];
    states["000021001"] = [0,0,100,0,undefined,undefined,0,0,undefined];
  
    states["000020110"] = [0,0,0,0,undefined,0,undefined,undefined,100];
    states["000020101"] = [0,0,0,0,undefined,0,undefined,100,undefined];
  
    states["000020011"] = [0,0,0,0,undefined,0,100,undefined,undefined];
  
    states["210010000"] = [undefined,undefined,0,0,undefined,0,0,100,0];
    states["201010000"] = [undefined,0,undefined,0,undefined,0,100,0,0];
    states["200110000"] = [undefined,0,0,undefined,undefined,100,0,0,0];
    states["200011000"] = [undefined,0,0,100,undefined,undefined,0,0,0];
    states["200010100"] = [undefined,0,100,0,undefined,0,undefined,0,0];
    states["200010010"] = [undefined,100,0,0,undefined,0,0,undefined,0];
    states["200010001"] = [undefined,0,0,0,undefined,0,100,0,undefined];
  
    states["211010020"] = [undefined,undefined,undefined,0,undefined,0,100,undefined,0];
    states["210110020"] = [undefined,undefined,0,undefined,undefined,100,0,undefined,0];
    states["210011020"] = [undefined,undefined,0,100,undefined,undefined,0,undefined,0];
    states["210010120"] = [undefined,undefined,100,0,undefined,0,undefined,undefined,0];
    states["210010021"] = [undefined,undefined,0,0,undefined,100,0,undefined,undefined];
    //
    states["210211000"] = [undefined,0,undefined,undefined,undefined,undefined,100,0,0];
    states["200211100"] = [undefined,0,100,undefined,undefined,undefined,undefined,0,0];
    //
    states["201112000"] = [undefined,0,undefined,undefined,undefined,undefined,100,0,0];
    states["221010010"] = [undefined,undefined,undefined,0,undefined,0,100,undefined,0];
    states["200110201"] = [undefined,0,0,undefined,undefined,100,undefined,0,undefined];
    states["201211000"] = [undefined,0,undefined,undefined,undefined,undefined,100,0,0];
    states["200211001"] = [undefined,0,0,undefined,undefined,undefined,100,0,undefined];
    states["200211010"] = [undefined,0,0,undefined,undefined,undefined,100,undefined,0];
    states["212010100"] = [undefined,undefined,undefined,0,undefined,0,undefined,100,0];
    states["201110200"] = [undefined,0,undefined,undefined,undefined,100,undefined,0,0];
    states["200112100"] = [undefined,0,100,undefined,undefined,undefined,undefined,0,0];
    states["201010201"] = [undefined,0,undefined,100,undefined,0,undefined,0,undefined];
    states["201011200"] = [undefined,0,undefined,100,undefined,undefined,undefined,0,0];
  
    states["110020021"] = [undefined,undefined,100,0,undefined,0,0,undefined,undefined];
  
    states["212211100"] = [undefined,undefined,undefined,undefined,undefined,undefined,undefined,100,0];
    states["221011210"] = [undefined,undefined,undefined,100,undefined,undefined,undefined,undefined,0];
    states["221010211"] = [undefined,undefined,undefined,100,undefined,undefined,undefined,undefined,0];
    states["210112201"] = [undefined,undefined,0,undefined,undefined,undefined,undefined,100,undefined];
    states["200112211"] = [undefined,100,0,undefined,undefined,undefined,undefined,undefined,undefined];
    states["201112210"] = [undefined,100,undefined,undefined,undefined,undefined,undefined,undefined,0];
  }
  return states;
}