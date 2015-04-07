$(document).ready(function(){

  function Request() {
    this.type = '';
    this.url = '';
    this.data = {};
    this.dataType = 'json';
    this.success = function(response){
    }
  };

  $(document).on('click','#add',function(){
    $('.keyvalue-section').append('<div class="keyvalue-row"> \
        <input type="text" class="key col-xs-4" name="key" placeholder="Key"> \
        <input type="text" class="value col-xs-5 col-xs-offset-1" name="value" placeholder="Value"> \
        <button class="btn btn-danger col-xs-2 remove">Remove</button> \
      </div>');
  });

  var submit = function(){

    var keyValueArray = [];
    var newRequest = new Request();
    for (i=0; i<$('.key').length; i++) {
      keyValueArray.push([$($('.key')[i]).val(),$($('.value')[i]).val()]);
    }
    for (i=0; i<keyValueArray.length; i++) {
      newRequest['data'][keyValueArray[i][0]] = keyValueArray[i][1];
    }
    newRequest['type'] = $('#request-selector').val();
    newRequest['url'] = $('#url').val();
    if ($('#request-selector').val()=="GET") {
      $('.return-content').html('<div class="content-row col-xs-12"> \
        <div class="col-sm-2 hidden-xs">ID</div> \
        <div class="col-xs-3 col-sm-2">Title</div> \
        <div class="col-xs-5 col-sm-5">Text</div> \
        <div class="col-xs-2 col-sm-1">user</div> \
      </div>')
      newRequest["success"] = function(response){
        // console.log(typeof(response));
        // console.log(response);
        if (response.length > 0) {
          $.each(response, function(index){
            $('.return-content').append('<div class="content-row col-xs-12"> \
              <div class="col-sm-2 hidden-xs id">'+response[index]["_id"]+'</div> \
              <div contentEditable="true" class="col-xs-3 col-sm-2 title">'+response[index]["title"]+'</div> \
              <div contentEditable="true" class="col-xs-5 col-sm-5 text">'+response[index]["text"]+'</div> \
              <div contentEditable="true" class="col-xs-2 col-sm-1 user">'+response[index]["user"]+'</div> \
              <button class="update btn btn-primary">Update</button> \
            </div>'
            )
          });
        } else {
          $('.return-content').append('<div class="content-row col-xs-12"> \
              <div class="col-sm-2 hidden-xs id">'+response["_id"]+'</div> \
              <div contentEditable="true" class="col-xs-3 col-sm-2 title">'+response["title"]+'</div> \
              <div contentEditable="true" class="col-xs-5 col-sm-5 text">'+response["text"]+'</div> \
              <div contentEditable="true" class="col-xs-2 col-sm-1 user">'+response["user"]+'</div> \
              <button class="update btn btn-primary">Update</button> \
            </div>'
          )
        }
      }
    };
    $.ajax(newRequest);
    // console.log(newRequest);

  }

  $(document).on('click','#submit',function(){
    submit();
  });

  $(document).on('click','.update',function(){
    var keyValueArray = [];
    var newRequest = new Request;
    newRequest['data']['title'] = $(this).siblings('.title').text();
    newRequest['data']['text'] = $(this).siblings('.text').text();
    newRequest['data']['user'] = $(this).siblings('.user').text();
    newRequest['type'] = "PUT";
    newRequest['url'] = "http://ga-wdi-api.meteor.com/api/posts/" + $(this).siblings('.id').text();
    
    $.ajax(newRequest);
    // console.log(newRequest);
  });

  var forkTheRepo = function (){
    var idArray = $('.id')
    for (i=0; i<idArray.length; i++) {
      var newRequest = new Request;
      newRequest['data']['title'] = "Fork";
      newRequest['data']['text'] = "The";
      newRequest['data']['user'] = "Repo";
      newRequest['type'] = "PUT";
      newRequest['url'] = "http://ga-wdi-api.meteor.com/api/posts/" + $(idArray[i]).text();
    
      $.ajax(newRequest);
    }
  };

  $(document).on('click','#fork',function(){
    forkTheRepo();
  });

  $(document).on('click','.remove',function(){
    $(this).parents('.keyvalue-row').remove();
  });

});