// ==============================
// Data (static fallback)
// ==============================

const forecastData = [
  { day: 'Tue', icon: 'assets/images/icon-rain.webp',          alt: 'Rainy',        high: 26, low: 18 },
  { day: 'Wed', icon: 'assets/images/icon-drizzle.webp',       alt: 'Drizzle',      high: 27, low: 19 },
  { day: 'Thu', icon: 'assets/images/icon-sunny.webp',         alt: 'Sunny',        high: 28, low: 20 },
  { day: 'Fri', icon: 'assets/images/icon-partly-cloudy.webp', alt: 'Partly Cloudy',high: 30, low: 21 },
  { day: 'Sat', icon: 'assets/images/icon-storm.webp',         alt: 'Stormy',       high: 28, low: 19 },
  { day: 'Sun', icon: 'assets/images/icon-snow.webp',          alt: 'Snow',         high: 24, low: 17 },
  { day: 'Mon', icon: 'assets/images/icon-fog.webp',           alt: 'Foggy',        high: 22, low: 16 },
];

const hourlyData = [
  { time: '4 PM',  icon: 'assets/images/icon-partly-cloudy.webp', alt: 'Partly Cloudy', temp: 30 },
  { time: '5 PM',  icon: 'assets/images/icon-partly-cloudy.webp', alt: 'Partly Cloudy', temp: 30 },
  { time: '6 PM',  icon: 'assets/images/icon-rain.webp',          alt: 'Rainy',          temp: 30 },
  { time: '7 PM',  icon: 'assets/images/icon-rain.webp',          alt: 'Rainy',          temp: 30 },
  { time: '8 PM',  icon: 'assets/images/icon-drizzle.webp',       alt: 'Drizzle',        temp: 30 },
  { time: '9 PM',  icon: 'assets/images/icon-drizzle.webp',       alt: 'Drizzle',        temp: 30 },
  { time: '10 PM', icon: 'assets/images/icon-fog.webp',           alt: 'Foggy',          temp: 30 },
];

// ==============================
// Render Functions
// ==============================

function renderForecastDays(data) {
  const container = document.getElementById('forecastDays');
  container.innerHTML = data.map(({ day, icon, alt, high, low }) => `
    <div class="day-card">
      <div class="day-name">${day}</div>
      <img src="${icon}" class="day-icon" alt="${alt}" height="32" width="32"/>
      <div class="day-temps">
        <span class="temp-high">${high}°</span>
        <span class="temp-low">${low}°</span>
      </div>
    </div>
  `).join('');
}

function renderHourlyTimes(data) {
  const container = document.getElementById('hourlyTimes');
  container.innerHTML = data.map(({ time, icon, alt, temp }) => `
    <div class="hour-card">
      <div class="hour-icon"><img src="${icon}" alt="${alt}" width="24" height="24"></div>
      <div class="hour-time">${time}</div>
      <div class="hour-temp">${temp}°</div>
    </div>
  `).join('');
}

// ==============================
// Modal
// ==============================

const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeModal = document.getElementById('closeModal');

settingsBtn.addEventListener('click', () => settingsModal.classList.add('active'));
closeModal.addEventListener('click', () => settingsModal.classList.remove('active'));
settingsModal.addEventListener('click', (e) => {
  if (e.target === settingsModal) settingsModal.classList.remove('active');
});

// ==============================
// Units state
// ==============================

const units = {
  temperature: 'celsius',
  wind: 'kmh',
  precipitation: 'mm',
};

document.querySelectorAll('input[name="temperature"]').forEach(i => {
  i.addEventListener('change', () => { units.temperature = i.value; rerenderUnits(); });
});
document.querySelectorAll('input[name="wind"]').forEach(i => {
  i.addEventListener('change', () => { units.wind = i.value; rerenderUnits(); });
});
document.querySelectorAll('input[name="precipitation"]').forEach(i => {
  i.addEventListener('change', () => { units.precipitation = i.value; rerenderUnits(); });
});

// ==============================
// Weather code to icon + label
// ==============================

function getWeatherInfo(code) {
  if (code === 0)  return { icon: 'assets/images/icon-sunny.webp',         alt: 'Clear' };
  if (code <= 2)   return { icon: 'assets/images/icon-partly-cloudy.webp', alt: 'Partly Cloudy' };
  if (code === 3)  return { icon: 'assets/images/icon-partly-cloudy.webp', alt: 'Overcast' };
  if (code <= 49)  return { icon: 'assets/images/icon-fog.webp',            alt: 'Foggy' };
  if (code <= 55)  return { icon: 'assets/images/icon-drizzle.webp',        alt: 'Drizzle' };
  if (code <= 67)  return { icon: 'assets/images/icon-rain.webp',           alt: 'Rain' };
  if (code <= 77)  return { icon: 'assets/images/icon-snow.webp',           alt: 'Snow' };
  if (code <= 82)  return { icon: 'assets/images/icon-rain.webp',           alt: 'Rain Showers' };
  if (code <= 86)  return { icon: 'assets/images/icon-snow.webp',           alt: 'Snow Showers' };
  return                  { icon: 'assets/images/icon-storm.webp',          alt: 'Thunderstorm' };
}

// ==============================
// Unit formatting
// ==============================

function fmtTemp(c) {
  return units.temperature === 'fahrenheit' ? Math.round(c * 9 / 5 + 32) : Math.round(c);
}

function fmtWind(kmh) {
  return units.wind === 'mph'
    ? `${Math.round(kmh * 0.621371)} mph`
    : `${Math.round(kmh)} km/h`;
}

function fmtPrecip(mm) {
  return units.precipitation === 'in'
    ? `${(mm * 0.0393701).toFixed(2)} in`
    : `${mm.toFixed(1)} mm`;
}

// ==============================
// API data cache
// ==============================

let cachedApiData = null;
let cachedLocation = null;
let selectedDayIndex = 0;

// ==============================
// Build arrays from API data
// ==============================

function buildForecastData(apiData) {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return apiData.daily.time.map((dateStr, i) => {
    const { icon, alt } = getWeatherInfo(apiData.daily.weathercode[i]);
    return {
      day:  dayNames[new Date(dateStr).getDay()],
      icon, alt,
      high: fmtTemp(apiData.daily.temperature_2m_max[i]),
      low:  fmtTemp(apiData.daily.temperature_2m_min[i]),
    };
  });
}

function buildHourlyData(apiData, dayIndex) {
  const selectedDate = apiData.daily.time[dayIndex];
  return apiData.hourly.time
    .map((t, i) => ({ t, temp: apiData.hourly.temperature_2m[i], code: apiData.hourly.weathercode[i] }))
    .filter(e => e.t.startsWith(selectedDate))
    .filter((_, i) => i % 3 === 0)
    .slice(0, 7)
    .map(({ t, temp, code }) => {
      const h = new Date(t).getHours();
      const time = h === 0 ? '12 AM' : h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`;
      const { icon, alt } = getWeatherInfo(code);
      return { time, icon, alt, temp: fmtTemp(temp) };
    });
}

// ==============================
// Update current weather card
// ==============================

function updateCurrentCard(apiData, location) {
  const cw = apiData.current_weather;
  const { icon, alt } = getWeatherInfo(cw.weathercode);
  const now = new Date();

  document.querySelector('.location').textContent = `${location.name}, ${location.country}`;
  document.querySelector('.date').textContent = now.toLocaleDateString('en-US', {
    weekday: 'long', month: 'short', day: 'numeric', year: 'numeric',
  });
  document.querySelector('.temperature').textContent = `${fmtTemp(cw.temperature)}°`;
  document.querySelector('.weather-icon img').src = icon;
  document.querySelector('.weather-icon img').alt = alt;

  const todayDate = apiData.daily.time[0];
  const firstHourIdx = apiData.hourly.time.findIndex(t => t.startsWith(todayDate));
  const precip = firstHourIdx >= 0 ? apiData.hourly.precipitation[firstHourIdx] : 0;

  document.querySelectorAll('.stat-value')[0].textContent = `${fmtTemp(cw.temperature - 2)}°`;
  document.querySelectorAll('.stat-value')[1].textContent = `${apiData.daily.precipitation_probability_max?.[0] ?? '--'}%`;
  document.querySelectorAll('.stat-value')[2].textContent = fmtWind(cw.windspeed);
  document.querySelectorAll('.stat-value')[3].textContent = fmtPrecip(precip);
}

// ==============================
// Update day selector
// ==============================

function updateDaySelector(apiData) {
  const fullDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const selector = document.querySelector('.day-selector');
  selector.innerHTML = apiData.daily.time.map((dateStr, i) => {
    const name = fullDays[new Date(dateStr).getDay()];
    return `<option value="${i}" ${i === selectedDayIndex ? 'selected' : ''}>${name}</option>`;
  }).join('');
}

// ==============================
// Re-render with new units
// ==============================

function rerenderUnits() {
  if (!cachedApiData) return;
  updateCurrentCard(cachedApiData, cachedLocation);
  renderForecastDays(buildForecastData(cachedApiData));
  renderHourlyTimes(buildHourlyData(cachedApiData, selectedDayIndex));
}

// ==============================
// Geocoding
// ==============================

async function geocode(query) {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`
  );
  const data = await res.json();
  if (!data.results || data.results.length === 0) throw new Error('Location not found. Try another city.');
  const { latitude, longitude, name, country } = data.results[0];
  return { latitude, longitude, name, country };
}

// ==============================
// Fetch weather
// ==============================

async function fetchWeather(lat, lon) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&hourly=temperature_2m,weathercode,precipitation` +
    `&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,precipitation_probability_max` +
    `&current_weather=true&timezone=auto&forecast_days=7`
  );
  return await res.json();
}

// ==============================
// Error display
// ==============================

function setError(msg) {
  let el = document.getElementById('searchError');
  if (!el) {
    el = document.createElement('p');
    el.id = 'searchError';
    el.style.cssText = 'color:hsl(28,100%,52%);font-size:0.85rem;margin-top:0.5rem;text-align:center;';
    document.querySelector('.search-section').appendChild(el);
  }
  el.textContent = msg;
}

// ==============================
// Search handler
// ==============================

async function handleSearch() {
  const input = document.querySelector('.search-input');
  const query = input.value.trim();
  if (!query) return;

  const btn = document.querySelector('.search-btn');
  btn.textContent = 'Loading...';
  btn.disabled = true;
  setError('');

  try {
    const location = await geocode(query);
    const apiData  = await fetchWeather(location.latitude, location.longitude);

    cachedApiData    = apiData;
    cachedLocation   = location;
    selectedDayIndex = 0;

    updateCurrentCard(apiData, location);
    renderForecastDays(buildForecastData(apiData));
    renderHourlyTimes(buildHourlyData(apiData, 0));
    updateDaySelector(apiData);
  } catch (err) {
    setError(err.message || 'Something went wrong. Please try again.');
  } finally {
    btn.textContent = 'Search';
    btn.disabled = false;
  }
}

// ==============================
// Day selector change
// ==============================

document.querySelector('.day-selector').addEventListener('change', (e) => {
  selectedDayIndex = parseInt(e.target.value);
  if (cachedApiData) renderHourlyTimes(buildHourlyData(cachedApiData, selectedDayIndex));
});

// ==============================
// Search triggers
// ==============================

document.querySelector('.search-btn').addEventListener('click', handleSearch);
document.querySelector('.search-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSearch();
});

// ==============================
// Init — render static data immediately, UI never breaks
// ==============================

renderForecastDays(forecastData);
renderHourlyTimes(hourlyData);