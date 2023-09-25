function shuffle(arr) {

    var array = arr;
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function getRandomizedValue(arr,exclude){
    
    var index = Math.floor(Math.random()*10)%arr.length;
    while (arr[index] != exclude){
        index = Math.floor(Math.random()*10)%arr.length;
    }
    return arr[index]
}

  export {shuffle , getRandomizedValue} ;