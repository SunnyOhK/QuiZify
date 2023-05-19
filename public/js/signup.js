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
    .then(response => {
      if (!response.ok) { 
        return response.json().then(err => Promise.reject(err)); 
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log('Error:', error);
    });
});
