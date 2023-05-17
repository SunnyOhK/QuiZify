
function updateAudioSource(previewTrackUrl) {
  const audio = document.getElementById('audioPlayer');
  audio.src = previewTrackUrl;
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

init();
