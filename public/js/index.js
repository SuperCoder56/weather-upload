	var socket=io();

	socket.on("connect",function()
	{
		console.log("connected to server");
 socket.on('newMessage',function(msg)
	{
		console.log(msg);
	document.getElementById("location").innerHTML=`${msg.text.address}`;	
	});
			});

jQuery('#message-form').on('submit',function(e){
e.preventDefault();
			socket.emit('newMessage',{
	text:jQuery('[name=message]').val()});	
	});

		socket.on("disconnect",function()
	     {
		console.log("disconnected from server");
		});
	
//Create module
function getTimeLocal(unix_timestamp){
	var date = new Date(unix_timestamp*1000);
// Hours part from the timestamp
var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;	
}

function currentTime(str){
$("#dt").html(getTimeLocal(str));
}
var longitude,lattitude
      
   
socket.on('newWeather',function(currentWeather){

        

	$("#searchInput").val("");
	var unix_timestamp= `${currentWeather.sys_sunrise}`;
document.getElementById("temp").innerHTML=`${currentWeather.main_temp}`;
document.getElementById("main").innerHTML=`${currentWeather.weather_main}`;
document.getElementById("myImg").src = "http://openweathermap.org/img/w/"+`${currentWeather.weather_icon}`+".png";
document.getElementById("weather_description").innerHTML=`${currentWeather.weather_description}`;
document.getElementById("clouds").innerHTML=`${currentWeather.clouds}`;
$("#coord_lon").html(`${currentWeather.coord_lon}`);
$("#coord_lat").html(`${currentWeather.coord_lat}`);
longitude =`${currentWeather.coord_lon}`;
lattitude =`${currentWeather.coord_lat}`;
console.log('long',longitude,'latt', lattitude);
$("#main_pressure").html(`${currentWeather.main_pressure}`);
$("#main_humidity").html(`${currentWeather.main_humidity}`);
$("#main_temp_min").html(`${currentWeather.main_temp_min}`);
$("#main_temp_max").html(`${currentWeather.main_temp_max}`);

$("#wind_speed").html(`${currentWeather.wind_speed}`);
$("#wind_deg").html(`${currentWeather.wind_deg}`);
$("#sys_sunrise").html(getTimeLocal(`${currentWeather.sys_sunrise}`));
$("#sys_sunset").html(getTimeLocal(`${currentWeather.sys_sunset}`));
	console.log(currentWeather);
    initMap();
setInterval(currentTime(`${currentWeather.dt}`),60000);	




});

function initMap() {
    if(isNaN(longitude))
    {
        lattitude=26.45;
        longitude =80.33 ;
      
    }
        var uluru = {lat:parseInt(lattitude), lng:parseInt(longitude)  };
        console.log(' init long',longitude,'latt', lattitude);
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 6,
          center: uluru,
           mapTypeId:google.maps.MapTypeId.TERRAIN 
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }