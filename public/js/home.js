var popover = new bootstrap.Popover(document.getElementById('popover'), {
  container: 'body'
})


document.querySelector('.login-button').addEventListener('click', () => {
  window.location.href = '/auth/deezer';
});

