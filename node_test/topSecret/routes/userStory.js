var userStory 			= {},
		lineByLine 			= require('n-readlines'),
		fs        			= require("fs")
  	topSecret 			= new lineByLine(__dirname+'/topSecret.txt');

var getNumber = (input)=> {
	var digits = {
    " _ | ||_|": 0,
    "     |  |": 1,
    " _  _||_ ": 2,
    " _  _| _|": 3,
    "   |_|  |": 4,
    " _ |_  _|": 5,
    " _ |_ |_|": 6,
    " _   |  |": 7,
    " _ |_||_|": 8,
    " _ |_|  |": 9,
    " _ |_| _|": 9,
  }

	var line;
	var lineNumber = 0;
	var lines = [];
	var number = [];
	var result = "";
	while (line = input.next() ) {
	  lines[lineNumber] = line.toString('ascii');
	  lineNumber++;
	  if(lineNumber > 2){
	    for(var i = 0; i < lines.length; i++){
		 		for( var j = 0; j < lines[i].length/3; j++ ){
         	if(!number[j]) number[j] = '';
         	number[j] = number[j] + lines[i].substr(j*3,3);
	    	}
		}
	  var numberLine = '';
	  var isLegal = true;
		for(var i = 0; i < number.length; i++){
			if(digits[number[i]] == undefined) {
				isLegal = false;
				numberLine = numberLine + "?";
			} else {
				numberLine = numberLine + digits[number[i]];
			}
	  }
	  if(!isLegal) {
	  	numberLine = numberLine + " ILLEGAL"  +"\n"
	  } else {
	  	numberLine = numberLine + "\n"
	  }
		result = result + numberLine;
	  line = input.next();
		lineNumber = 0;
		lines = []
		number = [];
	  };
	}

	console.log("Output numbers by converting 7 segment display digits to parsed numbers: ");
	console.log(result);

	return result;
}

userStory.getTopSecret = (callback)=> {
	setImmediate(()=>{
		var series = getNumber(topSecret);
		fs.writeFile('output_top_secret_1.txt', series, (err, data)=> {
		  if (err) {
				console.log("Something went wrong.")
				callback({success : false, info : "Something went wrong"});
		  } else {
				console.log("Compilation successful. Files saved as output_top_secret_1.txt");
		  	callback({success : true, info : "Result Saved in File output_top_secret_1.txt successfully"});
		  }
		})
	})
}

module.exports = userStory;