// Prefix Tree or reTrieval Tree
class TrieNode
{
    constructor(val=null)
    {
        this.value = val;
        this.connections = {};
        this.count = 0;
    }

    insert(string, index)
    {
        // This helps for the adding, returns the 'next' node
        let curChar = string[index];
        // console.log('cur char is '+curChar);
        if(index==string.length)
        {
            if(this.val)
            {
                console.log('wtf dude!');
            }
            this.val = string;
            return this;
        }
        else
        {
            if(!this.connections[curChar])
            {
                this.connections[curChar]=new TrieNode();
                this.count++;
            }
            return this.connections[curChar];
        }

    }
}

class Trie
{
    constructor(wordsList)
    {
        this.root = new TrieNode();
        this.count = 0;
        if(wordsList)
        {
            for(let word of wordsList)
            {
                this.add(word);
            }
        }
    }

    add(word)
    {
        let cur = this.root;
        let index = 0;
        while(index<= word.length)
        {
            cur = cur.insert(word, index++);
        }
        this.count++;
    }

    display()
    {
        let q = [this.root];
        while(q.length>0){
            let cur = q.shift();
            console.log(`Node w/val:${cur.val} and ${cur.count} cnx`);
            for(let cnx in cur.connections)
            {
                q.push(cur.connections[cnx]);
            }
        }
    }

    contains(word)
    {

    }

    advanceToNode(prefix)
    {
        // iterate to node
        let cur = this.root;
        let i = 0;
        while(i<prefix.length)
        {
            let curChar = prefix[i];
            if(cur.connections[curChar])
            {
                cur = cur.connections[curChar]
                i++;
            }else{
                console.log('got nada');
            }
        }
        return cur;
    }

    // Currently is inclusive
    autoComplete(prefix)
    {
        let subTree = this.advanceToNode(prefix);
        let q = [subTree];
        let results = [];
        while(q.length>0)
        {
            let cur = q.shift();
            if(cur.val){
                results.push(cur.val);
            }
            for(let c in cur.connections)
            {
                q.push(cur.connections[c]);
            }
        }
        return results;

    }

    autoCompleteByLength(prefix, totalLength)
    {
        return this.autoComplete(prefix).filter(val=>val.length == totalLength);
    }
}

module.exports = {Trie};