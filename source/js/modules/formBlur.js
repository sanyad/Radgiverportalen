var doit;
var page = $(window).height();



function resizedw290() {
    $('.fb-container').html('<div class="fb-page" data-href="https://www.facebook.com/www.spreknorge.no" data-tabs="timeline" data-width="290" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/www.spreknorge.no" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/www.spreknorge.no">Sprek Norge</a></blockquote></div>');
    FB.XFBML.parse();
}
function resizedw370() {
    $('.fb-container').html('<div class="fb-page" data-href="https://www.facebook.com/www.spreknorge.no" data-tabs="timeline" data-width="370" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/www.spreknorge.no" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/www.spreknorge.no">Sprek Norge</a></blockquote></div>');
    FB.XFBML.parse();
}

$(window).resize (function () {
    if ($(window).width() <= 991) {
        clearTimeout(doit);
        doit = setTimeout(function () {
            resizedw290();
        }, 500);
    } else if ($(window).width() > 991) {
        clearTimeout(doit);
        doit = setTimeout(function () {
            resizedw370();
        }, 500);
    }

});

