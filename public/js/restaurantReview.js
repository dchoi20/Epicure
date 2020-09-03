const $reviewTitle = $(".review-title");
const $reviewText = $(".review-textarea");
const $saveReviewBtn = $(".save-review");
const $newReviewBtn = $(".new-review");
const $reviewList = $(".list-container .list-group");

let activeReview = {};

const getReview = () => {
  return $.ajax({
    url: "",
    method: "GET",
  });
};

const saveReview = (review) => {
  return $.ajax({
    url: "",
    data: review,
    method: "POST",
  });
};

const deleteReview = (id) => {
  return $.ajax({
    url: "" + id,
    method: "DELETE",
  });
};

const renderActiveReview = () => {
  $saveReviewBtn.hide();

  if (activeReview.id) {
    $reviewTitle.attr("readonly", true);
    $reviewText.attr("readonly", true);
    $reviewTitle.val(activeReview.title);
    $reviewText.val(activeReview.text);
  } else {
    $reviewTitle.attr("readonly", false);
    $reviewText.attr("readonly", false);
    $reviewTitle.val("");
    $reviewText.val("");
  }
};

const handleReviewSave = function() {
  const newReview = {
    title: $reviewTitle.val(),
    text: $reviewText.val(),
  };
  saveReview(newReview).then(() => {
    getAndRenderReviews();
    renderActiveReview();
  });
};

const handleReviewDelete = function(event) {
  event.stopPropagation();

  const review = $(this)
    .parent(".list-group-item")
    .data();

  if (activeReview.id === review.id) {
    activeReview = {};
  }
  deleteReview(review.id).then(() => {
    getAndRenderReviews();
    renderActiveReview();
  });
};

const handleReviewView = function() {
  activeReview = $(this).data();
  renderActiveReview();
};

const handleRenderSaveBtn = function() {
  if (!$reviewTitle.val().trim() || !$reviewText.val().trim()) {
    $saveReviewBtn.hide();
  } else {
    $saveReviewBtn.show();
  }
};

const renderReviewList = (reviews) => {
  $reviewList.empty();

  const reviewListItems = [];

  const create$li = (text, withDeleteButton = true) => {
    const $li = $("<li class=`list-group-item`>");
    const $span = $("<span>").text(text);
    $li.append($span);

    if (withDeleteButton) {
      const $delBtn = $(
        "<i class=`fas fa-trash-alt float-right text-danger delete-note'>"
      );
      $li.append($delBtn);
    }
    return $li;
  };
  if (reviews.length === 0) {
    reviewListItems.push(create$li("No saved Reviews", false));
  }

  reviews.forEach((review) => {
    const $li = create$li(review.title).data(review);
    reviewListItems.push($li);
  });

  $reviewList.append(reviewListItems);
};

const getAndRenderReviews = () => {
  return getReview().then(renderReviewList);
};

$saveReviewBtn.on("click", handleReviewSave);
$reviewList.on("click", ".list-group-item", handleReviewView);
$newReviewBtn.on("click", handleReviewView);
$reviewList.on("click", ".delete-note", handleReviewDelete);
$reviewTitle.on("keyup", handleRenderSaveBtn);
$reviewText.on("keyup", handleRenderSaveBtn);

getAndRenderReviews();
