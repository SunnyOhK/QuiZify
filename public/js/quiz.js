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



  function fetchPreviewTrackUrl() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            const response = xhr.responseText;
            const previewTrackUrl = JSON.parse(response);
            console.log('Fetched preview track URL:', previewTrackUrl);
            resolve(previewTrackUrl);
          } else {
            reject(new Error('Failed to fetch preview track URL'));
          }
        }
      };

      xhr.open('GET', '/quiz');
      xhr.send();
      console.log('Fetching preview track URL...');
    });
  }


  async function init() {
    try {
      const previewTrackUrl = await fetchPreviewTrackUrl();
      updateAudioSource(previewTrackUrl);
    } catch (error) {
      console.error(error);
    }
  }

  const playButton = document.getElementById('play-button');
  playButton.addEventListener('click', togglePlay);

  init();


