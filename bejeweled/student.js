function width(matrix){
    return matrix[0].length;
}
function height(matrix){
    return matrix.length;
}
function isInside(grid, position){
    if(position.x < grid[0].length && position.y < grid.length && position.x > -1 && position.y > -1) {
        return true;
    } else {return false;};
}
function swap(grid, p, q){
    let a = [];
    let b = [];
    let temp = [];
    for (var i = 0; i < grid[0].length; i++){
        for (var j = 0; j < grid.length; j++){
            if (i === p.x && j === p.y){
               a = [j, i];
            }
            if (i === q.x && j == q.y){
                b = [j, i];
            }
        }
    }
    temp = grid[a[0]][a[1]];
    grid[a[0]][a[1]] = grid[b[0]][b[1]];
    grid[b[0]][b[1]] = temp;
}

function horizontalChainAt(grid, position){
    let a = grid[position.y][position.x];
    var count = 0;
    for (var i = 0; i < grid[0].length; i++){
        if (grid[position.y][i] === a){
            count++;
        }
        else return count;
    }
    return count;
}

function verticalChainAt(grid, position){
    let a = grid[position.y][position.x];
    var count = 0;
    for (var i = 0; i < grid.length; i++){
        if (grid[i][position.x] === a){
            count++;
        }
        else return count;
    }
    return count;
}

function removeChains(grid){
    var removed = {};
    for (var i = 0; i < grid.length; i++){   
        for (var j = 0; j < grid[0].length; j++){
            var temp = horizontalChainAt(grid, {x: j, y:i})
            if (temp >= 3){
                var color = grid[i][j];
                if (!removed.hasOwnProperty(color)) removed[color] = temp;
                else removed[color] += temp;
                

            }

            var temp = verticalChainAt(grid,{x: j, y:i});
            if (temp >= 3){
                var color = grid[i][j];
                if (!removed.hasOwnProperty(color)) removed[color] = temp;
                else removed[color] += temp;
                
            }
     
        }
    }
    return removed;
}