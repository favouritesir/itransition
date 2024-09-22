/*
* Title: Monitor
* Description: Monitor help us to visualize the game.
* Author: Ashikur Rahman
* Date: Saturday, 21 -September-2024 (20:30:55)
*
*/

/************************************************************************************************* DEPENDENCIES */
const helper = require('./helper');

/************************************************************************************************* Monitor CLASS */

class Monitor 
{
    
    /************************************************************************************************* UTILITY METHODS */
    #show = (...s)=> console.log(...s)
    #clear =()=> process.stdout.write('\x1Bc');             // Clear Monitor
    
    /************************************************************************************************* END SCREEN */
    gameEnd=(m)=> 
    {
        if(m){
            this.#clear();
            this.#show(m);
        }
    }

    /************************************************************************************************* UPDATE SCREEN */
    updateScreen =(game,middleMan)=>
    {
        this.#clear();
        this.#showHmac(middleMan);
        this.#showMenu(game);
        this.#showInputHint(middleMan);
    }

    /************************************************************************************************* SHOW TABLE */
    showTable =(game,r)=>
    {
        this.#clear();
        this.#show(` Victory Logic:\n ‾‾‾‾‾‾‾‾‾‾‾‾‾‾`);
        this.#show(helper.getLogicTable(game,r.isWin));
        this.handleEndScreen(game,r);
    }

    /************************************************************************************************* END SCREEN HINT */
    #endingHint =()=> this.#show(` Hint:\n => press 0 or esc for exit.\n => press enter for play again.`);
    
    /************************************************************************************************* HANDLE END SCREEN */
    handleEndScreen =(game,r)=>
    {
        this.#endingHint();
        helper.getInput((s,key)=>{
            switch(key.name){
                case 'return': r.start(game); break;
                case 'escape': r.stop('Game Over'); break;
                case '0': r.stop('Game Over'); break;
            }
        })
    }

    /************************************************************************************************* PRINT HMAC */
    #showHmac =({hmac,key=''})=>
    {
        helper.menuBreakLine(hmac, key);             // break line
        this.#show(` HMAC: ${hmac}`);                // hmac
        helper.menuBreakLine(hmac, key)              // break line
    }

    /************************************************************************************************* PRINT KEY */
    #showKey =({hmac,key=''})=>
    {
        helper.menuBreakLine(hmac, key);              // break line
        this.#show(` KEY: ${key.toString('hex')}`);   // hmac
        helper.menuBreakLine(hmac, key)               // break line
    }
        
    /************************************************************************************************* PRINT MENU ITEM */
    #showMenu =(g)=>
    {
        this.#show(" Available Moves:\n‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾");
        let menus = ["exit", ...g.players], selector;
    
        menus.forEach((p, i) => {
          selector = g.opt.selector[i==g.userChoice? (i!=0)-0 : 2];
          this.#show(`  ${selector} ${helper.formatIndex(i+'', menus.length+'')} - ${p.toLowerCase()}`); // print menus
        });
    
        selector = g.userChoice >= menus.length ? "-" : " ";
        this.#show(`  ${selector} ${helper.rs((menus.length+'').length,g.opt.helpIcon)} - help`);
    }
    
    /************************************************************************************************* PRINT INPUT HINT */
    #showInputHint =(m)=>
    {
      helper.menuBreakLine(m.hmac);  // break line
      this.#show(` -> Type ? and number to navigate then press enter`);
      this.#show(` -> Or use up & down arrow to navigate then press enter`);
      this.#show(` -> Use backspace or esc for reset choice .`);
    }
        
    
    /************************************************************************************************* ALL CARDS */
    showBlackCard=(minLen)=> this.#showMsg(this.#lenErr(minLen));
    showBlueCard=(lenType)=> this.#showMsg(this.#lenTypeErr(lenType.toLowerCase()));
    showBrownCard=()=> this.#showMsg(this.#duplicateErr());

    showGreenCard =(data, g)=> this.#showResult(data,g,' Congratulation!! You win.');
    showYellowCard =(data, g)=> this.#showResult(data,g,' Draw!You can play again.');
    showRedCard =(data, g)=> this.#showResult(data,g,' Sorry! You lose.');

    /************************************************************************************************* SHOW RESULT */
    #showResult=(data,g,msg)=>
    {
        this.#clear();
        this.#showHmac(data);
        this.#show(msg);
        
        this.#show(` Computer choose: ${g.players[data.comChoice]}\n You choose     : ${g.players[g.userChoice-1]}`);
        this.#showKey(data);
        
        return this.handleEndScreen;
    }


    /*************************************************************************************************  SHOW  MESSAGE */
    #showMsg =({title,des,hint})=>
    {
        let len = helper.bigLen([title, des, hint]);              // len for break line
        this.#clear();                                            // clear the screen
    
        this.#show( helper.rs(len / 2 - title.length), title);     // align to center

        helper.prs(len,'=') ;                                      // dynamic break line
        this.#show("=> Description: ", des);                      // msg desctiption
        helper.prs(len,"-");                                       // dynamic break line
    
        if (hint) this.#show(hint,'\n');                          // msg hint
    }

    #lenErr = minLen=> ({
        title:'Few Arguments',
        des:`Your total move length must be >= ${minLen}`,
        hint:`Example: Rock Paper Scissors or Rock Paper Scissors Lizard Spock`+
            `or 1 2 3 4 5 6 7 8 9`,
    });
    
    #lenTypeErr = lenType=> ({
        title:'Initial Error',
        des:`You must passed ${lenType} number of arbitrary combinations`,
        hint:`Example: Rock Paper Scissors or Rock Paper Scissors Lizard Spock`+
            `or 1 2 3 4 5 6 7 8 9`,
    });
    
    #duplicateErr =()=> ({
        title:'Duplicate Name Found',
        des:`You can not repeat any Player username`,
        hint:`Suppose, you passed rock paper rock. Look here you repeat rock again.`
    });


};

/************************************************************************************************* EXPORT MONITOR OBJ */

module.exports = new Monitor()