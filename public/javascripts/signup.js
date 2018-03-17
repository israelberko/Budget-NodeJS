$(document).ready(function() {
    $flag = 1;
    $("#myName").focusout(function() {
        if ($(this).val() == '') {
            $(this).css("border-color", "#FF0000");
            $('#submit').attr('disabled', true);
            $("#error_name").text("* You have to enter your first name!");
        } else {
            $(this).css("border-color", "#2eb82e");
            $('#submit').attr('disabled', false);
            $("#error_name").text("");

        }
    });
    $("#lastname").focusout(function() {
        if ($(this).val() == '') {
            $(this).css("border-color", "#FF0000");
            $('#submit').attr('disabled', true);
            $("#error_lastname").text("* You have to enter your Last name!");
        } else {
            $(this).css("border-color", "#2eb82e");
            $('#submit').attr('disabled', false);
            $("#error_lastname").text("");
        }
    });
    $("#dob").focusout(function() {
        if ($(this).val() == '') {
            $(this).css("border-color", "#FF0000");
            $('#submit').attr('disabled', true);
            $("#error_dob").text("* You have to enter your Date of Birth!");
        } else {
            $(this).css("border-color", "#2eb82e");
            $('#submit').attr('disabled', false);
            $("#error_dob").text("");
        }
    });
    $("#gender").focusout(function() {
        $(this).css("border-color", "#2eb82e");

    });
    $("#email").focusout(function() {
        if ($(this).val() == '') {
            $(this).css("border-color", "#FF0000");
            $('#submit').attr('disabled', true);
            $("#error_email").text("* You have to enter your Email!");
        } else {
            if (validateEmail($(this).val())) {
                $(this).css({ "border-color": "#2eb82e" });
                $('#submit').attr('disabled', false);
                $("#error_email").text("");
            } else {
                $(this).css("border-color", "#FF0000");
                $('#submit').attr('disabled', true);
                $("#error_email").text("* You have to enter valid Email!");
            }

        }
    });
    $("#password").focusout(function() {
        if ($(this).val() == '') {
            $(this).css("border-color", "#FF0000");
            $('#submit').attr('disabled', true);
            $("#error_password").text("* You have to enter your Password!");
        } else {
            $(this).css("border-color", "#2eb82e");
            $('#submit').attr('disabled', false);
            $("#error_password").text("");

        }
    });

    $("#submit").click(function() {
        if ($("#myName").val() == '') {
            $("#myName").css("border-color", "#FF0000");
            $('#submit').attr('disabled', true);
            $("#error_name").text("* You have to enter your first name!");
        }
        if ($("#lastname").val() == '') {
            $("#lastname").css("border-color", "#FF0000");
            $('#submit').attr('disabled', true);
            $("#error_lastname").text("* You have to enter your Last name!");
        }
        if ($("#dob").val() == '') {
            $("#dob").css("border-color", "#FF0000");
            $('#submit').attr('disabled', true);
            $("#error_dob").text("* You have to enter your Date of Birth!");
        }
        if ($("#email").val() == '') {
            $("#email").css("border-color", "#FF0000");
            $('#submit').attr('disabled', true);
            $("#error_email").text("* You have to enter your Email!");
        }
        if ($("#password").val() == '') {
            $("#password").css("border-color", "#FF0000");
            $('#submit').attr('disabled', true);
            $("#error_password").text("* You have to enter your Password!");
        }
    });
});

// Function that validates email address through a regular expression.
function validateEmail(sEmail) {
    var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    if (filter.test(sEmail)) {
        return true;
    } else {
        return false;
    }
}