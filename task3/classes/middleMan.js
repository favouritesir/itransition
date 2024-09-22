/*
* Title: Middle man
* Description: middle man known the computer players. So he generate key & hmac
*              and provide to the user when need.
* Author: Ashikur Rahman
* Date: Saturday, 21 -September-2024 (14:14:28)
*
*/

/************************************************************************************************* DEPENDENCIES */
const crypto = require('crypto');

/************************************************************************************************* MIDDLEMAN CLASS */
class MiddleMan 
{
    #comChoice;
    #key;
    #hmac;
    #keyLen;
    #refKey;

    /************************************************************************************************* CONSTRUCTOR */
    get hmac(){ return this.#hmac; }
    
    /************************************************************************************************* NEW GAME START */
    newGameStarted=({config,key},game)=>
    {
        if(!key) throw new Error('key not found')

        this.#refKey = key;
        this.#keyLen = config.keySize;
        this.#setData(game);                                    // set necessary data     
    }
    
    /************************************************************************************************* SET COMP_CHOICE KEY & HMAC */
    #setData=({players})=>
    {
        this.#comChoice = crypto.randomInt(players.length);     // set computer choice
        this.#key = crypto.randomBytes(this.#keyLen);           // set key & then set hmac

        this.#hmac = crypto.createHmac("sha3-256", this.#key).update(players[this.#comChoice]).digest("hex");
    }

    /************************************************************************************************* GET COMP_CHOICE KEY & HMAC */
    getData=key=>
    {
        if(key != this.#refKey) throw new Error('key do not match');    // verify referee
        return ({
            comChoice: this.#comChoice,
            hmac: this.#hmac,
            key: this.#key  
        })
    }
};



/************************************************************************************************* EXPORT MIDDLEMAN OBJECT */
module.exports=new MiddleMan();