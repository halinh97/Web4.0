$(document).ready(function () {
  var itemTemplate = Handlebars.compile($("#item-template").html());
  $.ajax({
    tpye : "get",
    url  : "imagesData.json"

  }).then(function(data) {
    var itemHtml = itemTemplate(data);
    $("#item_list").html(itemHtml);
    $("#item_list").masonry({
      itemSelector: '.item_container',
      columnWidth: '.item_container',
      percentPosition: true
    })
  }).fail(function (error) {
    console.log("Error:  " +error);
  });
});
