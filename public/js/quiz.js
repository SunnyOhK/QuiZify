document.addEventListener('DOMContentLoaded', () => {
  let isPlaying = false;
  let timerInterval = null;
  let remainingTime = 30;

  function updateAudioSource(previewTrackUrl) {
    const audio = document.getElementById('audioPlayer');
    audio.src = previewTrackUrl;
  }

  function togglePlay() {
    const audio = document.getElementById('audioPlayer');
    const playButton = document.getElementById('play-button');

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
      startTimer();
    }

    isPlaying = !isPlaying;
    playButton.textContent = isPlaying ? 'Pause' : 'Play';
  }

  function startTimer() {
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = remainingTime;

    timerInterval = setInterval(() => {
      remainingTime--;
      if (remainingTime >= 0) {
        timerDisplay.textContent = remainingTime;
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);
  }

  function fetchPreviewTrackUrl(artistId) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            const previewTrackUrl = response.previewTrackUrl;
            console.log('Fetched preview track URL:', previewTrackUrl);
            resolve(previewTrackUrl);
          } else {
            reject(new Error('Failed to fetch preview track URL'));
          }
        }
      };

      const url = artistId ? `/quiz/?artistId=${artistId}` : '/quiz';
      xhr.open('GET', url);
      xhr.send();
      console.log('Fetching preview track URL...');
    });
  }

  async function nextRound(artistId) {
    try {
      const previewTrackUrl = await fetchPreviewTrackUrl(artistId);
      updateAudioSource(previewTrackUrl);
    } catch (error) {
      console.error(error);
    }
  }

  document.querySelector('.name-box').addEventListener('click', function (event) {
    if (event.target.matches('.name-choice')) {
      console.log('Button was clicked!');
      const artistId = event.target.getAttribute('data-artist-id');
      nextRound(artistId);
    }
  });

  nextRound();
});
