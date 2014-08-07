module.exports = function Route(app){
	var scores = [0, 0];

	var most_recent_buckets = [];

	app.get('/', function(req, res){
		res.render('index', {title: 'BASKETBALL!'})
	});

	//when the user connects, send him/her the scores
	app.io.on('connection', function(socket){
		//we don't use the normal socket syntax with the pre-made events
		socket.emit('current_scores', {score_array: scores, logs: most_recent_buckets});
	})

	app.io.route('score_update', function(update){
		//team1 is the away team (0 index), team2 is home (1 index)
		if(update.data.team == 'team1')
		{
			scores[0] += update.data.points;
		}
		else
		{
			scores[1] += update.data.points;
		}

		if(most_recent_buckets.length > 5)
		{
			most_recent_buckets.pop();
		}

		most_recent_buckets.unshift({points: update.data.points, name: update.data.name, team: update.data.team})
		app.io.broadcast('current_scores', {score_array: scores, logs: most_recent_buckets})
	})
}