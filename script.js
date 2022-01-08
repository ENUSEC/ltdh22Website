//countdown
// Set the variables
var countDownDate = new Date("Apr 2, 2022 09:00:00").getTime();

var x = setInterval(function() {

  // Get today's date and time and find the difference
  var now = new Date().getTime();
  var difference = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(difference / (1000 * 60 * 60 * 24));
  var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("countDown").innerHTML = days + ":" + hours + ":"
  + minutes + ":" + seconds + "?";
    
  // If the count down is over, write some text 
}, 1000);

//html setup
var itemsHTMLColection = document.getElementsByClassName('parallax-item')
var itemsArray= Array.from(itemsHTMLColection);

//inisulise input object to store mouce position as fraction
var input={
  mouseX: {
    start: 0,
    endoffset: 0,
    current: 0,
  },
  mouseY:{
    start: 0,
    endoffset: 0,
    end: window.innerHeight,
    current: 0,
  }
};

input.mouseX.end =  window.innerWidth - input.mouseX.endoffset;
input.mouseX.range = input.mouseX.end - input.mouseX.start;

input.mouseY.range = input.mouseY.end - input.mouseY.start;
input.mouseY.end =  window.innerHeight - input.mouseY.endoffset;

//inisulise varable to output effects
var output = {
  x: {
    start: 10,
    end: -10,
    current: 0,
  },
  y: {
    start: 10,
    end: -10,
    current: 0,
  },
  zIndex: {
    range:10000
  },
  scale:{
    start: 1,
    end: 0.3
  },
  blur:{
    startingDeapth: 0.1,
    range: 10
  }
};
output.x.range = output.x.end - output.x.start;
output.y.range = output.y.end - output.y.start;
output.scale.range = output.scale.end - output.scale.start

var mouse = {
  x: window.innerWidth * 0.5,
  y: window.innerHeight * 0.5
}


var updateInputs = function() {
  //calculate fraction
  input.mouseX.current =  mouse.x;
  input.mouseX.fraction = (input.mouseX.current - input.mouseX.start) / input.mouseX.range;
  
  //repeat for y cowards
  input.mouseY.current = mouse.y;
  input.mouseY.fraction = (input.mouseY.current - input.mouseY.start) / input.mouseY.range;
  
 
}

var updateOutputs = function() {
   output.x.current = output.x.start + (input.mouseX.fraction * output.x.range);
   output.y.current = output.y.start + (input.mouseY.fraction * output.y.range);
}
var updateEachItem = function(){
   itemsArray.forEach(function(item, counter){
    var depth = parseFloat(item.dataset.depth, 10);
    var itemOutput = {
      x: output.x.current - (output.x.current * depth),
      y: output.y.current - (output.y.current * depth),
      zIndex: output.zIndex.range - (output.zIndex.range * depth),
      scale: output.scale.start + (output.scale.range * depth),
      blur: (depth - output.blur.startingDeapth) * output.blur.range
    };
    console.log(counter, 'depth', depth);
    item.style.filter = 'blur('+itemOutput.blur+'px)'
    item.style.zIndex = itemOutput.zIndex
    item.style.transform ='scale('+itemOutput.scale+') translate(' + (itemOutput.x) + 'px, ' + (itemOutput.y) + 'px)'; 
  });
}

//creating fraction of the screen
var handleMouseMove = function(event){
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  
  updateInputs();
  updateOutputs();
  updateEachItem();
 
}

//redo maths once resised
var handleresize = function(event){
  input.mouseX.end =  window.innerWidth - input.mouseX.endoffset;
  input.mouseX.range = input.mouseX.end - input.mouseX.start;
  
  input.mouseY.end =  window.innerHeight - input.mouseY.endoffset;
  input.mouseY.range = input.mouseY.end - input.mouseY.start;

}

// event Listeners to reajust a resized screan and to track mouse movements
window.addEventListener('mousemove',handleMouseMove);
window.addEventListener('resize',handleresize);
updateInputs();
updateOutputs();
updateEachItem();