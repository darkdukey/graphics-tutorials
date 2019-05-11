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

    onTouchBegan: function (touch, event) {
        var touchLoc = touch.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);

        this.points = [touchLoc];
        cc.log("Touch begin");
        return true;
    },

    onTouchMoved: function (touch, event) {
        var touchLoc = touch.getLocation();
        touchLoc = this.node.parent.convertToNodeSpaceAR(touchLoc);

        this.points.push(touchLoc);

        this.ctx.clear();
        for (let i = 0, l = this.points.length; i < l; i++) {
            let p = this.points[i];
            if (i === 0) {
                this.ctx.moveTo(p.x, p.y);
            }
            else {
                this.ctx.lineTo(p.x, p.y);
            }
        }

        this.ctx.stroke();
    },

    onTouchEnded: function (touch, event) {
        cc.log("Touch ended");
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
