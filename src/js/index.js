var  $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);

var index = 0;
var songList;
var controlManager;
var audio = new root.audioControl();

function bindClick(){
    $scope.on('playchange', function (event, index, flag){
        audio.getAudio(songList[index].audio);
        if(audio.status == 'play' || flag){
            audio.play();
            root.process.start();
        }

        root.process.renderAllTime(songList[index].duration);
        root.render(songList[index]);
        root.process.update(0);
    })

    $scope.on('click', '.like-btn', function (){
        $('.like-btn').toggleClass('liking');
    })
    $scope.on('click', '.prev-btn', function (){
        var index = controlManager.prev();
        root.render(songList[index]);
        $scope.trigger('playchange', index);
        root.process.update(0);
        
    })

    $scope.on('click', '.next-btn', function (){
        var index = controlManager.next();
        root.render(songList[index]);
        $scope.trigger('playchange', index);
        root.process.update(0);
        
    })

    $scope.on('click', '.play-btn', function (){
        if(audio.status == 'play'){
            audio.pause();
            root.process.stop();
        }else{
            audio.play();
            root.process.start();
        }

        $(this).toggleClass("pause");
    })
    $scope.on('click', '.list-btn', function() {
        root.playList.show(controlManager);
    })
}

function bindTouch(){
    var $slider = $('.slider-pointer');
    var offset = $('.pro-wrapper').offset();
    var left = offset.left;
    var width = offset.width;
    $slider.on('touchstart', function (){
        root.process.stop();
    }).on('touchmove', function (e){
        var x = e.changedTouches[0].clientX;  
        var per = (x - left) / width;   
        if(per > 1 || per < 0){
            per = 0;
        }
       
        root.process.update(per);
    }).on('touchend', function (e){
        var x = e.changedTouches[0].clientX;  
        var per = (x - left) / width;   
        if(per > 1 || per < 0){
            per = 0;
        }
        var curDuration = songList[controlManager.index].duration;
        var curTime = per * curDuration;
        audio.playTo(curTime);
        root.process.start(per);
        //$('.play-btn').addClass('pause');
    })
}

function getData(url){
    $.ajax({
        type: "GET",
        url: url,
        success: function (data){
            root.render(data[0]);
            songList = data;
            bindClick();
            bindTouch();
            controlManager = new root.controlManager(data.length);
            $scope.trigger('playchange', 0);
             root.playList.renderList(songList); 
        },
        error: function (){
            console.log("error");
        }
    })
}

getData("../data/data.json");