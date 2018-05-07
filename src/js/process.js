(function ($, root){
    var curDuration;
    var frameId;
    var lastPer = 0;
    var startTime;


    function renderAllTime(duration){
        lastPer = 0;
        curDuration = duration;
        var allTime = formatTime(duration);

        $('.all-time').html(allTime);
    }

    function formatTime(duration){
        duration = Math.round(duration);
        var minute = Math.floor(duration / 60);
        var second = duration - minute * 60;
        if(minute < 10){
            minute = "0" + minute;
        }
        if(second < 10){
            second = "0" + second;
        }

        return minute + ":" + second;
    }

    function update(percent){
        var curTime = percent * curDuration;
        curTime = formatTime(curTime);
        $('.cur-time').html(curTime);
        var per = (percent - 1) * 100 + '%';
        $('.pro-top').css({
            'transform': 'translateX(' + per + ')'
        })
    }

    function start(precentage){
        lastPer = precentage === undefined ? lastPer : precentage;
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        function frame(){
            var curTime = new Date().getTime();
            var percent = lastPer + (curTime - startTime) / (curDuration * 1000);
            if(percent < 1){
                frameId = requestAnimationFrame(frame);
                update(percent);
            }else{
                cancelAnimationFrame(frameId);
                $('.next-btn').trigger('click');
            }
        }
        frame();
    }

    function stop(){
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (curDuration * 1000);
        cancelAnimationFrame(frameId);
    }

    root.process = {
        renderAllTime: renderAllTime,
        update: update,
        start: start,
        stop: stop
    }
})(window.Zepto, window.player || (window.player = {}))