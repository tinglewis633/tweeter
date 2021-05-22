$(document).ready(function () {
  // change color when tweetLength goes over 140

  const title = $("form textarea");
  const countLeft = $("output");
  const countLetters = (event) => {
    const count = event.target.value.length;

    countLeft.text(140 - count);
    if (countLeft.text() < 0) {
      countLeft.css("color", "red");
    } else {
      countLeft.css("color", "#545149");
    }
  };

  $(title).on("input", countLetters);
});
