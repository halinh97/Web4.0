var loadedData = [];
var isRequestingNextPage =false;
$(document).ready(function(){
  var itemTemplate = Handlebars.compile($("#item-template").html());
  var itemModalTemplate = Handlebars.compile($("#item-modal-template").html());

  requestNextPage(itemTemplate);

  $('body').on('click', '.plus_button', function(){
    var itemId = $(this).attr('data-item-id');

    for(var i=0; i< loadedData.length; i++){
      var itemData = loadedData[i];
      if(itemData.id == itemId){
        // Found item, populating data
        $("#item_modal_body").html(itemModalTemplate(itemData));
        break;
      }
    }

    $("#item_modal").modal("show");
  });

  $(window).on('scroll', function(){
    if(isRequestingNextPage)return;

    if($(window).scrollTop() + window.innerHeight > $(document).height() - 200){
      requestNextPage(itemTemplate);
      isRequestingNextPage = true;
    }
  });
});

function requestNextPage(itemTemplate){
  $.ajax({
    type  : "get",
    url   : "imagesData.json"
  }).then(function(data){
    loadedData = loadedData.concat(data.items);

    var itemHtml = itemTemplate(data);
    $("#item_list").append(itemHtml);
    // $('#item_list').masonry({
    //   itemSelector: '.item_container',
    //   columnWidth: '.item_container',
    //   percentPosition: true
    // });
  }).fail(function(error){
    console.log(error);
  }).always(function () {
      isRequestingNextPage = true;
  });
}
