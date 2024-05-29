
const move_list = document.getElementById("move_list");
const inp = {
  kr: {
    word: document.getElementById("inp_kr_word"),
    des: document.getElementById("inp_kr_des")
  },
  uz: {
    word: document.getElementById("inp_uz_word"),
    des: document.getElementById("inp_uz_des")
  }
}
const re_inp = {
  kr: {
    word: document.getElementById("re_inp_kr_word"),
    des: document.getElementById("re_inp_kr_des")
  },
  uz: {
    word: document.getElementById("re_inp_uz_word"),
    des: document.getElementById("re_inp_uz_des")
  }
}
const words_list = document.getElementById("words_show_list");
let words = [];
let ar_FT = []
let tim_ar = [];
let test_option = {
  lang: "kr-to-uz",
  num: 10,
  date: "today"
};
let test = {
  ask: document.getElementById("test_ask"),
  check: document.getElementById("test_check")
}
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let CurentNumOfTest = 0;
let CurTest = {
  true: 0,
  false: 0,
  num: 0
}
let settings = {
    mode: "dark",
    langTo: "kr-to-uz",
    NumOfTests: 5,
    Period: "all"
};
let CurentSelectedWord = 0;
let CurentList = 1;
let BeforeList = 1;
if (localStorage.getItem("KR_VOC_MY_ffLS") !== null) {
  words = JSON.parse(localStorage.getItem("KR_VOC_MY_ffLS"));
}

if (localStorage.getItem("KR_VOC_MY_Setings") !== null) {
    settings = JSON.parse(localStorage.getItem("KR_VOC_MY_Setings"));
}

/*
for (let i = 1; i <= 22; i++) {
  words.push({
    kr_word: `kr${i}`,
    kr_des: "",
    uz_word: `uz${i}`,
    uz_des: "",
    date: `2024-05-${i}T12:00:00`,
    tested: []
  })
};
SetDataToLS();*/

Menu("test");
//console.table(words[45-1].tested)
//test.ask.style.visibility = "visible";
//test.check.style.visibility = "hidden";
//StartTest();
//ClickedWord(1);

//

var setting_elements = document.querySelectorAll(".settings_inp");
    setting_elements.forEach(element => {
        element.addEventListener("change", () => {
            console.log("_____gg");
            if (document.getElementById("test_select_lang_kr_to_uz").checked) {
                settings.langTo = "kr-to-uz";
            } else if (document.getElementById("test_select_lang_uz_to_kr").checked = true) {
                settings.langTo = "uz-to-kr";
            }
            if (document.getElementById("test_select_date_today").checked) {
                settings.Period = "today";
            } else if (document.getElementById("test_select_date_week").checked) {
                settings.Period = "week";
            } else if (document.getElementById("test_select_date_all").checked) {
                settings.Period = "all";
            }

            settings.NumOfTests = document.getElementById("test_select_num").value;
            SetSettingsToLS();
    });    
})

function StartTest() {
  if (document.getElementById("test_select_lang_kr_to_uz").checked) {
    test_option.lang = "kr-to-uz";
  } else if (document.getElementById("test_select_lang_uz_to_kr").checked) {
    test_option.lang = "uz-to-kr";
  }
  if (document.getElementById("test_select_date_today").checked) {
    test_option.date = "today";
  } else if (document.getElementById("test_select_date_week").checked) {
    test_option.date = "week";
  } else if (document.getElementById("test_select_date_all").checked) {
    test_option.date = "all";
  }
  test_option.num = (document.getElementById("test_select_num").value)
  SlideScreenList(5);
  CurentNumOfTest = 0;
  CurTest.num = 0;
  CurTest.true = 0;
  CurTest.false = 0;
  for (let i = 0; i < words.length; i++) {
    if (test_option.date === "today") {
      if ( daysPassedSince(words[i].date) <= 0) {
        ar_FT.push(i);
      }
    } else if (test_option.date === "week") {
      if ( daysPassedSince(words[i].date) <= 6) {
        ar_FT.push(i);
      }
    } else {
      ar_FT.push(i)
    }
  }
  //
    tim_ar = [];
    ar_FT.forEach(element => {
        tim_ar.push({
            ind: element,
            fa: 0
        })
    });
    tim_ar.forEach(element => {
        fa_count_ = 0;
        words[element.ind].tested.forEach(chech_el => {
            if (chech_el !== true) {
                fa_count_++;
            }
        });
        element.fa = fa_count_;
    });
    NewTest();
}
//
function NewTest() {
  CurentNumOfTest++;
  CurTest.num++;
  console.log(CurentNumOfTest)
  if (CurentNumOfTest > test_option.num) {
    alert(`Test Finished\nNum${CurTest.num-1}\nTrue${CurTest.true}\nFalse${CurTest.false}`)
    Menu("test")
  } else {
    CurentSelectedWord = //ar_FT[(Math.floor(Math.random()*ar_FT.length))];
        SelectRand(tim_ar);

    
    if (test_option.lang === "kr-to-uz") {
      document.getElementById("test_ask_word").innerHTML = 
        words[CurentSelectedWord].kr_word;
      document.getElementById("test_check_word").innerHTML =
        words[CurentSelectedWord].kr_word;
      document.getElementById("test_check_answer").innerHTML = 
        words[CurentSelectedWord].uz_word;
    } else if (test_option.lang === "uz-to-kr") {
      document.getElementById("test_ask_word").innerHTML = 
        words[CurentSelectedWord].uz_word;
      document.getElementById("test_check_word").innerHTML =
        words[CurentSelectedWord].uz_word;
      document.getElementById("test_check_answer").innerHTML = 
        words[CurentSelectedWord].kr_word;
    }
  }
  test.ask.style.visibility = "visible";
  test.check.style.visibility = "hidden";
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
function TestCheck(bool_) {
  if (bool_) {
    CurTest.true++;
    words[CurentSelectedWord].tested.push({
      date: getCurrentDateTime(),
      result: true
    })
  } else {
    CurTest.false++;
    words[CurentSelectedWord].tested.push({
      date: getCurrentDateTime(),
      result: false
    })
  }
  SetDataToLS();
  test.ask.style.visibility = "visible";
  test.check.style.visibility = "hidden";
  NewTest();
}
//
function CheckTheAnswer() {
  test.ask.style.visibility = "hidden";
  test.check.style.visibility = "visible";
}
//
function SetDataToLS() {
  localStorage.setItem("KR_VOC_MY_ffLS", JSON.stringify(words));
}
function SetSettingsToLS() {
    localStorage.setItem("KR_VOC_MY_Setings", JSON.stringify(settings))
}
//
function ShowWords() {
  count = 0;
  words_list.innerHTML = "";
  words.forEach(element => {
    count++;
    words_list.innerHTML += `
      <div class="word_elem" onclick="ClickedWord(${count});">
        <div class="w_e_left">
          <p class="lang_word">${element.kr_word}</p>
          <p class="lang_des">${element.kr_des}</p>
        </div>
        <div class="w_e_right">
          <p class="lang_word">${element.uz_word}</p>
          <p class="lang_des">${element.uz_des}</p>
        </div>
      </div>`;
  });
}
//
function ClickedWord(param1) {
  console.log("pa",param1)
  CurentSelectedWord = param1 - 1;
  console.log(param1)
  re_inp.kr.word.value = words[CurentSelectedWord].kr_word;
  re_inp.kr.des.value = words[CurentSelectedWord].kr_des;
  re_inp.uz.word.value = words[CurentSelectedWord].uz_word;
  re_inp.uz.des.value = words[CurentSelectedWord].uz_des;
  document.getElementById("word_show_date").innerHTML =
    `Added date => ${words[CurentSelectedWord].date}`;
    SlideScreenList(4);
    var ans_ = {
      tr: 0,
      fa: 0
    };
    words[CurentSelectedWord].tested.forEach(element => {
      if (element.result) {
        ans_.tr++;
      } else {
        ans_.fa++;
      }
    });   
      var lastend = 0;
      var data = [ans_.tr, ans_.fa]; // If you add more data values make sure you add more colors
      var myTotal = 0; // Automatically calculated so don't touch
      var myColor = ["green", "red", "yellow"]; // Colors of each slice
      if (ans_.tr === 0 && ans_.fa === 0) {
        data = [1];
        myColor = ["yellow"];
      }
      for (var e = 0; e < data.length; e++) {
        myTotal += data[e];
      }
      for (var i = 0; i < data.length; i++) {
        if ( i === 0) {
          lastend = -(Math.PI * 2 * (data[i] / myTotal)/2);
        }
        ctx.fillStyle = myColor[i];
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(
          canvas.width / 2,  // x
          canvas.height / 2, // y
          canvas.height / 2, // radius
          lastend,           // startingAngle (radians)
          lastend + Math.PI * 2 * (data[i] / myTotal), // endingAngle (radians)
          false // antiClockwise (boolean)
        );
        ctx.lineTo(canvas.width / 2, canvas.height / 2);
        ctx.fill();
        lastend += (Math.PI * 2 * (data[i] / myTotal));
      }
      document.getElementById("diagramm_tr").innerHTML = ans_.tr;
      document.getElementById("diagramm_fa").innerHTML = ans_.fa;
}
//
function DeleteWord() {
  words.splice(CurentSelectedWord, 1);
  SetDataToLS();
  SlideScreenList(2);
  ShowWords();
}
//
function ChangeWord() {
  if (re_inp.kr.word.value !== "" &&
      re_inp.uz.word.value !== "") {
        words[CurentSelectedWord].uz_word = re_inp.uz.word.value;
        words[CurentSelectedWord].uz_des = re_inp.uz.des.value;
        words[CurentSelectedWord].kr_word = re_inp.kr.word.value;
        words[CurentSelectedWord].kr_des = re_inp.kr.des.value;
        SetDataToLS();
        SlideScreenList(2);
        ShowWords();
      }
}
//
Menu("add")
function SlideScreenList(num_of_list) {
  BeforeList = CurentList;
  CurentList = num_of_list;
  move_list.style = `transform: translate(-${(num_of_list-1)*10}%, 0);`;
}
//
function Menu(list_) {
  if (list_ === "add") {
      SlideScreenList(1);
      inp.kr.word.value = "";
      inp.kr.des.value = "";
      inp.uz.word.value = "";
      inp.uz.des.value = "";
  } else if (list_ === "words") {
    SlideScreenList(2);
    ShowWords();
  } else if (list_ === "test") {
    SlideScreenList(3);
    
    //
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
    //

  }
}
//
function AddNewWord() {
  if (inp.kr.word.value !== "" && 
      inp.uz.word.value !== "") {
      words.push({
        kr_word: inp.kr.word.value,
        kr_des: inp.kr.des.value,
        uz_word: inp.uz.word.value,
        uz_des: inp.uz.des.value,
        date: getCurrentDateTime(),
        tested: []
      });
      SetDataToLS();
      inp.kr.word.value = "";
      inp.kr.des.value = "";
      inp.uz.word.value = "";
      inp.uz.des.value = "";
  } else {
    alert("Enter Word");
  }
}

//
console.log(daysPassedSince("2024-05-22"))
console.log(timePassedSince("2024-05-22"))

console.log(daysPassedSince("2024-05-18T12:00:10"))
console.log(timePassedSince(getCurrentDateTime()))
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
    //dsad
    //
    //console.table()

    console.log("__")

    var arrat = [null, 0, 0, 0, 0];
    for (let counter_ = 0; counter_ < 1000; counter_++) {

        arrat[SelectRand([
            {ind: 1, fa: 20},
            {ind: 2, fa: 15},
            {ind: 3, fa: 10},
            {ind: 4, fa: 5}
        ])]++;
        /*-console.table(SelectRand([
            {ind: 1, fa: 20},
            {ind: 2, fa: 15},
            {ind: 3, fa: 10},
            {ind: 4, fa: 5}
        ]))    */
    }
    console.table(arrat)
    

    function SelectRand(object_) {
        answer_ = 0;
        All_chechs_ = 0;
        object_.forEach(element => {
          All_chechs_+=element.fa;
        });
        tmAr = [];
        object_.forEach(element => {
          tmAr.push({ind: element.ind, 
            kf: (element.fa/All_chechs_)})
        });
        tmAr.forEach(element => {
          element.kf /= 2;
          element.kf += ((0.5/object_.length));
        });
        //console.table(tmAr)
        //console.table(tmAr);
        for (let i = 1; i < tmAr.length; i++) {
          tmAr[i].kf+=tmAr[i-1].kf;
        }
        Ran_Num_ = Math.random();
        for (let i = tmAr.length-1; i >= 0;i--) {
          if (tmAr[i].kf >= Ran_Num_) {
            answer_ = tmAr[i].ind;
          }
        }
        return answer_;
      }
  

      function myFunction(x) {
        x.classList.toggle("change");
      }


      function GoToMenu() {
        if (CurentList === 6) {
          SlideScreenList(BeforeList);
        } else {
          SlideScreenList(6);
        }
      }