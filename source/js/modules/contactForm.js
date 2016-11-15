$(document).ready(function () {
    $('input[name=chkbox]').click(function () {
        if ($(this).val() == 'checked') {
            $(this).val('')
        } else {
            $(this).val('checked')
        }

    });
    $("#submit_btn").click(function () {

        var proceed = true;
        //simple validation at client's end
        //loop through each field and we simply change border color to red for invalid fields
        $("#contact_form input[required=true]").each(function () {
            $(this).css('border-color', '');
            if (!$.trim($(this).val())) { //if this field is empty
                $(this).css('border-color', 'red'); //change border color to red
                proceed = false; //set do not proceed flag
            }
            //check invalid email
            var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if ($(this).attr("type") == "email" && !email_reg.test($.trim($(this).val()))) {
                $(this).css('border-color', 'red'); //change border color to red
                proceed = false; //set do not proceed flag
            }
            if($(this).attr('type') =='checkbox' && $(this).is(':not(:checked)')) {
                $('.check').addClass('red')
            }
        });

        if (proceed) //everything looks good! proceed...
        {
            //get input field values data to be sent to server
            var post_data = {
                'user_name': $('input[name=name]').val(),
                'user_surname': $('input[name=surname]').val(),
                'address': $('input[name=address]').val(),
                'zip': $('input[name=zip]').val(),
                'postAddress': $('input[name=postAddress]').val(),
                'user_email': $('input[name=email]').val(),
                'phone': $('input[name=phone]').val(),
                'bday': $('select[name=bday]').val(),
                'bmonth': $('select[name=bmonth]').val(),
                'byear': $('select[name=byear]').val()
            };

            //Ajax post data to server
            $.post('./contact_me.php', post_data, function (response) {
                 var output ='';
                if (response.type == 'error') { //load json data from server and output message
                    output = '<div class="error">' + response.text + '</div>';
                }
                else {
                    output = '<div class="success">' + response.text + '</div>';
                    //reset values in all input fields
                    $("#contact_form input, #contact_form select").val('');
                    $('.check').trigger('click')
                }
                $(".form_result").fadeIn(300).html(output).delay(1000).fadeOut(1000);
            }, 'json');
        }
    });

    //reset previously set border colors and hide all message on .keyup()
    $("#contact_form input[required=true], .check").mouseup(function () {
        $(this).css('border-color', '');
        $(this).removeClass('red')
    });
});