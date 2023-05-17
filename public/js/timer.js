function startTimer() {
  var timerEl = document.querySelector('.timer');
  time = setInterval(function () {
    secondsLeft--;
    timerEl.textContent = ":" + secondsLeft;
    if (isQuizOver()) {
      // Stops execution of action at set interval.
      clearInterval(time);
      endQuiz();
      return;
    }
  }, 1000);
}