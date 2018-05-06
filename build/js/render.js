(function ($, root){
    
    function rederInfo(info){
        var html = `<div class="song-name">${info.song}</div>
        <div class="singer-name">${info.singer}</div>
        <div class="album-name">${info.album}</div>`;
        $('.song-info').html(html);
    }

    function renderImg(src){
        var img = new Image();
        img.src = src;
        img.onload = function (){
            root.blurImg(img, $scope);
            $('.song-img img').attr('src', src);
        }
    }

    function renderIsLike(isLike){
        if(isLike){
            $('.like-btn').addClass('liking');
        }else{
            $('.like-btn').removeClass('liking');
        }
    }

    root.render = function render(data){
        rederInfo(data);
        renderImg(data.image);
        renderIsLike(data.isLike);
    }

})(window.Zepto, window.player || (window.player = {}));