(function ($, root){
    function controlManager(len){
        this.index = 0;
        this.len = len;
    }

    controlManager.prototype = {
        prev: function (){
            // index --;
            return this.getIndex(-1);
        },
        next: function (){
            // index ++;
            return this.getIndex(1);
        },
        getIndex: function (val){
            var index = this.index;
            var len = this.len;
            var curIndex = (index + len + val) % len;
            this.index = curIndex;

            return curIndex;
        }
    }

    root.controlManager = controlManager;

})(window.Zepto, window.player || (window.player = {}))