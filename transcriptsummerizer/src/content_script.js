async function clickAttachementsButton() {
    // Get the html button of the Attachements tab using document.querySelector()
    // const attachmentsButton = TODO
    
    if (attachmentsButton) {
        // TODO Click on the button using .click()
        
    
        // Give a little bit of time to process
        await new Promise(resolve => setTimeout(resolve, 1000));
    } else {
        alert('Attachments button not found.');
    }

}

async function fetchTranscriptData() {
    // Get the html of the download transcript button
    // const downloadLinkButton = TODO
    
    if (!downloadLinkButton) {
        throw new Error('Download link not found.');
    }

    // Extract the url from the element using .getAttribute
    // const url = TODO
    
    // Fetch the url
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.text();
}