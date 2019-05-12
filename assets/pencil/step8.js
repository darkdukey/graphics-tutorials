cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        this.ctx = this.getComponent(cc.Graphics);
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this, true);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoved, this, true);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnded, this, true);
    },

    onTouchBegan: function (event) {
        var loc = event.touch.getLocation();
        loc = this.node.parent.convertToNodeSpaceAR(loc);

        this.points = [loc];

        return true;
    },

    onTouchMoved: function (event) {
        var loc = event.touch.getLocation();
        loc = this.node.parent.convertToNodeSpaceAR(loc);

        let points = this.points;
        points.push(loc);

        let ctx = this.ctx;
        // ctx.clear();

        ctx.moveTo(points[points.length - 2].x, points[points.length - 2].y);
        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        ctx.stroke();
        
        for (var i = 0, len = points.length; i < len; i++) {
            let dx = points[i].x - points[points.length-1].x;
            let dy = points[i].y - points[points.length-1].y;
            let d = dx * dx + dy * dy;
  
            if (d < 1000) {
                ctx.strokeColor = cc.color(0,0,0,255*0.3);
                ctx.moveTo( points[points.length-1].x + (dx * 0.2), points[points.length-1].y + (dy * 0.2));
                ctx.lineTo( points[i].x - (dx * 0.2), points[i].y - (dy * 0.2));
                ctx.stroke();
            }
        }

        // ctx.stroke();
    },

    onTouchEnded: function (event) {
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
