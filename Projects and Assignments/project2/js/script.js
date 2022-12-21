"use strict";
window.onload = init;

const dogSelect = document.querySelector("#searchterm");
const amountSelect = document.querySelector("#numDogs");
const prefix = "jkt1886-";
const dogKey = prefix + "dog";
const amountKey = prefix + "amount";
const storedDog = localStorage.getItem(dogKey);
const storedAmount = localStorage.getItem(amountKey);
let num;
let breed;



dogSelect.onchange = e => { localStorage.setItem(dogKey, e.target.value); };
amountSelect.onchange = e => { localStorage.setItem(amountKey, e.target.value); };

function init() {
    document.querySelector("#search").onclick = getData;
    document.querySelector("#searchRand").onclick = getDataRand;

    if (storedDog) {
        dogSelect.querySelector(`option[value='${storedDog}']`).selected = true;
    }
    
    if (storedAmount) {
        amountSelect.querySelector(`option[value='${storedAmount}']`).selected = true;
    }
}

function getData() {
    // 1 - main entry point to web service
    const SERVICE_URL = "https://dog.ceo/api/breed/";

    let url = SERVICE_URL;

    breed = document.querySelector("#searchterm").value;
    num = document.querySelector("#numDogs").value;

    url += `${breed}/images/random/${num}`;
    // 3 - parse the user entered term we wish to search
    // not necessary for this service endpoint

    // 4 - update the UI
    document.querySelector("#debug").innerHTML = `<b>Querying web service with:</b> <a href="${url}" target="_blank">${url}</a>`;

    // 5 - create a new XHR object
    let xhr = new XMLHttpRequest();

    // 6 - set the onload handler
    xhr.onload = dataLoaded;

    // 7 - set the onerror handler
    xhr.onerror = dataError;

    // 8 - open connection and send the request
    xhr.open("GET", url);
    xhr.send();
}

function getDataRand() {
    const SERVICE_URL = "https://dog.ceo/api/breeds/image/random/";
    let url = SERVICE_URL;
    num = Math.floor(Math.random() * 51);

    url += `${num}`;

    document.querySelector("#debug").innerHTML = `<b>Querying web service with:</b> <a href="${url}" target="_blank">${url}</a>`;

    let xhr = new XMLHttpRequest();
    xhr.onload = dataLoaded;
    xhr.onerror = dataError;
    xhr.open("GET", url);
    xhr.send();
}

function dataError(e) {
    console.log("An error occurred");
}

function dataLoaded(e) {
    // 1 - e.target is the xhr object
    let xhr = e.target;

    // 2 - xhr.responseText is the JSON file we just downloaded
    console.log(xhr.responseText);

    // 3 - turn the text into a parsable JavaScript object
    let obj = JSON.parse(xhr.responseText);

    // 4 - if there are no results, print a message and return
    // Here, we don't get an array back, but instead a single object literal with 2 properties
    if (obj.status != "success") {
        document.querySelector("#content").innerHTML = "<p><i>There was a problem!</i></p>";
        return; // Bail out
    }

    // 5 - if there is an array of results, loop through them
    let results = obj.data
    let bigString = "";

    for (let i = 0; i < obj.message.length; i++) {
        console.log(obj.message[i]);

        let line = `<div class='result'><img src= '${obj.message[i]}'/></div>`;
        bigString += line;
    }

    document.querySelector("#debug").innerHTML = `Found ${num} dog(s)`;

    // 6 - display final results to user
    document.querySelector("#content").innerHTML = bigString;
}