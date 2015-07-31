# Titanium mobile iOS audio streaming module (with seek).

- Updated for 4.1.0.GA 
- Start to make compatible with Ti.Media.audioPlayer when used for a cross-platform iOS/Android app. 

Often, after pausing an mp3 using Ti.Media.audioPlayer (or this module) for a while, the playback of the resumed audio can stop before it should. 

The example.js included, shows how the seek method before un-pausing ensures that the rest of playback happens as it should. 

Why has the core Ti.Media.audioPlayer not got this by default?

-----



