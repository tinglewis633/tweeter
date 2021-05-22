//take a user's data as object, and append it with html and css
const createTweetElement = function (data) {
  $("#shows").append(` <section class="tweet">
        <div class="tweet-head">
          <div><img src=${data.user.avatars} /> ${data.user.name}</div>
          <div class="at">${data.user.handle}</div>
        </div>
        <form>
          <textarea
            readonly="readonly"
            value="hihihi"
            name="text"
            id="tweet-text"
          > ${data.content.text}</textarea
          >
          <div>
            <span
              class="need_to_be_rendered"
              datetime="${data.created_at}"
            ></span>
            <div class="links">
              <i class="fas fa-flag"></i><i class="fas fa-retweet"></i
              ><i class="fas fa-heart"></i>
            </div>
          </div>
        </form>
      </section>`);
};

$(document).ready(() => {
  //show compose new tweet after new tweet from top right corner is clicked
  $(".new-tweet").hide();
  $("#create-new-tweet-btn").click(function () {
    $(".new-tweet").show();
  });
  $("#create-tweet").submit(function (event) {
    event.preventDefault();
    const tweetLength = event.target[0].value.length;
    const textInput = event.target[0].value;
    // if tweet greater than 140 characters, empty or null then display error. Otherwise post method to /tweets
    if (tweetLength > 140) {
      $("#alert").empty();
      $("#alert").append(
        `<i class="fas fa-exclamation-triangle"></i> Please enter tweet less than 140 characters <i class="fas fa-exclamation-triangle"></i>`
      );
      return;
    }
    if (textInput !== "" && textInput !== null) {
      $("#alert").empty();
      const data = $(this).serialize();

      $.ajax({
        method: "POST",
        url: "/tweets",
        data: data,
      });
      $(".new-tweet").hide();
    } else {
      $("#alert").empty();
      $("#alert").append(
        `<i class="fas fa-exclamation-triangle"></i> Please enter some characters <i class="fas fa-exclamation-triangle"></i>`
      );
      return;
    }
    $("#shows").empty();
    loadtweets();
  });

  //get array of object using AJAX, and then loop it to call createTweetElement for every object in reverse order
  const loadtweets = () => {
    const url = `http://localhost:8080/tweets`;
    $.ajax({ url }).then((response) => {
      for (let index = response.length - 1; index >= 0; index--) {
        createTweetElement(response[index]);
      }
      //use timeago to change time to time ago from now
      timeago.render(document.querySelectorAll(".need_to_be_rendered"));
    });
  };
  loadtweets();
});
