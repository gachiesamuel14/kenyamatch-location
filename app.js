// Mock users for Kenya location-based dating demo
const mockUsers = [
  { name: "Amina", age: 24, county: "Nairobi", bio: "Love hiking and chai. Looking for genuine connection.", interests: "Travel, Music, Cooking", photo: "https://picsum.photos/id/1011/300/300", lat: -1.286389, lng: 36.817223 },
  { name: "Brian", age: 28, county: "Mombasa", bio: "Beach lover, software engineer. Swipe right if you like sunsets.", interests: "Tech, Beach, Football", photo: "https://picsum.photos/id/1005/300/300", lat: -4.043477, lng: 39.668206 },
  { name: "Faith", age: 22, county: "Kisumu", bio: "Student, church girl, enjoys Sheng banter.", interests: "Faith, Reading, Dancing", photo: "https://picsum.photos/id/1027/300/300", lat: -0.091702, lng: 34.767956 },
  { name: "David", age: 32, county: "Kiambu", bio: "Professional, family-oriented. Coffee dates preferred.", interests: "Business, Sports, Food", photo: "https://picsum.photos/id/1012/300/300", lat: -1.1714, lng: 36.8356 },
  { name: "Mercy", age: 26, county: "Nakuru", bio: "Nature lover, Rift Valley views. Open to serious relationship.", interests: "Nature, Photography, Cooking", photo: "https://picsum.photos/id/1015/300/300", lat: -0.3031, lng: 36.0800 }
];

let currentUserLocation = null;

document.getElementById('loginBtn').addEventListener('click', () => {
  // Simple mock login
  alert('Welcome to KenyaMatch! (Demo mode - full auth coming soon)');
  document.querySelector('.hero').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  requestLocation();
});

function requestLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        currentUserLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        console.log('Location acquired:', currentUserLocation);
        renderMatches();
      },
      () => {
        alert('Location permission denied. Showing all matches.');
        renderMatches();
      }
    );
  } else {
    renderMatches();
  }
}

function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function renderMatches() {
  const container = document.getElementById('matches');
  const countyFilter = document.getElementById('county').value;
  const ageFilter = document.getElementById('age').value;

  let filtered = mockUsers.filter(user => {
    if (countyFilter !== 'all' && user.county !== countyFilter) return false;
    if (ageFilter !== 'all') {
      const [min, max] = ageFilter.split('-').map(Number);
      if (max && (user.age < min || user.age > max)) return false;
      if (!max && user.age < min) return false;
    }
    return true;
  });

  if (currentUserLocation) {
    filtered = filtered.map(u => ({
      ...u,
      distance: calculateDistance(currentUserLocation.lat, currentUserLocation.lng, u.lat, u.lng).toFixed(1)
    })).sort((a, b) => a.distance - b.distance);
  }

  container.innerHTML = filtered.map(user => `
    <div class="card" onclick="openProfile('${user.name}')">
      <img src="${user.photo}" alt="${user.name}">
      <div class="card-info">
        <h3>${user.name}, ${user.age}</h3>
        <p>${user.county}${user.distance ? ` • ${user.distance} km away` : ''}</p>
        <p>${user.bio.substring(0, 60)}...</p>
      </div>
    </div>
  `).join('');
}

function openProfile(name) {
  const user = mockUsers.find(u => u.name === name);
  if (!user) return;
  document.getElementById('modalName').textContent = `${user.name}, ${user.age}`;
  document.getElementById('modalPhoto').src = user.photo;
  document.getElementById('modalBio').textContent = user.bio;
  document.getElementById('modalCounty').textContent = user.county;
  document.getElementById('modalInterests').textContent = user.interests;
  document.getElementById('profileModal').classList.remove('hidden');
}

document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('profileModal').classList.add('hidden');
});

document.getElementById('findNearby').addEventListener('click', renderMatches);

// Like / Pass mock
document.querySelector('.like').addEventListener('click', () => {
  alert('Liked! Match feature coming soon (real-time chat next).');
  document.getElementById('profileModal').classList.add('hidden');
});

document.querySelector('.pass').addEventListener('click', () => {
  document.getElementById('profileModal').classList.add('hidden');
});