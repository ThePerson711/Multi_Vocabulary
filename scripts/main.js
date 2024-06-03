
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
    Period: "all",
    CRpanel: 2,
    Test_type: "card"
};
let CurentSelectedWord = 0;
let CurentList = 1;
let BeforeList = 1;
//
//
//
if (localStorage.getItem("KR_VOC_MY_ffLS") !== null) {
  words = JSON.parse(localStorage.getItem("KR_VOC_MY_ffLS"));
}
//
if (localStorage.getItem("KR_VOC_MY_Setings") !== null) {
  settings = JSON.parse(localStorage.getItem("KR_VOC_MY_Setings"));
}
//
if (settings.CRpanel === 6) {
  document.getElementById("container").onclick();
}
//
SlideScreenList(settings.CRpanel);
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
            if (document.getElementById("test_select_type_card").checked) {
              settings.Test_type = "card";
              console.log("card")
            } else if (document.getElementById("test_select_type_test").checked) {
              settings.Test_type = "test";
              console.log("test")
            }
            settings.NumOfTests = document.getElementById("test_select_num").value;
            SetSettingsToLS();
    });    
})
//








