// This is an entity that uses two tries to solve crossword
const {Trie} = require("./trie.js");

class virtualCellf
{
    constructor(row, col, dark)
    {
        this.row = row;
        this.col = col;
        this.dark = dark;
        this.val = null;
        this._validVals = null;
    }    
}


class Solver
{
    constructor(wordsList)
    {
        this._vTrie = new Trie(wordsList);
        this._hTrie = new Trie(wordsList); //these could be injected yadda yadda
        // do i need 2...not until speed optimizing i think...
    }

    buildVirtualGrid(grid)
    {
        let rows = grid.length;
        let cols = grid[0].length;
        return grid.map((row,rdx)=>row.map((col,cdx)=>new virtualCellf(rdx, cdx, (col==="*"))))//i guess * is a solid cell nao :D
    }

    buildHoriPrefix(row, col, vGrid)
    {
        let prefix = "";
        while(col>=0 && !vGrid[row][col].dark)
        {
            prefix = vGrid[row][col]['val'] + prefix;
            col--;
        }
        return prefix;
    }

    buildVertPrefix(row, col, vGrid)
    {
        let prefix = "";
        while(row>=0 && !vGrid[row][col]['dark'])
        {
            prefix = vGrid[row][col]['val'] + prefix;
            row--;
        }
        return prefix;
    }

    calcHoriLen(row, col, vGrid)
    {
        // find start of clue
        while(col>=0 && vGrid[row][col-1])
        {
            if(!vGrid[row][col-1]['dark'])
            {
                col--;
            }else{
                break;
            }
        }
        // count it out
        let length = 0;
        while(col<vGrid[0].length && !vGrid[row][col]['dark'])
        {
            col++;
            length++;
        }
        return length;
    }

    calcVertLen(row, col, vGrid)
    {
        let length = 0;
        // find start of clue
        while(row>=0 && vGrid[row-1])
        {
            if(!vGrid[row-1][col]['dark'])
            {
                row--;
            }else{
                break;
            }
        }
        // count it out
        while(row<vGrid.length && !vGrid[row][col]['dark'])
        {
            row++;
            length++;
        }
        return length;
    }

    genCharOptions({vPre, vLen}, {hPre, hLen})
    {
        let hWords = this._hTrie.autoCompleteByLength(hPre, hLen)
        .map(word => word[hPre.length]);
        console.log(`For prefix ${hPre} and total length ${hLen}, we found these chars: ${hWords}`);
        let vWords = this._vTrie.autoCompleteByLength(vPre, vLen)
                                .map(word => word[vPre.length]);
                                console.log(`For prefix ${vPre} and total length ${vLen}, we found these chars: ${vWords}`);                                
        // intersect the things!
        let hBuf = {}, res=[];
        hWords.forEach(char=>hBuf[char]=true);
        vWords.forEach(char=>{if(hBuf[char]){res.push(char)}});
        return res;
    }

    buildVQ(vGrid)
    {
        let q = [];
        for(let row of vGrid)
        {
            q = q.concat(row);
        }
        return q; //guess we coulda used reduce lol
    }

    solveCharsForCell(row, col, vGrid)
    {
        let vPre = this.buildVertPrefix(row, col, vGrid);
        let hPre = this.buildHoriPrefix(row, col, vGrid);
        let vLen = this.calcVertLen(row, col, vGrid);
        let hLen = this.calcHoriLen(row, col, vGrid);
        // console.log(
        //     `
        //     Currently in row ${row} and col ${col}
        //     hInfo: so far${hPre} and ${hLen} long
        //     vInfo: so far${vPre} and ${vLen} long
        //     `
        // );
        let chars = this.genCharOptions({vPre, vLen}, {hPre, hLen});
        return chars;
    }

    solutionFromGrid(vGrid)
    {
        return vGrid.map(row => row.map(col => col.val));
    }

    solve(grid)
    {
        let backtracker = []; // our stack
        let virtualGrid = this.buildVirtualGrid(grid);// metadatas of each cell
        let vQ = this.buildVQ(virtualGrid); // our Q
        let cur = vQ.shift();
        while(vQ.length>=0 && cur)
        {
            console.log("looking at: " + cur.row + cur.col);
            console.log(cur);
            if(cur.dark)                        //is a black space
            {
                console.log("its a wall")
                backtracker.push(cur);
                cur = vQ.shift();
            }
            else if(cur.val===null && cur._validVals === null)  //hopefully this means we are loking at brand new cellF
            {
                console.log("it is fresh biz")
                cur.val = "", cur._validVals = [];
                cur._validVals = this.solveCharsForCell(cur.row, cur.col, virtualGrid);
                if(cur._validVals.length>0)              // assign a val! and move on
                {
                    console.log("moved on")
                    cur.val = cur._validVals.pop();
                    backtracker.push(cur);
                    cur = vQ.shift();
                }
                else                            // no values found!!!
                {
                    console.log("backed up", cur)
                    vQ.unshift(cur);
                    cur = backtracker.pop();
                }

            }
            else if(cur._validVals.length>0)   //has a val that CAN be replaced
            {
                console.log("we seen it before, tryin agin")
                cur.val = cur._validVals.pop();
                cur = vQ.shift();
            }
            else                               //has a val that CANT be replaced
            {
                console.log("Seen it but its no good");
                vQ.unshift(cur);
                cur = backtracker.pop();
            }
        }
        console.log(virtualGrid);
        return this.solutionFromGrid(virtualGrid);
    }
}

module.exports = {Solver};
