/**
 * Created by stepa on 02.08.2016.
 */
Notify = {
    TYPE_INFO: 0,
    TYPE_SUCCESS: 1,
    TYPE_WARNING: 2,
    TYPE_DANGER: 3,

    generate: function (aText, aOptHeader, aOptType_int) {
        var lTypeIndexes = [this.TYPE_INFO, this.TYPE_SUCCESS, this.TYPE_WARNING, this.TYPE_DANGER];
        var ltypes = ['alert-info', 'alert-success', 'alert-warning', 'alert-danger'];

        var ltype = ltypes[this.TYPE_INFO];
        if (aOptType_int !== undefined && lTypeIndexes.indexOf(aOptType_int) !== -1) {
            ltype = ltypes[aOptType_int];
        }

        var lText = '';
        lText += "<p>"+aText+"</p>";
        lText += "<ul>";

        aOptHeader.forEach(function (item, i, arr){
            lText += "<li>"+item+"</li>";
        });
        lText += "</ul>";

        var lNotify_e1 = $("<div class='alert "+ltype+"' style='width:500px'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>×</span></button>"+lText+"</div>");
        setTimeout(function () {
            $('#notifies > div.alert').hide();
//            lNotify_e1.alert('close');
        }, 30000);
        lNotify_e1.appendTo($("#notifies"));
    }
};