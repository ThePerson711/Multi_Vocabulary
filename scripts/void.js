function daysPassedSince(dateString) {
  // Parse the entered date string into a Date object
  var enteredDate = new Date(dateString);
  // Get the current date
  var currentDate = new Date();
  // Calculate the difference in milliseconds between the current date and the entered date
  var timeDifference = currentDate.getTime() - enteredDate.getTime();
  // Convert the time difference from milliseconds to days
  var daysPassed = Math.floor(timeDifference / (1000 * 3600 * 24));
  return daysPassed;
}
//
function timePassedSince(dateTimeString) {
  // Parse the entered date and time string into a Date object
  var enteredDateTime = new Date(dateTimeString);
  // Get the current date and time
  var currentDateTime = new Date();
  // Calculate the difference in milliseconds between the current date/time and the entered date/time
  var timeDifference = currentDateTime.getTime() - enteredDateTime.getTime();
  // Calculate days, hours, minutes, and seconds
  var daysPassed = Math.floor(timeDifference / (1000 * 3600 * 24));
  var hoursPassed = Math.floor((timeDifference % (1000 * 3600 * 24)) / (1000 * 3600));
  var minutesPassed = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60));
  var secondsPassed = Math.floor((timeDifference % (1000 * 60)) / 1000);
  // Construct and return the result string
  var result = "";
  if (daysPassed > 0) {
    result += daysPassed + " day" + (daysPassed > 1 ? "s" : "") + ", ";
  }
  result += hoursPassed + " hour" + (hoursPassed !== 1 ? "s" : "") + ", ";
  result += minutesPassed + " minute" + (minutesPassed !== 1 ? "s" : "") + ", ";
  result += secondsPassed + " second" + (secondsPassed !== 1 ? "s" : "");
  return result;
}
// 
function getCurrentDateTime() {
  var currentDate = new Date();
  // Get the components of the current date and time
  var year = currentDate.getFullYear();
  var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns zero-based month
  var day = ('0' + currentDate.getDate()).slice(-2);
  var hours = ('0' + currentDate.getHours()).slice(-2);
  var minutes = ('0' + currentDate.getMinutes()).slice(-2);
  var seconds = ('0' + currentDate.getSeconds()).slice(-2);
  // Construct the date and time string in the desired format (YYYY-MM-DD HH:MM:SS)
  var currentDateTime = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds;
  return currentDateTime;
}


    // Converts Text to Speech {en,uz,ru,kr}
    function TextToSpeech(text_, lang_) {
      if ('speechSynthesis' in window) {
        // Create a new SpeechSynthesisUtterance object
        var utterance = new SpeechSynthesisUtterance();
        // Set the text to be spoken
        utterance.text = text_;
        // Specify Korean as the language
        if (lang_ === "kr") {
          utterance.lang = 'ko-KR';
        } else if (lang_ === "uz") {
          utterance.lang = 'uz-UZ'; // Set language to Uzbek
        } else if (lang_ === "en") {
          utterance.lang = 'en-US'; // Set language to English
        } else if (lang_ === "ru") {
          utterance.lang = 'ru-RU'; // Set language to Russian
        }
        // Speak the text
        speechSynthesis.speak(utterance);
      } else {
        // If speech synthesis is not supported, alert the user
        alert('Sorry, your browser does not support speech synthesis.');
      }
    }

//
function myFunction(x) {
  x.classList.toggle("change");
}

//
function SoundBtn() {
  if (test_option === "kr-to-uz") {
    lang_ = "kr";
  } else if (test_option === "uz-to-kr") {
    lang_ = "uz";
  }
  console.log(words[CurentSelectedWord].kr_word)
  TextToSpeech(words[CurentSelectedWord].kr_word, "kr");
}
//

//
function SetDataToLS() {
  localStorage.setItem("KR_VOC_MY_ffLS", JSON.stringify(words));
}
function SetSettingsToLS() {
    localStorage.setItem("KR_VOC_MY_Setings", JSON.stringify(settings))
}
//

//
function SlideScreenList(num_of_list) {
  BeforeList = CurentList;
  CurentList = num_of_list;
  if (num_of_list === 1) {
    inp.kr.word.value = "";
    inp.kr.des.value = "";
    inp.uz.word.value = "";
    inp.uz.des.value = "";
  } else if (num_of_list === 2) {
    ShowWords();
  } else if (num_of_list === 3) {
    document.getElementById("test_select_num").value = settings.NumOfTests;
    if (settings.langTo === "kr-to-uz") {
        document.getElementById("test_select_lang_kr_to_uz").checked = true;
    } else if (settings.langTo === "uz-to-kr") {
        document.getElementById("test_select_lang_uz_to_kr").checked = true;
    }
    if (settings.Period === "all") {
        document.getElementById("test_select_date_all").checked = true;
    } else if (settings.Period === "week") {
        document.getElementById("test_select_date_week").checked = true;        
    } else if (settings.Period === "today") {
        document.getElementById("test_select_date_today").checked = true;        
    }
    if (settings.Test_type === "card") {
      document.getElementById("test_select_type_card").checked = true;
    } else if (settings.Test_type === "test") {
      document.getElementById("test_select_type_test").checked = true;
    }
  }
  move_list.style = `transform: translate(-${(num_of_list-1)*10}%, 0);`;
  settings.CRpanel = num_of_list;
  SetSettingsToLS();
}
//
//
function Menu(list_) {
  if (list_ !== "mune" && CurentList === 6) {
    SlideScreenList(BeforeList);
    document.getElementById("container").onclick();
  }
  if (list_ === "add") {
      SlideScreenList(1);
  } else if (list_ === "words") {
    SlideScreenList(2);
  } else if (list_ === "test") {
    SlideScreenList(3);
  }
}
//
function GoToMenu() {
  if (CurentList === 6) {
    SlideScreenList(BeforeList);
  } else {
    SlideScreenList(6);
  }
}



