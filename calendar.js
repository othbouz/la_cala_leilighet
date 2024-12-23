const CALENDAR_ID = 'lacalaleilighet@gmail.com'; // Reemplaza con el ID de tu calendario
const API_KEY = 'AIzaSyBn49YdFAK-QlqGPpuU7WNTKeEs92_VPwQ'; // Reemplaza con tu Clave de API

function loadCalendar() {
    const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&timeMin=${new Date().toISOString()}&singleEvents=true&orderBy=startTime`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const events = data.items;
            const calendarContainer = document.getElementById('calendar-container');
            calendarContainer.innerHTML = '<h3>Próximas reservas:</h3>';

            if (events && events.length > 0) {
                events.forEach(event => {
                    const when = event.start.dateTime || event.start.date;
                    const eventElement = document.createElement('p');
                    eventElement.textContent = `${event.summary} (${when})`;
                    calendarContainer.appendChild(eventElement);
                });
            } else {
                calendarContainer.innerHTML += '<p>No hay reservas próximas.</p>';
            }
        })
        .catch(error => {
            console.error('Error al cargar el calendario:', error);
            document.getElementById('calendar-container').innerHTML = '<p>Error al cargar las reservas.</p>';
        });
}

document.addEventListener('DOMContentLoaded', loadCalendar);
