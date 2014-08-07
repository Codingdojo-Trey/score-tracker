$(document).ready(function(){
	//TREY IS TERRIBLE AT SOCKETS!
	io = io.connect();

	io.on('current_scores', function(data){
		$('#home').children('h1').text(data.score_array[1]);
		$('#away').children('h1').text(data.score_array[0]);

		$('ul').html('');

		for(x in data.logs)
		{
			$('ul').append("<li class='"+data.logs[x].team+"'>player name: "+ data.logs[x].name +" action: "+ data.logs[x].points+" point shot</li>");
		}
	})

	$('#team1 .two, #team2 .two, #team1 .three, #team2 .three').click(function(){

		var points = 3;

		if($(this).hasClass('two'))
		{
			points = 2
		}
		var name = $(this).parent().siblings('.player').text()
		var team = $(this).closest('div').attr('id');
		io.emit('score_update', {points: points, name: name, team: team});
	})
})