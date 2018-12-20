function onMouseDown(state, args){
    return state + 1;
}

function onMouseDown2(state, args) {
    let count = {count: state.count +1};
    return count;
}


function counter3(){
    function onMouseDown(state, args) {
        let count = {count: state.count +1};
        return count;
    }
    return {controller : { onMouseDown }};
}

function counter4(){
    function onMouseDown(state, args) {
        let count = {count: state.count +1};
        return count;
    }
    function onKeyDown(state, args) {
        let count = {count : 0};
        return count;
    }
    return {controller : { onMouseDown, onKeyDown }};
}
function counter5(){
    function onMouseDown(state, args) {
        let count = {count: state.count};
        if (args.shift == false) {
            count.count ++;
        }
        else {
            if (count.count >=1) {
                count.count--;
            }
        }
        return count;
    }
    function onKeyDown(state, args) {
        let count = {count : state.count};
        if (args.key == "ArrowUp"){
            count.count++;
        }
        if (args.key == "ArrowDown"){
            if (count.count >= 1){
                count.count--;
            }
        }
        if (args.key == "0"){
            count.count= 0;
        }
        return count;
    }
    return {controller : { onMouseDown, onKeyDown }};
}
function counter6() {
    function increment(state) {
        return {count: state.count +1};
    }
    function decrement(state) {
        if (state.count >= 1){
            return {count: state.count -1};
        }
        else return {count: state.count};
    }
    function reset(state) {
        let temp = state.count;
        return {count: temp.count = 0};
    }
    function onMouseDown(state, args) {
        if (args.shift == false){
            return increment(state);
        }
        else return  decrement(state);

    }
    function onKeyDown(state, args) {
        if (args.key == "0"){
            return reset(state);
        }
        else if (args.key == " "){
            return increment(state);
        }
        else if (args.key == "ArrowUp"){
            return increment(state);
        }
        else if (args.key == "ArrowDown"){
            return decrement(state);
        }
        else return {count: state.count};
    }
    const controller = {onMouseDown, onKeyDown};
    const model = {increment, decrement, reset};
    return {controller, model};
}


function chronometer(){
    function timePassed(state, dt){
        return {elapsedTime: state.elapsedTime + dt};
    }
    const model = {timePassed};

    return {model};
}

function circle() {
    function render(state) {
        let circle = {type: "circle",
            center: {x: 100, y:100},
            radius: 10,
            color: "red"
        };
        return [circle];
    }
    const view = {render};
    return {view};

}
function circle2() {
    function render(state) {
        let circle = {type: "circle",
            center: state.position,
            radius: 10,
            color: "red"
        };
        return [circle];
    }

    function moveTo(state, position) {
        let pos = {position : position};
        return pos;

    }
    function onMouseDown(state, args) {
        return moveTo(state, args.position);
    }

    const view = {render};
    const model = {moveTo};
    const controller = {onMouseDown};
    return {view, model, controller};

}
function circle3() {
    function render(state) {
        let circle = {type: "circle",
            center: state.position,
            radius: 10,
            color: "red"
        };
        return [circle];
    }

    function moveTo(state, position) {
        let pos = {position : position};
        return pos;

    }
    function onMouseMove(state, args) {
        return moveTo(state, args.position);
    }

    const view = {render};
    const model = {moveTo};
    const controller = {onMouseMove};
    return {view, model, controller};
}

function drawing() {

    function moveTo(state, position) {
        let t = JSON.parse(JSON.stringify(state))
        let temp = {position: position, dots: state.dots, addMode: state.addMode};
        if (state.addMode){
            t.dots.push(position);
            return {position: position, dots: t.dots, addMode: state.addMode};
        }

        return temp;
    }
    
    function setAddMode(state, addMode) {
        let temp ={position: state.position, dots: state.dots, addMode: addMode};
        return temp;
    }

    function onMouseMove(state, args) {
        return moveTo(state, args.position)
    }
    
    function onMouseDown(state, args) {
        return setAddMode(state, true)
    }
    function onMouseUp(state, args) {
        return setAddMode(state, false)
    }

    function render(state) {
        if (state.addMode) {
            let circle = {
                type: "circle",
                center: state.position,
                radius: 2,
                color: "red"
            };
            return [circle];
        }
        else {
            let circle = {
                type: "circle",
                center: state.position,
                radius: 5,
                color: "red"
            };
            return [circle];
        }

    }

    const view = {render};
    const model = {moveTo, setAddMode};
    const controller = {onMouseDown, onMouseUp, onMouseMove};
    return {view, model, controller};
    
}

function whack(){

    function distance(p, q){
        return Math.sqrt(Math.pow((p.x - q.x), 2) + Math.pow((p.y-q.y), 2));
    }
    function nextRandomNumber(n){
        return (4578 * n ** 2 - 976161 * n + 6156489) % 79729693;
    }
    function shrinkMole(mole, amount){
        let temp = {position: mole.position, size: mole.size };
        temp.size = mole.size - amount;
        if (temp.size < 0){
            temp.size = 0;
        }
        return temp;
    }
    function shrinkMoles(moles, amount){
        let temp = JSON.parse(JSON.stringify(moles));
        for (var i = 0; i < temp.length; i++){
            temp[i].size = temp[i].size - amount;
        if (temp[i].size < 0){
            temp[i].size = 0;
        }
        }
        return temp;
    }
    function removeZeroSizedMoles(moles){
        let temp = [];
        for (var i = 0; i < moles.length; i++){
            if (moles[i].size != 0) temp.push(moles[i])
        }
        return temp;

    }
    function createMole(rng){
        var a = nextRandomNumber(rng);
        var b = nextRandomNumber(a);
        var c = nextRandomNumber(b);
        let mole = {position: {x: a % 500, y: b % 500}, size: (c % 25) + 5}
        return [mole,c];
    }
    function replenishMoles(moles, rng){
        let temp = JSON.parse(JSON.stringify(moles));
        while (temp.length < 3){
            let t = createMole(rng);
            let mole = t[0];
            rng = t[1];
            temp.push(mole);
        }
        return [temp, rng];
    }
    function findMoleAt(moles, position){
        for (var i = 0; i < moles.length; i++){
            if (distance(moles[i].position, position) < moles[i].size){
                return i;
            } 
        }
        return -1;
    }
    function removeMoleWithIndex(moles, index){
        let temp = [];
        for (var i = 0; i < moles.length; i++){
            if (i != index){
                temp.push(moles[i]);
            }
        }
        return temp;
    }
    function hit(state, position){
        let temp = JSON.parse(JSON.stringify(state));
        if (temp.health === 0) return temp;
        var index = findMoleAt(temp.moles, position);
        if (index != -1){
            temp.health = temp.health + 5;
            temp.moles = removeMoleWithIndex(temp.moles, index);
            let t = replenishMoles(temp.moles, temp.rng);
            temp.moles = t[0];
            temp.rng = t[1];
        }
        else {
            temp.health = temp.health - 5;
        }
        return temp;
    }
    function advanceTime(state, dt){
        let temp = JSON.parse(JSON.stringify(state));
        if (temp.health === 0) return temp;
        temp.moles = shrinkMoles(temp.moles, 10 * dt);
        temp.moles = removeZeroSizedMoles(temp.moles);
        t = replenishMoles(temp.moles, temp.rng)
        temp.health = temp.health - 10*dt;
        if (temp.health < 0) temp.health = 0;
        temp.moles = t[0];
        temp.rng = t[1];
        temp.timeLasted = temp.timeLasted + dt;
        return temp;
    }
    function onTimerTick(state){
        return advanceTime(state, 1);
    }
    function onMouseDown(state, position){
        console.log(position)
        return hit(state, position.position);
    }


    const view = {};
    const model = {distance, nextRandomNumber, shrinkMole, shrinkMoles, removeZeroSizedMoles, createMole, replenishMoles, findMoleAt, removeMoleWithIndex, hit, advanceTime};
    const controller = {onTimerTick, onMouseDown};
    return {view, model, controller};
}