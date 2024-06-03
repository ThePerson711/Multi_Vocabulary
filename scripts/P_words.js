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