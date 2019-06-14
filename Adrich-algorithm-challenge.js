let printDirections = (initial, target) => {

	let empty;
  let temp;

  // find the empty space
  for (var i=0; i < initial.length; i++) {
  	if(initial[i] == 0){
    	empty = i;
      break;
    }
  }

  for (var i=0; i<initial.length; i++) {

    // initial and target index are not the same
		if(initial[i] != target[i]) {

    	for (var j=0; j< initial.length; j++) {
        // found a match
      	if(initial[j] == target[i]) {
          // current index is the empty one, so there only has to be 1 move to
          // match target
        	if(i == empty) {
          	initial[i] = initial[j];
            initial[j] = 0;
            empty = j;
            //console.log(initial);
          	console.log(`Move car from space ${j} to space ${i}`);
          }
          // the empty index is to the left, which means it matches the target.
          // there has to be an additional move to make the left correct again
          else if (i > empty) {
            temp = empty;
            initial[temp] = initial[j];
            initial[j] = 0;
            empty = j;
            //console.log(initial);
            console.log(`Move car from space ${j} to space ${temp}`);
            initial[j] = initial[i];
            initial[i] = 0;
            empty = i;
            //console.log(initial);
            console.log(`Move car from space ${i} to space ${j}`);
            initial[i] = initial[temp];
            initial[temp] = 0;
            empty = temp;
            //console.log(initial);
            console.log(`Move car from space ${temp} to space ${i}`);
          }
          // the empty space is to the right of current index. so 0 may or may
          // not be in the correct position yet and it doesn't matter if it is
          // modified for now
          else {
            temp = empty;
            initial[empty] = initial[i];
            initial[i] = 0;
            empty = i;
            //console.log(initial);
            console.log(`Move car from space ${i} to space ${temp}`);
            initial[i] = initial[j];
            initial[j] = 0;
            empty = j;
            //console.log(initial);
            console.log(`Move car from space ${j} to space ${i}`);
          }
        }
      }
    }
  }
}


printDirections([0,4,2,5,1,3], [0,1,5,3,2,4]);
