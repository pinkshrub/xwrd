// TRIE TESTS
const Trie = require('./trie.js').Trie

// empty constructor works
function tryTries(){
    console.log(`Empty Constructor Test`);
    let bob = new Trie();
    console.log(bob instanceof Trie);

    // populated constructor works
    console.log(`Populated Constructor Works`)
    let rob = new Trie(['a','b','c','d','e','f','g']);
    console.log((rob.count==7))

    // can add single chars
    console.log(`Can add single chars`);
    bob.add('a');
    console.log(bob.root.connections.a != undefined);

    console.log(`Duplicates log wtf! dude`)
    bob.add('a');

    console.log(`Can add 2 character words`)
    bob = new Trie();
    bob.add('a');
    bob.add('ab');
    console.log(bob.root.connections.a.connections.b.val=='ab');

    // console.log("display test")
    // bob = new Trie(['a','ab','ac','abc','abd','abcd']);
    // bob.display();

    console.log("Can Return A Given Node")
    let res = bob.advanceToNode("ab");
    console.log(res.val == "ab");

    console.log("Can Autocomplete")
    bob = new Trie(['a', 'ab', 'abc'])
    res = bob.autoComplete('a');
    console.log(res);
    console.log(res.length == 3);
    res = bob.autoComplete('ab');
    console.log(res);
    console.log(res.length == 2);

    console.log("Can autocomplete by Length")
    bob = new Trie(['a', 'ab', 'abc'])
    res = bob.autoCompleteByLength('a',2);
    console.log(res);
    console.log(res.length == 1);
}

// SOLVER TESTS
const {Solver} = require("./solver.js");
function solverTests()
{
console.log("Can read all the biz!");
let wordlist = ["ab", "ba"];
let rob = new Solver(wordlist);
console.log(rob instanceof Solver);

console.log("Can build a virtual grid!");
rob = new Solver(wordlist);
let smallEmptyGrid = [["",""], ["",""]];
console.log(rob.buildVirtualGrid([[" ",""],["*",""]]))


console.log("Can build horizontal prefixes");
rob = new Solver(wordlist);
let jon = rob.buildVirtualGrid(smallEmptyGrid);
console.log(rob.buildHoriPrefix(0,0,jon) == "");
// alter the grid...
jon[0][0]['val'] = 'a';
console.log(rob.buildHoriPrefix(0,1,jon) == "a");


console.log("Can build vertical prefixes");
rob = new Solver(wordlist);
jon = rob.buildVirtualGrid(smallEmptyGrid);
jon[0][0]['val'] = 'a';
console.log(rob.buildVertPrefix(1,0,jon) == "a");

console.log('Can figure out clue lengths!');
let mediumEmptyGrid = [["","",""],["","",""],["","",""]];
jon = rob.buildVirtualGrid(mediumEmptyGrid)
console.log(jon)
console.log(rob.calcHoriLen(0,0,jon) == 3);
console.log(rob.calcHoriLen(0,1,jon) == 3);
console.log(rob.calcHoriLen(0,2,jon) == 3);
console.log(rob.calcHoriLen(1,0,jon) == 3);
console.log(rob.calcHoriLen(1,1,jon) == 3);
console.log(rob.calcHoriLen(1,2,jon) == 3);
console.log(rob.calcHoriLen(2,0,jon) == 3);
console.log(rob.calcHoriLen(2,1,jon) == 3);
console.log(rob.calcHoriLen(2,2,jon) == 3);
console.log(rob.calcVertLen(0,0,jon) == 3);
console.log(rob.calcVertLen(0,1,jon) == 3);
console.log(rob.calcVertLen(0,2,jon) == 3);
console.log(rob.calcVertLen(1,0,jon) == 3);
console.log(rob.calcVertLen(1,1,jon) == 3);
console.log(rob.calcVertLen(1,2,jon) == 3);
console.log(rob.calcVertLen(2,0,jon) == 3);
console.log(rob.calcVertLen(2,1,jon) == 3);
console.log(rob.calcVertLen(2,2,jon) == 3);
}

let rob = new Solver(['cba','abc','b']);
let x = rob.solve([["","",""],["","*",""],["","",""]]);
console.log(x);


// PUZZLE TEST1