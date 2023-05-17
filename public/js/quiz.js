const audioPlayer = document.getElementById("audioPlayer");
const audioSource = document.getElementById("audioSource");
const playButton = document.getElementById("play-button");
const previewTrackUrl = audioPlayer.dataset.previewTrackUrl;

audioSource.src = previewTrackUrl;
audioPlayer.load();

playButton.addEventListener("click", () => {
  audioPlayer.play();
});