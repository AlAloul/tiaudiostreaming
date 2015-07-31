
// open a single window
var window = Ti.UI.createWindow({
  backgroundColor:'white'
});

// TODO: write your module tests here
var tiaudiostreaming = require('com.tiaudiostreaming');

var tiplayer = tiaudiostreaming.createPlayer();
tiplayer.url = "https://archive.org/download/testmp3testfile/mpthreetest.mp3"; 


var is_paused = false;

var seeking = false;

var time_paused = 0;

var player_states = [
  'AS_INITIALIZED',
  'AS_STARTING_FILE_THREAD',
  'AS_WAITING_FOR_DATA',
  'AS_FLUSHING_EOF',
  'AS_WAITING_FOR_QUEUE_TO_START',
  'AS_PLAYING',
  'AS_BUFFERING',
  'AS_STOPPING',
  'AS_STOPPED',
  'AS_PAUSED'
];

tiplayer.addEventListener('change', function(e){

  console.log('change: '+e.state + ' : '+player_states[e.state]);

  msg.text = player_states[e.state];

  if(player_states[e.state]=='AS_PAUSED'){
    is_paused = true;
    console.log('paused at : '+e.source.progress);
    time_paused = e.source.progress;

  } else if(player_states[e.state]=='AS_PLAYING'){

    if(seeking===true){
      return;
    }

    if(e.source.progress > time_paused){
      time_paused = 0;
    }

    is_paused = false;

  } else {
    is_paused = false;
   
  }

});


tiplayer.addEventListener('progress', function(e){

  if( player_states[e.source.state]=='AS_PLAYING'){
    console.log(Math.round(e.progress) + ' / ' + Math.round(e.duration));
    prog.text = Math.round(e.progress) + ' / ' + Math.round(e.duration);

    console.log(e.source.playing);
  }


});


var start = Ti.UI.createButton({
  top:12,
  height:64,
  title:'start'
});
start.addEventListener('click', function(e){
  tiplayer.seek(0);
  tiplayer.start();
});

var pause = Ti.UI.createButton({
  top:80,
  height:64,
  title:'pause'
});
pause.addEventListener('click', function(e){

  if(is_paused===false){
    console.log('pausing');
    tiplayer.pause();
  } else {
    console.log('resuming at : '+time_paused);

    // Often, after pausing the mp3 for a while, the playback can end before it should. 
    // Uses the seek here to ensure that the rest of playback happens as it should. 
    tiplayer.seek(parseFloat(time_paused / 1000));
    tiplayer.pause();

  }
});

var stop = Ti.UI.createButton({
  top:150,
  height:64,
  title:'stop'
});
stop.addEventListener('click', function(e){
  tiplayer.stop();
});


var msg = Ti.UI.createLabel({
  text:'ready',
  top:250,
  width:Ti.UI.SIZE
});

var prog = Ti.UI.createLabel({
  text:'00/00',
  top:290,
  width:Ti.UI.SIZE
});


window.add(start);
window.add(stop);
window.add(pause);
window.add(msg);
window.add(prog);

window.open();