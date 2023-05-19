


// document.querySelector('.login-button').addEventListener('click', () => {
//   window.location.href = '/auth/deezer';
// });

document.querySelector('#signup-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = Object.fromEntries(new FormData(event.target));

  fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log('Error:', error);

    });
});



