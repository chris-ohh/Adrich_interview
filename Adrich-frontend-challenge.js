const times = [];
const columns = 24;

// initialize array of timestamps
for(var i=0; i<columns; i++) {
	if(i<10) {
  	times.push(new Date(`2019-06-04T0${i}:00:00`));
  }else {
  	times.push(new Date(`2019-06-04T${i}:00:00`));
  }
}

// highest count label and number of rows including the 0 row
const maxCount = 220;
const rows = 5;
const topPadding = 20;
const leftPadding = 30;

// key and value pairs for hour of day and count
let values = new Map();

for(var i=0; i<times.length; i++){
	// random counts generated for the hours
  values.set(times[i], Math.random()*maxCount);
}

const c = document.getElementById("adrich");
const ctx = c.getContext("2d");

// default dashed lines and color
ctx.setLineDash([3, 3]);
ctx.strokeStyle = "#606060";

// space for the whole chart including labels
const width = 500;
const height = 200;
// space between each column or row
const xinterval = width/columns;
const yinterval = height/rows;
// height of the y axis, subtracted 1 row because only 4 columns are used
const ymax = yinterval*(rows-1);

// font for x axis labels and midnight/noon text
ctx.font = "11px Arial";
ctx.textAlign = "center";

// drawing y axis and vertical grid
let hour;
for(var i=0; i<times.length; i++) {
	hour = times[i].getHours();
  ctx.beginPath();

  // condition for the first 12 hours and the 24th hour, which is written as 00
  if(hour<13) {

  	// condition for 12th and 24th hour
  	if(hour == 0 || hour == 12) {
    	ctx.setLineDash([]);

      // vertical red line
    	ctx.strokeStyle = "#b30000";
      // identical "12" hour label. 12 pixels added for additional padding
    	ctx.fillText(12, leftPadding+xinterval*i, topPadding+12+yinterval*(rows-1));

      // noon and midnight label
      if(hour == 0) {
      	ctx.fillText('Midnight', leftPadding+xinterval*i, topPadding+ymax/2);
      } else {
      	ctx.fillText('Noon', leftPadding+xinterval*i, topPadding+ymax/2);
      }

    }else {
    	// x axis label
    	ctx.fillText(times[i].getHours(), leftPadding+xinterval*i, topPadding+12+yinterval*(rows-1));
    }
  // condition for the 13th to the 23rd hour
  }else {
  		// x axis label using 12 hour notation
    	ctx.fillText(times[i].getHours()-12, leftPadding+xinterval*i, topPadding+12+yinterval*(rows-1));
  }

  // dashed vertical grid
  ctx.moveTo(leftPadding+xinterval*i, topPadding);
  ctx.lineTo(leftPadding+xinterval*i, topPadding+ymax);
  ctx.stroke();
  ctx.closePath();

  // back to default style incase it has been changed for 12th and 24th hour
  ctx.strokeStyle = "#D3D3D3";
  ctx.setLineDash([3, 3]);
}



// font for y axis
ctx.textAlign = 'right';
ctx.textBaseline = "middle";

// drawing x axis and horizontal grid
for(var i=0; i<rows; i++) {
	ctx.beginPath();
  ctx.moveTo(leftPadding, topPadding+yinterval*i);
  ctx.lineTo(leftPadding+xinterval*(times.length-1), topPadding+yinterval*i);

	// condition for the row not being the very last one
	if(i < rows-1) {
    ctx.fillText(maxCount - (maxCount/(rows-1))*i, 26, topPadding+yinterval*i);

  } else {
  	// last row (bottom most one) gets a darker color and starts from 0
  	ctx.strokeStyle = "#606060";
    ctx.fillText(0, 26, topPadding+yinterval*i);
  }

  ctx.stroke();
  ctx.closePath();
}



// plots and connecting line for the data
ctx.beginPath();
ctx.strokeStyle = "#A9A9A9";
// remove dashed style
ctx.setLineDash([]);

var counter = 0;
for(const [date, value] of values.entries()) {
  ctx.arc(leftPadding+xinterval*counter,
  				// padding + the difference between chart height and chart height multipled with value ratio
  				topPadding+ymax-(ymax*value/maxCount),
          3, 0, 2 * Math.PI);
  ctx.stroke();
  counter++;
}
