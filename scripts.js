document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar-container');
    var dateInput = document.getElementById('dates');
    var cancelButton = document.getElementById('cancel-button');
    let selectionEvent = null;

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        validRange: {
            start: new Date().toISOString().split('T')[0]
        },
        select: function (info) {
            if (selectionEvent) {
                selectionEvent.remove();
            }

            const startDate = info.startStr;
            const endDate = new Date(info.end);
            endDate.setDate(endDate.getDate() - 1);
            const formattedEndDate = endDate.toISOString().split('T')[0];

            dateInput.value = `Fra ${startDate} til ${formattedEndDate}`;

            selectionEvent = calendar.addEvent({
                title: 'Forespørsel',
                start: startDate,
                end: info.endStr,
                color: 'gray'
            });
        },
        events: [
            {
                title: 'Reservasjon',
                start: '2024-12-15',
                end: '2024-12-20',
                color: 'red'
            }
        ]
    });

    calendar.render();

    cancelButton.addEventListener('click', function () {
        dateInput.value = '';
        if (selectionEvent) {
            selectionEvent.remove();
            selectionEvent = null;
        }
    });
});
