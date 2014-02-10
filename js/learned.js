var learnTheGame = function() {
  states = {};

  states["100000000"] = [undefined,0,0,0,100,0,0,0,0];
  states["110020000"] = [undefined,undefined,100,0,undefined,0,0,0,0];
  states["101020000"] = [undefined,100,undefined,0,undefined,0,0,0,0];
  states["100120000"] = [undefined,0,0,undefined,undefined,0,100,0,0];
  states["100021000"] = [undefined,0,0,0,undefined,undefined,0,0,100];
  states["100020100"] = [undefined,0,0,100,undefined,0,undefined,0,0];
  states["100020010"] = [undefined,0,0,0,undefined,0,0,undefined,100];
  states["100020001"] = [undefined,undefined,0,0,undefined,0,0,100,undefined];

  states["010000000"] = [0,undefined,0,0,100,0,0,0,0];
  states["001000000"] = [0,0,undefined,0,100,0,0,0,0];
  states["000100000"] = [0,0,0,undefined,100,0,0,0,0];
  states["000010000"] = [100,0,0,0,undefined,0,0,0,0];
  states["000001000"] = [0,0,0,0,100,undefined,0,0,0];
  states["000000100"] = [0,0,0,0,100,0,undefined,0,0];
  states["000000010"] = [0,0,0,0,100,0,0,undefined,0];
  states["000000001"] = [0,0,0,0,100,0,0,0,undefined];

  states["100020001"] = [undefined,0,0,0,undefined,0,0,100,undefined];
  states["110020021"] = [undefined,undefined,100,0,undefined,0,0,undefined,undefined];
  states["200011000"] = [undefined,0,0,100,undefined,undefined,0,0,0];
  states["200110000"] = [undefined,0,0,undefined,undefined,100,0,0,0];
  states["200211100"] = [undefined,0,100,undefined,undefined,undefined,undefined,0,0];
  states["201112000"] = [undefined,0,undefined,undefined,undefined,undefined,100,0,0];
  states["200010010"] = [undefined,100,0,0,undefined,0,0,undefined,0];
  states["212211100"] = [undefined,undefined,undefined,undefined,undefined,undefined,undefined,100,0];
  states["221010010"] = [undefined,undefined,undefined,0,undefined,0,100,undefined,0];
  states["221011210"] = [undefined,undefined,undefined,100,undefined,undefined,undefined,undefined,0];
  states["221010211"] = [undefined,undefined,undefined,100,undefined,undefined,undefined,undefined,0];
  states["200010001"] = [undefined,0,0,0,undefined,0,100,0,undefined];
  states["200110201"] = [undefined,0,0,undefined,undefined,100,undefined,0,undefined];
  states["210112201"] = [undefined,undefined,0,undefined,undefined,undefined,undefined,100,undefined];
  states["200112211"] = [undefined,100,0,undefined,undefined,undefined,undefined,undefined,undefined];
  states["201211000"] = [undefined,0,undefined,undefined,undefined,undefined,100,0,0];
  states["210211000"] = [undefined,0,undefined,undefined,undefined,undefined,100,0,0];
  states["200211010"] = [undefined,0,0,undefined,undefined,undefined,100,undefined,0];
  states["200211001"] = [undefined,0,0,undefined,undefined,undefined,100,0,undefined];
  states["210010000"] = [undefined,undefined,0,0,undefined,0,0,100,0];
  states["211010020"] = [undefined,undefined,undefined,0,undefined,0,100,undefined,0];
  states["201010000"] = [undefined,0,undefined,0,undefined,0,100,0,0];
  states["201011200"] = [undefined,0,undefined,100,undefined,undefined,undefined,0,0];
  states["201010201"] = [undefined,0,undefined,100,undefined,0,undefined,0,undefined];
  states["201110200"] = [undefined,0,undefined,undefined,undefined,100,undefined,0,0];
  states["201112210"] = [undefined,100,undefined,undefined,undefined,undefined,undefined,undefined,0];
  states["200010100"] = [undefined,0,100,0,undefined,0,undefined,0,0];
  states["212010100"] = [undefined,undefined,undefined,0,undefined,0,undefined,100,0];
  states["200112100"] = [undefined,0,100,undefined,undefined,undefined,undefined,0,0];
  states["100120000"] = [undefined,0,0,undefined,undefined,0,100,0,0];

  return states;
}