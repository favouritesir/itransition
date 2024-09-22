/*
* Title: Referee
* Description: Referee check the rules of the game and show cards;
* Author: Ashikur Rahman
* Date: Saturday, 21 -September-2024 (15:10:2)
* code style: personal [not standard]
*/
/************************************************************************************************* DIRECTION */
// -----------------------------------------------------
//       AVAILABLE CARDS 
// -----------------------------------------------------
// BLACK        : If few arguments passed.
// BLUE         : If arguments len type not mach.
// BROWN        : If duplicate argument passed.
// GREEN        : If win the game
// YELLOW       : If draw the game
// RED          : If lose the game
// -----------------------------------------------------
/************************************************************************************************* DEPENDENCIES */
const middleMan = require('./middleMan'); // control key, hmac and computer choice
const helper = require('./helper');       // help to generate table and other utilities
const monitor = require('./monitor');     // visualize the game to user


/************************************************************************************************* REFEREE CLASS */

class Referee 
{
    /************************************************************************************************* Game configuration */
    #key;                            // referee key for identification to get hmac key from middleMan
    #config = 
    {
        minLen: 3,                        // minimum players length
        lenType: "odd",                   // players length type even or odd
        keySize: 32,                      // hmac key size 32 Bytes for 256 bits
    };
    
    get config(){ return this.#config; }  // get configuration
    get key(){ return this.#key }         // get key
    
    /************************************************************************************************* Referee Star The Game (start) */
    start=game=>                          // referee start the game
    {
        try{                              // try to run the program
            this.#checkValidity(game);    // referee check players fitness to start the game
            this.#init(game);             // referee initial new game
        }
        catch(e){                         // execute when any kind of coding error arrived
            this.stop('An internal error happened. Please contact the developer.');
        }
        
    }
    /************************************************************************************************* Terminate The Program Process (stop) */
    stop=msg=>
    {
        monitor.gameEnd(msg);             // tell to monitor that game over 
        process.exit(0);
    }

    /************************************************************************************************* Referee Check Players Fitness (check_validation) */
    #checkValidity=g=>
    {
        let f=0;                                            // set flag for err

        if(g.len < this.#config.minLen)
            monitor.showBlackCard(this.#config.minLen,f++); // check len err & handle
        
        else if(helper.lenTypeErr(g,this.#config))
            monitor.showBlueCard(this.#config.lenType,f++); // check lenType err & handle

        else g.players.forEach((s, i, a) =>{                // check duplicate err & handle 
            if(a.some((k, j) => (i != j) & (k === s))) monitor.showBrownCard(f++);
        });
        
        f ? this.stop() : '';                               // if any err terminate the game
    }

    /************************************************************************************************* Referee Initialize The Game (init) */
    #init=game=>
    {
        this.#key = Math.random()*99999999999999999999;     // make a random key for identification
        Object.freeze(this.#config);                        // freeze the config obj

        middleMan.newGameStarted(this, game);               // tell to middleMan that new game start
        this.#updateScreen(game);                           // update monitor screen
    }
    
    #updateScreen=game=> 
    {
        monitor.updateScreen(game,middleMan);               // show game screen on the monitor 

        this.#handle(game)               // The referee started handling the game continuously
    }
    /************************************************************************************************* Referee Handle the Game (handle) */
    #handle=game=>
    {
        helper.getInput((s, key) => {
            if (s?.match(/[0-9\?]/g)) this.#handleOption(s,game);
            else if (key.name === "up" || key.name === "down") this.#handleArrow(key.name,game);
            else if (key.name === "return") this.#handleEnter(game);
            else if (key.name === "backspace" || key.name === "escape") this.#reset(game);
            else this.#updateScreen(game);
        });
    }

    /************************************************************************************************* Referee handle user input (handle_option) */
    #handleOption =(s, game)=>
    {
        switch(s){
            case '?':game.userChoice = game.len + 1; break;
            default:
                let i = game.userChoice * 10 + (s *= 1);                    // make number by digit s
                game.userChoice= i > game.len? (s > game.len? 0 : s) : i;   // check input range and set
        }
    
        this.#updateScreen(game);                                           // update screen
    }

    /************************************************************************************************* Referee handle up/down key (handle_arrow) */
    #handleArrow =(s,game)=>
    {
        let n = game.userChoice;
            n = s == "up" ? --n : ++n;

        game.userChoice = (n < 0 ? game.len +1 : n) % (game.len + 2);       //2 for exit & help 

        // NB: if 3 players then menu length: game.len()+2 = 5 -> ['exit',...players, 'help']
        //     so menu index range (0-4) and when userChoice increase to 5 or 6 or ... then n % 5 => [0-4]
        //     & when userChoice decrease to less the 0 it should go back to last index: game.len()+1 = 4

        this.#updateScreen(game);
    }

    /************************************************************************************************* Referee handle enter key (handle_enter) */
    #handleEnter=game=>
    {
        const n = game.userChoice;

        if (n) n > game.len ? monitor.showTable(game, this) : this.#publishRes(game);
        else this.stop('Game Over'); 

    } 
    
    /************************************************************************************************* User want to reset his choice (reset) */
    #reset=game=>
    {
        game.userChoice=0;                          // reset user choice
        this.#updateScreen(game);                   // update screen
    }

    /************************************************************************************************* Referee Publish the game result (publish_res) */
    #publishRes=game=>
    {
        const data = middleMan.getData(this.#key);  // collect comChoice, hmac, key from middleMan;
        const res = this.isWin(game.userChoice-1,data.comChoice,game.len); // return 1 or 0 or -1;
        
        // NB:subtract extra 1 -> we always count extra 1 for exit when set user choice on handle time.
        //    and we did this to generate option menu easily on monitor class menu=['exit',...players].
        //    so userChoice always point menu index but comChoice always point players arr & it's the reason.

        switch(res){
            case 1: monitor.showGreenCard(data, game)(game, this); break;
            case 0: monitor.showYellowCard(data, game)(game, this); break;
            default: monitor.showRedCard(data, game)(game, this);
        }
    }

    /************************************************************************************************* Referee tell the winning result (is_win) */
    isWin =(userChoice,computerMove,l)=>
    {
        return ((userChoice - computerMove + l/2 + l) % l) - l/2;  // main formula to get result
    }
};


/******************************************************************************************************* Export the middleMan obj */
module.exports=new Referee(); // export the Referee
