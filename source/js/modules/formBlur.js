var doit;
var page = $(window).height();



function resizedw290() {
    $('.fb-container').html('<div class="fb-page" data-href="https://www.facebook.com/facebook" data-tabs="timeline" data-width="290" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/facebook" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/facebook">Facebook</a></blockquote></div>');
    FB.XFBML.parse();
}
function resizedw375() {
    $('.fb-container').html('<div class="fb-page" data-href="https://www.facebook.com/facebook" data-tabs="timeline" data-width="375" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/facebook" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/facebook">Facebook</a></blockquote></div>');
    FB.XFBML.parse();
}
function resizedw410() {
    $('.fb-container').html('<div class="fb-page" data-href="https://www.facebook.com/facebook" data-tabs="timeline" data-width="410" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/facebook" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/facebook">Facebook</a></blockquote></div>');
    FB.XFBML.parse();
}

$(window).resize (function () {
    if ($(window).width() <= 767) {
        clearTimeout(doit);
        doit = setTimeout(function () {
            resizedw290();
        }, 500);
    } else if ($(window).width() > 991 && $(window).width() < 1200) {
        clearTimeout(doit);
        doit = setTimeout(function () {
            resizedw375();
        }, 500);
    } else if ($(window).width() > 1199) {
        clearTimeout(doit);
        doit = setTimeout(function () {
            resizedw410();
        }, 500);
    }

});

