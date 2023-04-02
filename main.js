// Add event listener to form for when the form is submitted
document.querySelector('#zipForm').addEventListener('submit', getLocationInfo);

// Add event listener for delete
// Delete is inside of the for loop ('forEach()'), therefore need form validation
// Listen on the document body
document.querySelector('body').addEventListener('click', deleteLocation);


function getLocationInfo(e) {
  console.log('in getLocationInfo');

  // Get zip code value from input
  const zip = document.querySelector('.zip').value;
  console.log(zip);

  // Make request to API using Fetch
  fetch(`http://api.zippopotam.us/us/${zip}`)
    // Returns a promise
    .then(response => {
      console.log(response.status);
      if(response.status != 200) {
        showIcon('remove');
        document.querySelector('#output').innerHTML =
        `
        <article class="message is-danger">
          <div class="message-body">
            Invalid Zip Code.
            Please try again.
          </div>
        </article>
        `;
        throw Error(response.statusText);
      } else {
        showIcon('check');
        return response.json();
      }
    })
    .then(data => {
      console.log(data);
      // Loop through places array and display
      // Create variable for output and set it to nothing
      let output = '';
      data.places.forEach(place => {
        output += `
          <article class="message is-primary">
            <div class="message-header">
              <p>Location Info</p>
              <button class="delete"></button>
            </div>
            <div class="message-body">
              <ul>
                <li><strong>City: </strong>${place['place name']}</li>
                <li><strong>State: </strong>${place['state']}</li>
                <li><strong>Latitude: </strong>${place['latitude']}</li>
                <li><strong>Longitude: </strong>${place['longitude']}</li>
              </ul>
            </div>
          </article>
        `;
      })

      // Insert into output div
      document.querySelector('#output').innerHTML = output;
    })
    .catch(err => console.log(err));

  e.preventDefault();
}

// Show check or remove icon
function showIcon(icon) {
  // Clear icons
  document.querySelector('.icon-remove').style.display = 'none';
  document.querySelector('.icon-check').style.display = 'none';
  // Show correct icon
  document.querySelector(`.icon-${icon}`).style.display = 'inline-flex';
}

// Delete location box
function deleteLocation(e) {
  console.log('in deleteLocation');
  // Make sure that what we click has a class of 'delete'
  if(e.target.className == 'delete') {
    console.log(123);
    document.querySelector('.message').remove();
    document.querySelection('.zip').value = '';
    document.querySelector('.icon-check').remove();
  }
}