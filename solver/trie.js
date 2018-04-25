// Prefix Tree or reTrieval Tree
class TrieNode
{
    constructor(val)
    {
        this.value = val;
        this.connections = {};
    }

    insert(string, index)
    {
        // This helps for the adding, returns the 'next' node
        if(index==string.length)
        {
            
        }

    }

}

class Trie
{
    constructor(wordsList)
    {
        this.root = new TrieNode();
        for(let word of wordsList)
        {
            this.add(word);
        }
    }

    add(word)
    {
        let cur = this.root;
        let index = 0;
        while(index<word.length){
            cur = cur.insert(word, index++);
        {
        cur.insert(word, index);
    }

    contains(word)
    {

    }

    autoComplete(prefix)
    {

    }

    autoCompleteByLength(prefix, totalLength)
    {

    }
}