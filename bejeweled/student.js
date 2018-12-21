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

    var color = grid[position.y][position.x];
    var chain = 0;
    var longestChain = 0;

    for (i = 0; i < grid.length; i++) {
        if (grid[i][position.x] === color) {
            chain++;
            if (i === grid.length - 1) {
                longestChain = chain;
            }
        } else {if (longestChain < chain) {longestChain = chain}; chain = 0;}
    }

    /*if (longestChain >= 3) {
        return longestChain
    } else {return 0;}*/

    return longestChain;
}

function removeChains(grid) {
    const positions = [];
    const result = {};
    const w = width(grid);
    const h = height(grid);

    for (let y = 0; y !== h; ++y) {
        let x = 0;
        while (x < w) {
            const horLength = horizontalChainAt(grid, { x, y });
            if (horLength > 2) {
                for (let i = 0; i !== horLength; ++i) {
                    positions.push({ x: x + i, y });
                }
            }
            x += horLength;
        }
    }

    for (let x = 0; x !== w; ++x) {
        let y = 0;
        while (y < h) {
            const verLength = verticalChainAt(grid, { x, y });
            if (verLength > 2) {
                for (let i = 0; i !== verLength; ++i) {
                    positions.push({ x, y: y + i });
                }
            }
            y += verLength;
        }
    }

    for (const position of positions) {
        const { x, y } = position;
        const color = grid[y][x];
        result[color] = (result[color] || 0) + 1;
    }

    for (const { x, y } of positions) {
        grid[y][x] = '';
    }

    return result;
}