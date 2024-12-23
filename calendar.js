const CLIENT_ID = '592758815562-0534rhf2i89tbabslnne45n1gke3bn97.apps.googleusercontent.com'; // Reemplaza con tu Client ID real
const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

function handleClientLoad() {
    // Carga la API de Google
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
    }).then(() => {
        const authButton = document.getElementById('authorize-button');
        const signOutButton = document.getElementById('signout-button');

        // Configura los botones de autenticación
        authButton.onclick = handleAuthClick;
        signOutButton.onclick = handleSignoutClick;

        // Actualiza el estado de inicio de sesión
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    }).catch((error) => {
        console.error("Error al inicializar la API de Google:", error);
    });
}

function updateSigninStatus(isSignedIn) {
    const authButton = document.getElementById('authorize-button');
    const signOutButton = document.getElementById('signout-button');
    const calendarContainer = document.getElementById('calendar-container');

    if (isSignedIn) {
        console.log("Usuario autenticado");
        authButton.style.display = 'none';
        signOutButton.style.display = 'block';
        calendarContainer.style.display = 'block';
        listUpcomingEvents();
    } else {
        console.log("Usuario no autenticado");
        authButton.style.display = 'block';
        signOutButton.style.display = 'none';
        calendarContainer.style.display = 'none';
    }
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn().catch((error) => {
        console.error("Error al autenticar al usuario:", error);
    });
}

function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut().catch((error) => {
        console.error("Error al cerrar sesión:", error);
    });
}

function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime',
    }).then((response) => {
        const events = response.result.items;
        const calendarDiv = document.getElementById('calendar-container');

        if (events && events.length > 0) {
            calendarDiv.innerHTML = '<h3>Próximas reservas:</h3>';
            events.forEach((event) => {
                const when = event.start.dateTime || event.start.date;
                calendarDiv.innerHTML += `<p>${event.summary} (${when})</p>`;
            });
        } else {
            calendarDiv.innerHTML = '<p>No hay reservas próximas.</p>';
        }
    }).catch((error) => {
        console.error("Error al obtener eventos del calendario:", error);
    });
}
