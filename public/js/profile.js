const renderQueue = async () => {
  const response = await fetch('/api/songs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};


document.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-icon')) {
    const songId = event.target.dataset.songId;
    // Send a delete request to the server
    fetch(`/songs/${songId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
        } else {
          throw new Error('Failed to delete song');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
});

document
  .getElementById('logout')
  .addEventListener('click', logout);

