Tone.Transport.bpm.value = 90;

var drums = new Tone.MultiPlayer({
			urls : {
				"hihat" : "../samples/hihat.wav",
        "snare": "../samples/snare.wav",
        "kick": "../samples/kick.wav",
        "drum1" : "../samples/drum1.wav",
        "drum2" : "../samples/drum2.wav",
        "drum3" : "../samples/drum3.wav"
			},
			volume : -10,
			fadeOut : 0.1,
		}).toMaster();

function triggerDrums(drumMatrix, time, col) {
    var column = drumMatrix.matrix[col];
    for (var i = 0; i < column.length; i++) {
      if (column[0] === 1) {
        drums.start('drum1', time, 0, "16n", 0, audioSettings.drum1vol)
      }
      if (column[1] === 1) {
        drums.start('drum1', time, 0, "16n", 0, audioSettings.drum2vol)
      }
      if (column[2] === 1) {
        drums.start('drum1', time, 0, "16n", 0, audioSettings.drum3vol)
      }
      if (column[3] === 1) {
        drums.start('hihat', time, 0, "16n", 0, audioSettings.hihatvol)
      }
      if (column[4] === 1) {
        drums.start('snare', time, 0, "16n", 0, audioSettings.snarevol)
      }
      if (column[5] === 1) {
        drums.start('kick', time, 0, "16n", 0, audioSettings.kickvol)
      }
   
    }
    drumMatrix.place = col;
}
