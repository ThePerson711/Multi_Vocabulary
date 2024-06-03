//
function StartTest() {
    if (settings.Test_type === "card") {
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
//







