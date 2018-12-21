var s = function( p ) {
  p.grid = [];


  p.setup = function() {
    p.createCanvas(600,500);
    p.createGrid();
  };

  p.isInside = function(position){
    if(position.x < p.grid[0].length && position.y < p.grid.length && position.x > -1 && position.y > -1) {
        return true;
    } else {return false;};
}
  p.randomColor = function(){
    colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff33ff'];
    var rand = colors[Math.floor(Math.random() * colors.length)];
    return rand;
  };
  
 
  
  p.gridPosition = function(valueX, valueY){
    console.log(valueX, valueY)
    if  (valueX <0.3 && valueX > -0.3){
      gridX = 0;
    } 
    else if (0.7 < valueX && valueX <1.3) {
      gridX = 1;
    }
    else if (1.7 <= valueX && valueX <2.3){
      gridX = 2;
    } 
    else if (2.7 <= valueX && valueX <3.3){
      gridX = 3;
    } 
    else if (3.7 <= valueX && valueX <4.3){
      gridX = 4;
    } 
    else {
      gridX = null;
    }
    if (-0.3 <= valueY && valueY <0.3) gridY = 0;
    else if (0.7 <= valueY && valueY  <1.3) gridY = 1;
    else if (1.7 <= valueY && valueY <2.3) gridY = 2;
    else if (2.7 <= valueY && valueY <3.3) gridY = 3;
    else if (3.7 <= valueY && valueY <4.3) gridY = 4;
    else {
      gridY =null;
    }
    return {x: gridX, y: gridY}    
  }
  p.draw = function() {
    p.background(0);
    for (var y = 0; y < p.grid.length; y++) {
      for (var x = 0; x < p.grid[0].length; x++) {
        p.fill(p.grid[y][x].color);
        p.ellipse(x*100+60, y*100+60, 60,60);
        
      }
    }
  };

  p.mousePressed = function() {
    mousePos=p.gridPosition((p.mouseX-60)/100,(p.mouseY-60)/100)
    if (mousePos.x == null || mousePos.y == null){
      return;
    }
    else{
      p.grid[mousePos.y][mousePos.x].clicked = true;
    }
    p.checkSwap();
    p.validateGame();
  }

  p.validateGame = function(){
    for (i = 0; i < p.grid.length; i++) {
      for (j = 0; i < p.grid[0].length; j++) {
        vert = p.verticalChain({x: j , y:i});
        if (vert >=3){
          p.removeChains({x: j , y:i}, "ver", vert)
        } 
        hori = p.horizontalChain({x: j , y:i});
        if (hori>=3){
          p.removeChains({x: j , y:i}, "hor", hori)
        } 
      }
    }
  }

  p.removeChains = function(position, direction, length){
    if (direction === "hor"){
      console.log(position, direction, length)
    }
    else if (direction === "ver"){

    }

  }

  p.verticalChain = function(position){
    console.log(p.grid)
    console.log(p.grid[position.y])
    var color = p.grid[position.y][position.x].color;
    var chain = 0;
    var longestChain = 0;

    for (i = 0; i < p.grid.length; i++) {
        if (p.grid[i][position.x].color === color) {
            chain++;
            if (i === p.grid.length - 1) {
                longestChain = chain;
            }
        } else {if (longestChain < chain) {longestChain = chain}; chain = 0;}
  
      }    
      return longestChain;
  }

  p.horizontalChain = function(position){
    console.log(p.grid)
    console.log(p.grid[position.y])
    var color = p.grid[position.y][position.x].color;
    var chain = 0;
    var longestChain = 0;

    for (i = 0; i < p.grid[0].length; i++) {
        if (p.grid[position.y][i].color === color) {
            chain++;
            if (i === p.grid[0].length - 1) {
                longestChain = chain;
            }
        } else {if (longestChain < chain) {longestChain = chain}; chain = 0;}
  
      }    
      return longestChain;
    }

  p.createGrid = function(){
    let a = [];    
    for (var y = 0; y < 5; y++) {
      let row = [];
      for (var x = 0; x < 5; x++) {
        let temp = {position : {x, y}, color : p.randomColor(), clicked:false};
        row.push(temp);
      }
      console.log(row);
      a.push(row);
    }
    p.grid = JSON.parse(JSON.stringify(a));
  };

  p.checkSwap = function(){
    var count = 0;
    let counted = [];
    for (var y = 0; y < 5; y++) {
      for (var x = 0; x < 5; x++) {
        if(p.grid[y][x].clicked){
          count++;
          counted.push(p.grid[y][x])
        }
      }
    }
    if (count ===2){
      counted[0].clicked = false;
      counted[1].clicked = false;
      if (counted[0].position.x  === counted[1].position.x + 1 &&  counted[0].position.y  === counted[1].position.y 
        ||counted[0].position.x  === counted[1].position.x - 1 &&  counted[0].position.y  === counted[1].position.y 
        || counted[0].position.y  === counted[1].position.y + 1 &&  counted[0].position.x  === counted[1].position.x 
        || counted[0].position.y  === counted[1].position.y - 1 &&  counted[0].position.x  === counted[1].position.x ){
        p.swap(counted[0], counted[1]);
      }
      else return;
      
    }
  }
  p.swap = function(p1, p2){
    temp = p1.color;
    p1.color = p2.color;
    p2.color = temp;
    p.draw();
  }

};

var myp5 = new p5(s);


