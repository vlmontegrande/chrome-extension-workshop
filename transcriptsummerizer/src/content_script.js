import { GoogleGenerativeAI } from "@google/generative-ai";
import {env_var} from "./env"

const genAI = new GoogleGenerativeAI(env_var.GEMINI_API_KEY);

//-------------------ACTIVITY 2 -----------------
async function clickAttachmentsButton() {
    // Get the html button of the Attachements tab using document.querySelector()
    const attachmentsButton = document.querySelector("#tab-attachments-tab > span"); 
    
    if (attachmentsButton) {
        attachmentsButton.click();
    
        // Give a little bit of time to process
        await new Promise(resolve => setTimeout(resolve, 1000));
    } else {
        alert('Attachments button not found.');
    }

}

async function fetchTranscriptData() {
    // Get the html of the download transcript button

    const downloadLinkButton = document.querySelector("a.js-download-attachment-link");
    
    if (!downloadLinkButton) {
        throw new Error('Download link not found.');
    }
    

    // Extract the url from the element using .getAttribute
    const url = downloadLinkButton.getAttribute("href");
    
    // Fetch the url
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok :(');
    }

    return response.text();
}


//-------------------ACTIVITY 3 -----------------
async function paraphraseTranscript(data) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const prompt = "Write a detailed summary of the following college lecture transcript. Make sure to include key points related to the subject: " + data + " Put it in markdown.";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    chrome.runtime.sendMessage({ data: text });
}

async function downloadAndParaphraseTranscript() {
    try {
        const data = await fetchTranscriptData();
        await paraphraseTranscript(data);
    } catch (error) {
        console.error('Error in processing transcript:', error);
        chrome.runtime.sendMessage({ error: error.message });
    }
}

async function executeTasks() {
    await clickAttachmentsButton();
    await downloadAndParaphraseTranscript(); 
}

executeTasks();