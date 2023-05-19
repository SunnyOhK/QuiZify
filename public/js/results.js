document.getElementById('play-again-btn').addEventListener('click', function () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/clear-session', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      window.location.href = '/quiz';
    }
  }
  xhr.send();
});