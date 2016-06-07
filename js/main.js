var audio;

//Hide pause button
$("#pause").hide();

//initialize
initAudio($("#playlist li:first-child"));


//initializer function
function initAudio(element) {
	var song = element.attr("song");
	var title = element.text();
	var cover = element.attr("cover");
	var artist = element.attr("artist");

	//create audio obj
	
	audio = new Audio("media/" + song);
	
	if(!audio.currentTime) {
		$("#duration").html("0:00");
	}
	
	$("#audio-info .title").text(title);
	$("#audio-info .artist").text(artist);
	
	//insert cover
	$("img.cover").attr("src", "images/covers/" + cover);
	
	$("#playlist li").removeClass("active");
	element.addClass("active");
}

//play button
$("#play").click(function() {
	audio.play();
	$("#play").hide();
	$("#pause").show();
	$("#duration").fadeIn(400);
	showDuration();
});

//pause button
$("#pause").click(function() {
	audio.pause();
	$("#pause").hide();
	$("#play").show();
	
});

//stop button
$("#stop").click(function() {
	audio.pause();
	audio.currentTime = 0;
	$("#pause").hide();
	$("#play").show();
	$("#duration").fadeOut(400);
});

//next button
$("#next").click(function() {
	audio.pause();
	var next = $("#playlist li.active").next();
	
	if(next.length == 0) {
		next = $("#playlist li:first-child");
	}
	
	initAudio(next);
	audio.play();
	showDuration();
});

//previous button
$("#prev").click(function() {
	audio.pause();
	var prev = $("#playlist li.active").prev();
	
	if (prev.length == 0) {
		prev = $("#playlist li:last-child");
	}
	
	initAudio(prev);
	audio.play();
	showDuration();
});

//valume
$("#volume").change(function() {
	audio.volume = parseFloat(this.value / 10);
});

//time duration
function showDuration() {
	$(audio).bind("timeupdate", function() {
		//Get hours and minutes
		var s = parseInt(audio.currentTime % 60);
		var m = parseInt((audio.currentTime) / 60) % 60;
		//Add 0 if less than 10
		if(s < 10) {
			s = "0" + s;
		}
		$("#duration").html(m + ":" + s);
		var value = 0;
		if(audio.currentTime > 0) {
			value = Math.floor((100 / audio.duration) * audio.currentTime)
		}
		$("#progress").css("width", value+"%");
	});
}