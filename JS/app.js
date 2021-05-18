/*
* Author: @umamad
*/
var speechRecognitionController = (function () {
  return {
    recognition: function () {
      window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = "fa-IR";
      recognition.interimResults = true;
      recognition.start();
      return recognition;
    },
  };
})();

var UIController = (function () {
  const docElement = {
    textPlace: ".text--place",
  };
  return {
    docElements: function () {
      return docElement;
    },
    resetUI: function () {
      document.querySelector(docElement.textPlace).textContent = "";
    },
  };
})();

var controller = (function (recognition, uiCtrl) {
  // UI Elements
  var docElements = uiCtrl.docElements();

  // Get Recognition
  var recognition = recognition.recognition();

  // Set Create Element
  const textPlace = document.querySelector(".text--place");
  var p = document.createElement("p");
  var span = document.createElement("span");

  var options = function (transcript, recognition) {
    // Text Plays
    if (transcript.includes("علامت علامت سوال")) {
      transcript = transcript.replace("علامت علامت سوال", "؟");
    }
    if (transcript.includes("دستور صفحه پاک کن")) {
      textPlace.innerHTML = "";
      p.innerHTML = "";
      transcript = "";
    }
    if (transcript.includes("دستور بزن خط بعد")) {
      p = document.createElement("p");
      textPlace.appendChild(p);
      transcript = "";
    }

    // Links
    if (transcript.includes("گوگل رو برام باز کن")) {
      window.open("https://google.com", "blank");
      transcript = "";
    }
    if (transcript.includes("دیجی کالا رو برام باز کن")) {
      window.open("https://digikala.com", "blank");
      transcript = "";
    }

    // Change Language
    if (transcript.includes("تعویض زبان به انگلیسی")) {
      recognition.stop();
      recognition.lang = "en-US";
      transcript = "";
      p = document.createElement("p");
      p.style.textAlign = "left";
      p.setAttribute("dir", "ltr");
      textPlace.appendChild(p);
    }
    if (transcript.includes("change language to Persian")) {
      recognition.stop();
      recognition.lang = "fa-IR";
      transcript = "";
      p = document.createElement("p");
      p.style.textAlign = "right";
      p.setAttribute("dir", "rtl");
      textPlace.appendChild(p);
    }
    return transcript;
  };

  var eventListeners = function () {
    // Handle Recognition Restart
    recognition.addEventListener("end", recognition.start);

    // Fech & Display Data
    recognition.addEventListener("result", (event) => {
      // Fech Data
      let transcript = Array.from(event.results)
        .map((el) => {
          return el[0];
        })
        .map((el) => {
          return el.transcript;
        })
        .join(" ");

      // Options
      transcript = options(transcript, recognition);

      // Update UI
      textPlace.appendChild(p);
      span.textContent = transcript + " ";
      p.appendChild(span);

      // Continue
      if (event.results[0].isFinal) {
        span = document.createElement("span");
        p.appendChild(span);
      }
    });
  };

  return {
    init: function () {
      // Reset UI
      uiCtrl.resetUI();

      // Set EventListeners
      eventListeners();
    },
  };
})(speechRecognitionController, UIController);

controller.init();