//The print hello functionality
function printSayHello(){
    helloResponse = document.getElementById('helloResponse');
    helloResponse.innerText = "Hello Liam!"
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('testHello')
    .addEventListener('click', printSayHello);
});

//The test cloud function functionality
const testSend = document.querySelector("#testSend");
const answer = document.querySelector("#answer");


function callTest(){

    console.log("the callTest function has been successfully called")
    
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://europe-west2-allotment-book.cloudfunctions.net/app");
    xhr.setRequestHeader("Content-Type", "application/json");
    
    let data = `
        {
            "name": "Liam"
        }
    `
    
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr.status);
        answer.innerHTML = xhr.responseText;
      }};
    
    xhr.send(data);
    
    }


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('testSend')
    .addEventListener('click', callTest);
});