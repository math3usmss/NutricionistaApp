/**
* This function allows you to go to an specific frame of the animation
* Remember the frames are a percentage number, so it goes from 0 to 100
**/
function goTo(frame){
	reset(); // Just reset
	
  //For some reason Javascript needs a time to remove animate class. I tried to use as callback from reset but it just didnt work. 
  setTimeout(function(){
  	//Get components
    var chart = document.getElementById("radioChartContent"), pVal = document.getElementById("percentValue");

		//Add animate
    chart.classList.add("animate");

    var currentPercent = 0; //Initial percentage

		//Get percentage one by one
    var currTimeout = setInterval(function(){
    	//Check is reach the limit
      if(currentPercent == frame || currentPercent > 100){
      		
          //Clear interval
          clearInterval(currTimeout);
          //Pause animation
          chart.style.animationPlayState = "paused";
          chart.style.webkitAnimationPlayState = "paused"; //if webkit
          
          return false;
        }else{
        	//Sum percentage
          currentPercent++;
          //show new percentage
          pVal.innerHTML = currentPercent+"%";
        }
    }, 10); //We are using 10 cause it reference by a 1 second (1000 miliseconds) animation. If you're using 4 seconds, change to 40 as  example
  },100);
}

//Reset to initial position
function reset(){
	var chart = document.getElementById("radioChartContent"), pVal = document.getElementById("percentValue");
  
  chart.classList.remove("animate");
  pVal.innerHTML = "0%";
  chart.style.animationPlayState = "initial";
  chart.style.webkitAnimationPlayState = "initial"; //if webkit
}