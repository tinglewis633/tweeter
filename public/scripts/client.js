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
  $("#create-tweet").submit(function (event) {
    event.preventDefault();
    if (event.target[0].value.length > 140) {
      $("#alert").empty();
      $("#alert").append(
        `<i class="fas fa-exclamation-triangle"></i> Please enter tweet less than 140 characters <i class="fas fa-exclamation-triangle"></i>`
      );
      return;
    }
    if (event.target[0].value !== "" && event.target[0].value !== null) {
      $("#alert").empty();
      const data = $(this).serialize();

      $.ajax({
        method: "POST",
        url: "/tweets",
        data: data,
      });
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

  const loadtweets = () => {
    const url = `http://localhost:8080/tweets`;
    $.ajax({ url }).then((response) => {
      for (let index = response.length - 1; index >= 0; index--) {
        createTweetElement(response[index]);
      }
      timeago.render(document.querySelectorAll(".need_to_be_rendered"));
    });
  };
  loadtweets();
});
