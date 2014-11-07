$(document).ready(function() {
    $('#demo').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="example"></table>' );

    $('#example').dataTable( {
        "ajax": "/users/json",
        "columns": [
            { "title": "name" }
        ]
    } );

    var lastIdx = null;
    var table = $('#example').DataTable();
    $('#example tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );

    $('#example tbody').on( 'mouseover', 'td', function () {
            var colIdx = table.cell(this).index().column;

            if ( colIdx !== lastIdx ) {
                $( table.cells().nodes() ).removeClass( 'highlight' );
                $( table.column( colIdx ).nodes() ).addClass( 'highlight' );
            }
        } ).on( 'mouseleave', function () {
            $( table.cells().nodes() ).removeClass( 'highlight' );
        } );

    $('#del').click( function () {
        table.row('.selected').remove().draw( false );
        var msg = '<strong style="padding-left:10px;"> delete user success</strong>';
        var classStr = 'alert alert-success alert-dismissible';
        showMessage(msg, classStr);
    } );
} );


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