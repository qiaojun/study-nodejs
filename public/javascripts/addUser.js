

$("#adduser").on('click', function(){
    var username = $("#username")[0].value;
  saveSettings(username);
});



/*save setting*/
function saveSettings(name){
    $.ajax('/users/doAdd?name=' + name, {
        method: "get",
        error: function(){
            console.log("save settings error");
        },
        success: function(data){
            var msg = '<strong style="padding-left:10px;"> create user success</strong>';
            if(data.hasUser){
                msg = '<strong style="padding-left:10px;"> duplicated name, create user failure</strong>';
            }

            var classStr = 'alert alert-success alert-dismissible';
            showMessage(msg, classStr);
        }
    });
}

var messageZone = $('#messageZone');
messageZone.css("display","none");
var closeButton = '<button type="button" class="close" data-dismiss="alert">'
    + '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';

function getCurrentTime(){
    return (new Date().toString()).replace(/(.*)GMT(.*)/, function($,$1){return $1});
}

function showMessage(msg, classStr){
    messageZone.append("<div role='alert'></div>").children(":first-child").get(0).innerHTML = closeButton + getCurrentTime() + msg;
    messageZone.css("display","block");
    messageZone.children(":first-child").removeClass().addClass(classStr).css("margin-bottom","0px");
}
