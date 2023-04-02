        //loading
        $(function(){});
        $(window).on('load', function(){
            $('.loading').delay(700).fadeOut(250);
            });
            function stopload(){
        $('.loading').delay(1000).fadeOut(700);
    }
        setTimeout('stopload()',10000);