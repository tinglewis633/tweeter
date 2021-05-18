$(document).ready(function () {
  // --- our code goes here ---
  timeago.render(document.querySelectorAll(".need_to_be_rendered"));
  const title = $("form textarea");
  const countLeft = $("output");
  const countLetters = (event) => {
    const count = event.target.value.length;
    console.log(count);
    countLeft.text(140 - count);
    if (countLeft.text() < 0) {
      countLeft.css("color", "red");
    } else {
      countLeft.css("color", "#545149");
    }
  };

  $(title).on("input", countLetters);
});
