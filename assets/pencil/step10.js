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

        cc.systemEvent.on(
            cc.SystemEvent.EventType.KEY_UP,
            function(event){
                switch (event.keyCode) {
                    case cc.macro.KEY.space:
                        this.startAnim();
                        break;
                }
            },
            this
        );

        this.points = [];
    },

    onTouchBegan: function (touch, event) {
        var touchLoc = touch.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);

        if (this.animating) {
            this.animating = false;
            this.ctx.clear();
        }
        
        this.points = [touchLoc];

        return true;
    },

    onTouchMoved: function (touch, event) {
        var touchLoc = touch.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);

        this.points.push(touchLoc);

        this.drawPoints(this.points, this.points.length);
    },

    onTouchEnded: function (touch, event) {
    },

    drawPoints: function (points, l) {
        if (l < 2) return;

        let ctx = this.ctx;
        let current = points[l-1];

        ctx.moveTo(current.x, current.y);
        ctx.lineTo(points[l-2].x, points[l-2].y);

        for (let i = 0; i < l; i++) {
            let p = this.points[i];
            let dx = p.x - current.x;
            let dy = p.y - current.y;
            let d = dx*dx + dy*dy;

            if (d < 1000) {
                ctx.strokeColor = cc.color(0,0,0,255*0.3);
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(current.x, current.y);
                ctx.stroke();
            }
        }
    },

    startAnim: function () {
        this.animating = true;
        this.length = 0;
        this.ctx.clear();

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (!this.animating) {
            return;
        }

        this.length++;
        if (this.length >= this.points.length) {
            this.length = 0;
            this.ctx.clear();
        }

        this.drawPoints(this.points, this.length);
    },
});
