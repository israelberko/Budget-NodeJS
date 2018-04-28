$(document).ready(function() {
    var options={
        format: "MM,yyyy",
        minViewMode: 1,
        maxViewMode: 2,
        autoclose: true
    };

    $('#sandbox-container .input-daterange').datepicker(options)
        .on('changeDate', function(selected){
            var date_input=document.getElementById("budget__date");
            document.getElementById("DateForm").submit();
    });
});