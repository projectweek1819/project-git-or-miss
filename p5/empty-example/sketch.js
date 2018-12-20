var s = function( p ) {
  p.grid = [];


  p.setup = function() {
    p.createCanvas(500,500);
    p.createGrid();
    p.validateGrid();
  };

  p.randomColor = function(){
    colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff33ff'];
    var rand = colors[Math.floor(Math.random() * colors.length)];
    return rand;
  };
  
  p.draw = function() {
    p.background(10000);
    for (var x = 0; x < p.grid[0].length; x++) {
      for (var y = 0; y < p.grid.length; y++) {
        p.ellipse(x*100+60, y*100+60, 60,60);
        p.fill(p.grid[y][x].color);
       
      }
    }
  };

  
  p.createGrid = function(){
    let a = [];    
    for (var x = 0; x < 5; x++) {
      let row = [];
      for (var y = 0; y < 5; y++) {
        let temp = {position : {x, y}, color : p.randomColor()};
        row.push(temp);
      }
      a.push(row);
    }
    p.grid = JSON.parse(JSON.stringify(a));
  };

  p.validateGrid = function(){
 /*   let a = JSON.parse(JSON.stringify(p.grid));
    let row0= a[0];
    let row1= a[1];
    let row2= a[2];
    let row3= a[3];
    let row4= a[4];
    for (var i = 0; i <row0.length; i++){
      var count = 0;
      if (row0[i].color === row0[i+1].color){
        count++;
        for (var j = 1; j + i < row0.length; j++){
          if (row0[i].color === row0[i+1+j].color){
            count++;
          }
        }
        if (count >= 3){

        }

      }
    }*/

  };

};

var myp5 = new p5(s);

