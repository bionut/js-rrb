var SIZE = 10;

test_push();
function test_push() {
    var arr = [];
    var x = rrb.create();
    for (var i = 0; i < SIZE; i++) {
        arr.push(getRandomInt());
        x = rrb.push(x, arr[i]);
    }

    for (i = 0; i < SIZE; i++) {
        if(x.tail.child[i] != arr[i]){ // TODO
            console.error('Push failed.');
            return;
        }
    }
    console.info('Tail push ok.');
    
}


function getRandomInt() {
    return Math.floor(Math.random() * (100)) + 0;
}
function assert(condition) {
    if (!condition) console.trace();
}