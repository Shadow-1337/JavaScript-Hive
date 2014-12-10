var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var ipfilter = require('ipfilter');
var moment = require('moment');
var app = express();
var sleep = require('sleep');

var pool = mysql.createPool({
	connectionLimit: 3000,
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'dayz48'
});

// Init middleware
moment().format();

// Allowed IP's (server IP)
var ips = ['127.0.0.1'];
app.use(ipfilter(ips, {
	mode: 'allow'
}));
app.use(bodyParser());

exports.start = function () {
	app.listen(890);
	console.log('Server running on port 890');
}

app.post('/DayZServlet/lud0/find', function (req, res) {
	console.log('Got find: ' + req.query.uid);

	pool.getConnection(function (err, connection) {
		if (err) {
			console.log(err)
			res.send('{}');
		} else {

			connection.query('SELECT model,x,y,z,queue FROM player WHERE uid = ?', [req.query.uid], function (err, rows, fields) {
				if (err) {
					console.log(err)
					res.send('{}');
					return;
				} 
				connection.release();
		
				if (rows.length == 0) {
					console.log('No data found');
					res.send('{}');
					return;
				}
				// Edit result for sending
				rows[0].pos = [rows[0].x, rows[0].y, rows[0].z];
				delete rows[0].x;
				delete rows[0].y;
				delete rows[0].z;
		
				// Calculate queue
				var queueEnd = moment(rows[0].queue);
				rows[0].queue = -queueEnd.diff(moment(), 'seconds');
		
				res.send(JSON.stringify(rows[0]));
				
			});
		}
	});
});

app.get('/DayZServlet/lud0/load', function (req, res) {
		console.log('Got load: ' + req.query.uid);
	
	pool.getConnection(function (err, connection) {
		if (err) {
			console.log(err)
			res.send('{}');
		} else {
			connection.query('SELECT * FROM player WHERE uid = ?', [req.query.uid], function (err, rows, fields) {
				if (err) {
					console.log(err)
					res.send('{}');
					return;
				} 
				connection.release();
	
				if (rows.length == 0) {
					console.log('No data found');
					res.send('');
					return;
				}
				// Edit result for sending
				rows[0].items = JSON.parse(rows[0].items);
				rows[0].state = JSON.parse(rows[0].state);
				rows[0].pos = [rows[0].x, rows[0].z, rows[0].y];
				rows[0].dir = [rows[0].dir_x, rows[0].dir_y, rows[0].dir_z];
				rows[0].up = [rows[0].up_0, rows[0].up_1, rows[0].up_2];
				delete rows[0].uid;
				delete rows[0].x;
				delete rows[0].y;
				delete rows[0].z;
				delete rows[0].dir_x;
				delete rows[0].dir_y;
				delete rows[0].dir_z;
				delete rows[0].up_0;
				delete rows[0].up_1;
				delete rows[0].up_2;
	
				// Calculate queue
				var queueEnd = moment(rows[0].queue);
				rows[0].queue = -queueEnd.diff(moment(), 'seconds');
	
				//console.log('Sent character data: ' + JSON.stringify(rows[0]));
				res.send(JSON.stringify(rows[0]));
			});
		}
	});
});

app.post('/DayZServlet/lud0/create', function (req, res) {
	console.log('Got create: ' + req.query.uid);
	
	pool.getConnection(function (err, connection) {
		if (err) {
			console.log(err)
			res.send('{}');
		} else {
			
			connection.query('INSERT IGNORE INTO player(uid) VALUES(?)', [req.query.uid], function (err, rows, fields) {
				if (err) {
					console.log(err)
					res.send('{}');
					return;
				} 
				connection.release();
				res.send('{}');
			});
		}
	});
});

app.post('/DayZServlet/lud0/save', function (req, res) {

	console.log('Got save: ' + req.query.uid);
	
	pool.getConnection(function (err, connection) {
		if (err) {
			console.log(err)
			res.send('{}');
		} else {
			connection.query('UPDATE player SET model = ?, alive = ?, items = ?, state = ?, x = ?, z = ?, y = ?, dir_x = ?, dir_y = ?, dir_z = ?, up_0 = ?, up_1 = ?, up_2 = ? WHERE uid = ?', [req.body.model, req.body.alive, JSON.stringify(req.body.items), JSON.stringify(req.body.state), req.body.pos[0], req.body.pos[1], req.body.pos[2], req.body.dir[0], req.body.dir[1], req.body.dir[2], req.body.up[0], req.body.up[1], req.body.up[2], req.query.uid], function (err, rows, fields) {
				if (err) {
					console.log(err)
					res.send('{}');
					return;
				} 
				connection.release();
				res.send('{}');
			});
		}
	});
});

app.post('/DayZServlet/lud0/queue', function (req, res) {

	console.log('Got queue: ' + req.query.uid + ' (' + req.body.queue + 's)');
	
	pool.getConnection(function (err, connection) {
		if (err) {
				console.log(err)
				res.send('{}');
		} else {
			connection.query('SELECT queue FROM player WHERE uid = ?', [req.query.uid], function (err, rows, fields) {
				if (err) {
					console.log(err)
					res.send('{}');
					return;
				} 
					var query = 'UPDATE player SET queue = DATE_ADD(CURRENT_TIMESTAMP,INTERVAL ' + mysql.escape(JSON.stringify(req.body.queue)) + ' SECOND) WHERE uid = ?';
				connection.query(query, [req.query.uid], function (err, rows, fields) {
				if (err) {
					console.log(err)
					res.send('{}');
					return;
				} 
					connection.release();
					res.send('{}');
				});
			});
		}
	});

});

app.post('/DayZServlet/lud0/kill', function (req, res) {
	console.log('Got kill: ' + req.query.uid);

	pool.getConnection(function (err, connection) {
		if (err) {
			console.log(err)
			res.send('{}');
		} else {
			connection.query('DELETE FROM player WHERE uid = ?', [req.query.uid], function (err, rows, fields) {
				if (err) {
					console.log(err)
					res.send('{}');
					return;
				} 
				connection.release();
			});
		}
	});
	res.send('{}');
});

app.post('/DayZServlet/world/add', function (req, res) {
	console.log('Got world add: ' + JSON.stringify(req.body));

	pool.getConnection(function (err, connection) {
		if (err) {
			console.log(err)
			res.send('{}');
		} else {
			connection.query('INSERT INTO dropped_items(type,imp,mt) VALUES(?,?,?)', [req.body.type, req.body.imp, JSON.stringify(req.body.mt)], function (err, rows, fields) {
				if (err) {
					console.log(err)
					res.send('{}');
					return;
				} 
				connection.release();
			});
		}
	});
	res.send('{}');
});

app.post(/.*/, function (req, res) {
	console.log('Got unhandled POST: ' + req.url);
	res.send('404 not found');
});

app.get(/.*/, function (req, res) {
	console.log('Got unhandled GET: ' + req.url);
	res.send('404 not found');
});




var net = require('net');

var HOST = '127.0.0.1';
var PORT = 9433;

net.createServer(function(sock) {
	
	// We have a connection - a socket object is assigned to the connection automatically
	//console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
	
	// Add a 'data' event handler to this instance of socket
	sock.on('data', function(data) {
	
		var response = data.toString().trim();

		if(response.search("Ping") > -1) {
			console.log('Recived Ping');
			sock.write('Pong');
		}


		if(response.search("ObjectIDS") > -1) {
			console.log('Getting Objects IDS');

			pool.getConnection(function (err, connection) {
				if (err) {
					console.log(err)
					sock.write('Empty');
				} else{

					connection.query('SELECT ObjectID FROM objects', function (err, rows, fields) {
						if (err) {
							console.log(err)
							sock.write('Empty');
							return;
						} 
	
						connection.release();
	
						if (rows.length == 0) {
							sock.write('Empty');
						} else {
	
							var ids = '';
							rows.forEach(function(element){
								ids += element.ObjectID+',';
							});
	
							ids = ids.substring(0, ids.length - 1);
							sock.write(ids);

						}
					});
				}
			});
		}

		if(response.search("ObjectSave: ") > -1) {
			//console.log(JSON.parse(response.match(/\[\[.{3,}\]\]/g)[0]));
			//var match = /*JSON.parse*/(response.match(/\[\[.{3,}\]\]/g));
			var match = /\[\["(\d+)","([\w\d_-]+)",(\[[\d,\.\[]+\]\])\],(.*\])\]/g.exec(response);
			if (match) {
				pool.getConnection(function (err, connection) {


				if (err) {
				console.log(err)
				sock.write('Empty');
				} else{

					connection.query('SELECT * FROM objects WHERE ObjectID = ?', [match[1]], function (err, rows, fields) {
						if (err) {
							console.log(err)
							sock.write('Empty');
							return;
						} 

						if (rows.length == 0) {
							console.log("CREATE "+match[1]+" "+match[2]);
							connection.query(
								'INSERT INTO objects(ObjectID,model,position,items,time_created,time_updated) VALUES(?,?,?,?,NOW(),NOW())',
								[match[1],match[2],match[3],match[4]],
								function (err, rows, fields) {
									if (err) console.log(err);
								}
							);
						} else {
							console.log("UPDATE "+match[1]+" "+match[2]);
							connection.query(
								'UPDATE objects SET position=?, items=?, time_updated=NOW() WHERE ObjectID=?',
								[match[3],match[4],match[1]],
								function (err, rows, fields) {
									if (err) console.log(err);
								}
							);
						}
						connection.release();
					});
					}
				});
			}
			sock.write('Ok');
			sleep.sleep(0.01);
		}




		if(response.search("ObjectLoad: ") > -1) {
			var match = JSON.parse(response.match(/\d+/g));
			if (match) {
				var oid = match;
				console.log("LOAD "+oid);
				pool.getConnection(function (err, connection) {


				if (err) {
				console.log(err)
				sock.write('Empty');
				} else{
					connection.query('SELECT * FROM objects WHERE ObjectID = ?', [oid], function (err, rows, fields) {
						if (err) {
							console.log(err)
							sock.write('Empty');
							return;
						} 
						connection.release();

						if (rows.length == 0) {
							console.log("Could not find object.");
								sock.write('Empty');
						} else {
							var ret = '[["'+rows[0].ObjectID+'","'+rows[0].model+'",'+rows[0].position+'],'+rows[0].items+']';
							console.log(ret);
							sock.write(ret);
						}
					});
					}
				});
			} else {
				sock.write('Empty');
		}
		}




		if(response.search("ObjectDelete: ") > -1) {
			var match = JSON.parse(response.match(/\d+/g));
			if (match) {
				var oid = match;
				console.log("Deleting object "+oid);

				pool.getConnection(function (err, connection) {
									if (err) {
				console.log(err)
				sock.write('Empty');
				} else{
					connection.query('DELETE FROM objects WHERE ObjectID = ?', [oid], function (err, rows, fields) {
						if (err) {
							console.log(err)
							sock.write('Empty');
							return;
						} 
						connection.release();
					});
					}
				});
			}
			sock.write('Ok');
		}
		
	});
	
	// Add a 'close' event handler to this instance of socket
	sock.on('close', function(data) {
		//console.log('SOCKET CONNECTION CLOSED');
	});
	sock.on('error', function(data) {
		console.log("Tried to send to a closed socket.");
	});
}).listen(PORT, HOST);

console.log('Socket listening on ' + HOST +':'+ PORT);