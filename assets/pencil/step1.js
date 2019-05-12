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
        cc.log("Touch begin");
        return true;
    },

    onTouchMoved: function (event) {
        var loc = event.touch.getLocation();
        loc = this.node.parent.convertToNodeSpaceAR(loc);

        this.points.push(loc);

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

    onTouchEnded: function (event) {
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
