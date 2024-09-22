//table generator + utility
/*
* Title: Helper
* Description: Helper help us to understand the wining logic and provide other utilities.
* Author: Ashikur Rahman
* Date: Saturday, 21 -September-2024 (20:34:08)
*
*/
/************************************************************************************************* DEPENDENCIES */
const readline = require('readline');

readline.emitKeypressEvents(process.stdin);     // make input interface
process.stdin.setRawMode(true);


/************************************************************************************************* HELPER CLASS */

class Helper 
{
    /************************************************************************************************* SOME UTILITY FUNCTION */
    
    rs =(len,s=' ')=> ''.padEnd(len,s);
    prs =(len,s=' ')=> console.log(this.rs(len,s) );
    menuBreakLine =(hmac,key=' ')=> this.prs(this.bigLen([hmac, key]) + 10, "-");
    
    lenTypeErr =(g,c)=> g.players.length % 2 == (c.lenType.toLowerCase() === 'even')

    formatIndex =(i, len)=> this.rs(len.length-i.length)+i; // format the index number
    formateRow = (arr,l) => arr.map(ele => ele.padEnd(l));                // format table row

    // show ending hint for exit or re-play
    endingHint =()=> this.log(` Hint:\n => press 0 or esc for exit.\n => press enter for play again.`);

    
    bigLen = arr => arr.reduce((a,s)=>a.length>s.length?a:s).length;

    /************************************************************************************************* Get user input */
    getInput(callback=(str,key)=>'')
    {
        process.stdin.once('keypress',(s,k)=>{          // get key board input
            callback(s,k);                              // pass input to the call back
        });
        
    }
    
    /************************************************************************************************* Table maker */
    getLogicTable =(game,isWin)=>
    {
        const header=['PC ‾v | USER >',...game.players];
        const maxLen=this.bigLen(header);
        const line=`\n+-${new Array(header.length).fill("".padEnd(maxLen,'-')).join('-+-')}-+`; 
    

        return header.map((_,i,a) => line + this.makeRow(a, i, isWin, maxLen,game) ).join('')+line;
    }

    makeRow(header,i,isWin,l,g){
        const row = i ==  0 ? header : [ header[i], ...header.slice(1).map((_,j)=>{ // slice 1st column
            const r = isWin(j, i-1, g.len);
            return r ? r>0 ? 'Win':'Lose' :'Draw';
        })]

        return `\n| ${this.formateRow(row,l).join(' | ') } |`; 
    }

};


/************************************************************************************************* EXPORT HELPER OBJECT */
module.exports = new Helper()