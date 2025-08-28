  // Check if the visitor count exists in localStorage
  let visitorCount = localStorage.getItem('visitorCount');

  // If it doesn't exist, initialize its
  if (!visitorCount) {
    visitorCount = 0;
  }

  // Increment the count
  visitorCount++;

  // Update the visitor count in localStorage
  localStorage.setItem('visitorCount', visitorCount);

  // Display the updated count
  document.getElementById('visitor-count').textContent = visitorCount;
 
  const tickerContent = document.getElementById('tickerContent');

  function updateTicker(location) {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
  
    tickerContent.innerHTML = `Date: ${date} | Time: ${time} | Location: ${location}`;
  }
  
  function fetchLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
  
          fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`)
            .then((response) => response.json())
            .then((data) => {
              const location = data.address.city || data.address.state || 'Unknown Location';
              setInterval(() => updateTicker(location), 1000);
            })
            .catch(() => {
              setInterval(() => updateTicker('Unable to retrieve location'), 1000);
            });
        },
        () => {
          setInterval(() => updateTicker('Location access denied'), 1000);
        }
      );
    } else {
      setInterval(() => updateTicker('Geolocation not supported'), 1000);
    }
  }
  
  fetchLocation();
  