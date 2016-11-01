var empty = [3,3];
var blanks = [];
var first;
var inProgress= false;

$(document).ready(function(){
	var horz = 0;
	var j = 0;
	var x = 0;
	var y = 0;
	$("#puzzlearea>div").each(function(){
		$(this).addClass("puzzlepiece");
		first = $("#puzzlearea>div:first-child").position();
		x = first.left+(98*horz);
		y = first.top+(98*j);
		$(this).css({
			"top": y,"left": x
		});
		if(horz<3){
			horz++;
		}else{
			horz=0;	
			j++;
		}
		$(this).css({
			"background-position-x":0-x,"background-position-y":+0-y
		});

	});	

	for(var horz = 0;horz < 4;horz++){
		for(var j = 0;j < 4;j++){
			blanks.push([horz,j]);
		}
	}

	$("#shufflebutton").click(function()
	{
		var x = Math.floor(Math.random()*128);
	for(var horz=16;horz<x;horz++){
		var a=[];
	$(".movablepiece").each(function(){
		a.push($(this));
	});
	var horz= Math.floor(Math.random()*a.length);
	var newPos = empty;
	empty = getSpace(a[horz]);
	move(a[horz],newPos);		}
	});	
	canMove();
});


function canMove(){
	$(".puzzlepiece").each(function(){
		$(this).off();
		if($(this).hasClass("movablepiece")){
			$(this).removeClass("movablepiece");		
		}
		
		if(isBeside(getSpace($(this)),empty)){
			$(this).addClass("movablepiece");
			$(this).click(function(){
				var newPos = empty;
				empty = getSpace($(this));
				move($(this),newPos);
			});
		}		
	})
}

function getSpace(el){
	var p = el.position();
	var x = Math.ceil((p.left-first.left)/98);
	var y = Math.ceil((p.top-first.top)/98);	
	return [x,y];
}

function isBeside(a,b){
	if(a[0]===b[0]){
		return a[1]+1===b[1] || a[1]-1===b[1];
	}else if(a[1]===b[1]){
		return a[0]+1===b[0] || a[0]-1===b[0];
	}else{
		return false;
	}
}

function move(a,space){
	if(a.hasClass("movablepiece")){
		var x = first.left+(98*space[0]);
		var y = first.top+(98*space[1]);
		a.animate({
			top: y,
			left: x
		});
		a.css({
			"top": y,9"left": x
		});
		canMove();
	}	
}
