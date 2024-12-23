const CLIENT_ID = 'TU_CLIENT_ID';
const API_KEY = 'TU_API_KEY'; // Si lo tienes disponible

const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY, // Opcional, puedes omitir si no lo tienes
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
    }).then(() => {
        const authButton = document.getElementById('authorize-button');
        const signOutButton = document.getElementById('signout-button');

        authButton.onclick = handleAuthClick;
        signOutButton.onclick = handleSignoutClick;

        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        document.getElementById('calendar-container').style.display = 'block';
        listUpcomingEvents();
    } else {
        document.getElementById('calendar-container').style.display = 'none';
    }
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
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

        if (events.length > 0) {
            calendarDiv.innerHTML = '<h3>Próximas reservas:</h3>';
            events.map((event) => {
                const when = event.start.dateTime || event.start.date;
                calendarDiv.innerHTML += `<p>${event.summary} (${when})</p>`;
            });
        } else {
            calendarDiv.innerHTML = '<p>No hay reservas próximas.</p>';
        }
    });
}
