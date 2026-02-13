const fs = require('fs');
// const prompt = (msg) => {
//   fs.writeSync(1, msg);
//   let str = '', buffer = Buffer.alloc(1);
//   while (true) {
//     fs.readSync(0, buffer, 0, 1);
//     if (buffer[0] === 10 || buffer[0] === 13) break; // Enter
//     str += buffer.toString();
//   }
//   return str;
// };
const prompt = (msg) => {
  fs.writeSync(1, msg);
  let str = '', buffer = Buffer.alloc(1);
  
  while (true) {
    const bytesRead = fs.readSync(0, buffer, 0, 1);
    const charCode = buffer[0]; // Берем код считанного байта

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
console.clear()

prompt("hello user, press ENTER to cotinue and write 'start()' to start the game \n")

function start(){

    function clear(){console.clear()}
    clear()

    let haveHat = false;

    let position = ""

    function scenario1(){
        clear()
        while ( true ){
            let res = prompt("u're at the bed (start pos.), you can choose left ot right... \n")
            if (/^\s*r\s*i\s*g\s*h\s*t\s*$/ig.test( res ) ) {
                position = "window"
                console.log("window, pretty awful looking glass")
                return("window")
            }
            else if ( /^\s*l\s*e\s*f\s*t\s*$/ig.test( res ) ) {
                position = "door"
                console.log("door")
                return("door")
            }
        }
    }

    function scenario2(){
        clear()
        while ( true ){
            let res = prompt("look in window ? \n")
            if (/^\s*y\s*e\s*s\s*$/ig.test( res ) ) {
                return("game ended with good endind, nature were so beaty that u've returned to bed to sleep again (at least u're alive)")
            }
            else {
                console.log("u've decided to go back to bed and tried to think...")
                position = ""
                return("")
            }
        }
    }

    if( scenario1() === "window" ){
        let res = scenario2()
        if(!res){
            scenario1()
        }
        return res
    }
    else{
        return("game ended with bad endind, someone heard your steps close to door and shooted through it")
    }
}