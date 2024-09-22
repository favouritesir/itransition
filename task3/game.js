// ============================================================================================
//                           GENERALIZED ROCK-PAPER-SCISSORS GAME 
// ============================================================================================
// AUTHOR       : Ashikur Rahman
// DESCRIPTION  : This is CLI based game using NodeJS. it accepts
//                an odd number ≥ 3 non-repeating strings where 
//                half of the next players in the circle wins, half
//                of the previous players in the circle lose. 
// Date         : Saturday, 21 -September-2024 (14:10:07).
// code style   : personal [not standard]
// ============================================================================================ 



/************************************************************************************************* DEPENDENCIES */
const referee=require('./classes/referee')


/************************************************************************************************* GAME CLASS */
class Game{

    #players;                                       // all available players
    #userChoice;
    #option = 
    {
        selector:['x','>',' '],                     // exit,select,other
        helpIcon:'?',                               // help menu icon
    };        

    constructor()
    {
        this.#players =  process.argv.slice(2);     // set user players
        this.#userChoice = 0;                       // default index
    }
    
    get players(){ return this.#players; }          // get players array

    get len(){ return this.#players.length; }       // get player's arr length

    get userChoice(){ return this.#userChoice; }    // get user choice value
    
    get opt(){ return this.#option; }

    set userChoice(n) { this.#userChoice = n * 1; } // set user choice value
    
}


/************************************************************************************************* PROGRAM START */
referee.start(new Game())                           // request referee to start new game