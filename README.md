# Frontend Mentor - Weather app solution

This is a solution to the [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

---

## Overview

This weather application was built as an assignment during the She Code Africa Mentorship Program (Cycle 3), a women-in-tech mentorship initiative. The challenge was given to test my understanding of frontend development, API handling, and how to connect user interfaces with real-world data.

The goal of this project was to practice consuming external APIs, improve my JavaScript and asynchronous programming skills, and build a clean, responsive interface that adapts across different screen sizes. The app allows users to search for a location and view real-time weather information, including current conditions, hourly forecasts, and a 7-day forecast, along with additional metrics such as humidity, wind speed, and precipitation.

Through this project, I strengthened my skills in frontend engineering, working with APIs, and building intuitive, user-friendly web applications.

### The challenge

Users should be able to:

- Search for weather information by entering a location in the search bar  
- View current weather conditions including temperature, weather icon, and location details  
- See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts  
- Browse a 7-day weather forecast with daily high/low temperatures and weather icons  
- View an hourly forecast showing temperature changes throughout the day  
- Switch between different days of the week using the day selector in the hourly forecast section  
- Toggle between Imperial and Metric measurement units via the units dropdown  
- View the optimal layout for the interface depending on their device's screen size  
- See hover and focus states for all interactive elements on the page  

---

### Screenshot

![Design preview for the Weather app coding challenge](./preview.jpg)

---

### Links

- Solution URL: [GitHub Repo](https://github.com/DammyD/scamp-weather-app)  
- Live Site URL: [Live Demo]()  

---

## My process

Since, I am revisiting the fundamentals of frontend development, I intentionally chose to build the weather app using vanilla HTML, CSS, and JavaScript, without any frameworks or libraries. My goal was to strengthen my core understanding of how the web works under the hood and improve my problem-solving skills without relying on abstractions.

I started by structuring the layout with semantic HTML to ensure accessibility and clarity. Next, I styled the interface using CSS, focusing on responsive design, layout techniques with Flexbox and Grid, and creating a clean, user-friendly UI. After completing the static layout, I integrated the Open-Meteo API using JavaScript to fetch and display real-time weather data, including current conditions, hourly forecasts, and a 7-day forecast.

Throughout the process, I focused on breaking down the problem into smaller components, handling asynchronous data fetching, and dynamically updating the UI based on user input. This approach helped me reinforce key frontend concepts such as DOM manipulation, event handling, and working with APIs.

### Built with

- Semantic HTML5 markup  
- CSS custom properties  
- Flexbox  
- CSS Grid  
- Mobile-first workflow  
- JavaScript (ES6+)  
- Open-Meteo API  

---

### What I learned

This project helped me strengthen my understanding of:

- Fetching and handling API data using JavaScript  
- Structuring dynamic weather data (current, hourly, and daily forecasts)  
- Working with responsive layouts using Flexbox and CSS Grid  
- Managing UI states such as loading, error, and success states  
- Improving UI/UX with hover and focus states  

Example code I’m proud of:

```js
async function fetchWeather(lat, lon) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&hourly=temperature_2m,weathercode,precipitation` +
    `&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,precipitation_probability_max` +
    `&current_weather=true&timezone=auto&forecast_days=7`
  );
  return await res.json();
}
```

### Continued development

In future projects, I plan to:

- Improve error handling and loading states

- Add location auto-suggestions using a geocoding API

- Implement dark/light mode toggle

- Optimize performance and accessibility

- Refactor JavaScript into reusable modules

### Useful resources

=> Open-Meteo API Documentation
 - Helped me understand how to fetch weather data.

=> MDN Web Docs
 - Used for JavaScript and CSS reference.

### AI Collaboration

I used AI tools (ChatGPT) during this project for:

- Debugging JavaScript issues

- Improving code structure and readability

### Author

Name - Blessing Dawodu

### Acknowledgments

I would like to thank my mentor, **Audrey Zunuoh Ponu**, for recommending this challenge and pointing out corrections and best practice when and where necessary. This project stretched me, especially in the JavaScript and API integration aspects, and helped me grow in my understanding of frontend development. I’m grateful for the support, resources, and encouragement.