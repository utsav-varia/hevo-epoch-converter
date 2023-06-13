let popupElement = null;

function convertToTimestamp(epochTime) {
    if (epochTime.length == 10) {
        epochTime += '000';
    }
    const timestamp = parseInt(epochTime, 10);
    if (isNaN(timestamp)) {
        return null;
    }

    const date = new Date(timestamp);
    const options = {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };

    const gmtTimestamp = date.toLocaleString('en-US', { ...options, timeZone: 'UTC' }).replace(/,/g, '');;
    const browserTimestamp = date.toLocaleString('en-US', options).replace(/,/g, '');;

    return {
        gmt: gmtTimestamp,
        browser: browserTimestamp
    };
}

function showPopup(timestamps, posX, posY) {
    if (popupElement) {
        popupElement.remove();
    }

    popupElement = document.createElement('div');
    popupElement.id = 'timestamp-popup';
    popupElement.style.padding = '5px';
    popupElement.style.position = 'absolute';
    popupElement.style.top = `${posY - 75}px`;
    popupElement.style.left = `${posX - 125}px`;
    popupElement.style.fontSize = '15px';
    popupElement.style.color = 'white';
    popupElement.style.backgroundColor = '#0291e3';
    popupElement.style.border = 'thin solid white';
    popupElement.style.boxShadow = '2px 2px 4px #ddd';

    const gmtDiv = document.createElement('div');
    gmtDiv.textContent = `GMT : ${timestamps.gmt}`;
    gmtDiv.style.borderBottom = '1px solid white';
    gmtDiv.style.paddingBottom = '6px';

    const browserDiv = document.createElement('div');
    browserDiv.textContent = `Local: ${timestamps.browser}`;
    browserDiv.style.paddingTop = '5px';

    popupElement.appendChild(gmtDiv);
    popupElement.appendChild(browserDiv);

    document.body.appendChild(popupElement);
}

document.addEventListener('selectionchange', () => {
    if (popupElement) {
        popupElement.remove();
        popupElement = null;
    }
});

document.addEventListener('mouseup', (event) => {

});

document.addEventListener('mouseup', (event) => {
    try {
        const selection = window.getSelection().toString();
        if (selection != null && selection != "") {
            const timestamps = convertToTimestamp(selection);
            if (timestamps) {
                const posX = event.pageX;
                const posY = event.pageY;
                showPopup(timestamps, posX, posY);
            }
        }
    } catch (error) {
        console.log("error: ", error);
    }
});
