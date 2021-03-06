document.querySelector('#submit').addEventListener('click', submit);

function submit() {
  var track_input = document.querySelector('#track');
  var artist_input = document.querySelector('#artist');
  var track_name = track_input.value;
  var artist_name = artist_input.value;
  if (track_name && artist_name) {
    ajax('/favorite-song/tracks', 'POST', {track_name: track_name, artist_name: artist_name}, function (response) {
      track_input.value = '';
      artist_input.value = '';		
      try {
        if (JSON.parse(response)) {
          window.location.href = "/favorite-song/newest";
        } else {
          throw 'error';
        }
      } catch (e) {
        error(e);
      }
    });
  } else {
    error('Song or Artist field cannot be left blank');
  }
}

function error(error_text) {
  console.log(error_text);
}
