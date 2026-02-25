const fs = require('fs');
const prompt = (msg) => {
  fs.writeSync(1, msg);
  let str = '', buffer = Buffer.alloc(1);
  
  while (true) {
    const bytesRead = fs.readSync(0, buffer, 0, 1);
    const charCode = buffer[0];

    // 10 - это '\n' (Linux/macOS/Windows), 13 - это '\r' (Windows)
    if (bytesRead === 0 || charCode === 10 || charCode === 13) {
      // Если это \r, проверяем, нет ли следом \n, чтобы очистить поток в Windows
      if (charCode === 13) {
        try { fs.readSync(0, buffer, 0, 1); } catch(e) {}
      }
      break;
    }
    str += buffer.toString();
  }
  return str;
};
function clear(){console.clear()}
clear()

prompt("hello user, press ENTER(twice) to cotinue and write 'start()' to start the game \n")

function start(){

    clear()
    console.log("you're woke up at your bed...")

    let position = ""

    function scenario1(){
        while ( true ){
            let res = prompt("now you can choose to go left or right... \n")
            if (/^\s*r\s*i\s*g\s*h\s*t\s*$/ig.test( res ) ) {
                clear()
                position = "window"
                console.log("window, pretty awful looking glass, nothing intresting, maybe there is something outside...?")
                return("window")
            }
            else if ( /^\s*l\s*e\s*f\s*t\s*$/ig.test( res ) ) {
                clear()
                position = "door"
                console.log("walking to the door...")
                return("door")
            }
            else clear()
        }
    }

    function scenario2(){
        while ( true ){
            let res = prompt("look in window ? \n")
            if (/^\s*y\s*e\s*s\s*$/ig.test( res ) ) {
                clear()
                console.log("looking in the window...")
                return("game ended with good endind, nature were so beaty that you've returned to bed to sleep again (at least you're alive)")
            }
            else if ( /^\s*n\s*o$/ig.test( res ) ) {
                clear()
                console.log("you've decided to go back to bed and tried to think about what to do...")
                position = ""
                return("")
            }
            else clear()
        }
    }

    /* 
               1  > left > bad
               ^  > right (2) > yes > good
               ^              > no
               ^                |
               <<<<<<<<<<<<<<<<<|
       
     */

    while(true){
        if( scenario1() === "window" ){
            let res = scenario2()
            if(res){
                return res
            }
        }
        else{
            return("game ended with bad ending, someone outside heard your steps to the door and shooted through it, very unlucky...")
        }
    }
}
