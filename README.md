# Google Voice Recognition
- Using google api's to transform voice to text.

## Description
### SpeechRecognition
- Method of **window** object we going to make it standard with lines below
```javascript
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
```
- Make an instance
```javascript
const recognition = new SpeechRecognition();
```
- Set language
>Default on 'en-US'
```javascript
recognition.lang = "fa-IR";
```
- This line of code couses to fetch result one by one at moment
```javascript
recognition.interimResults = true;
```
- Start by calling start method
```javascript
recognition.start();
```
### Options
- We connect all results by **join()** method then like below
```javascript
let transcript = Array.from(event.results)
        .map((el) => {
          return el[0];
        })
        .map((el) => {
          return el.transcript;
        })
        .join(" ");
```
- Then we have string so we can explore it with **includes()** method, I mean
```javascript
    if (result.includes("Order")) {
        // Remove Order Text From Screen
        result = '';
        // What You Want To Do On This Order
        RelatedOrderMethod();
    }
```
- Example :
```javascript
    if (transcript.includes("jump next line")) {
        // Remove Order Text From Screen
        transcript = '';
        // Action
        p = document.createElement("p");
        textPlace.appendChild(p);
    }
```
- [GitHub Link](http://github.com/Umamad/google-voice-recognition)
- Mohammad Saadati
