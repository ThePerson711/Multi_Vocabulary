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





