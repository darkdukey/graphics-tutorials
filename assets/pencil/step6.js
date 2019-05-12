function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

        this.lastPoint = loc;

        return true;
    },

    onTouchMoved: function (event) {
        var loc = event.touch.getLocation();
        loc = this.node.parent.convertToNodeSpaceAR(loc);

        let ctx = this.ctx;
        let lastPoint = this.lastPoint;        

        ctx.strokeColor = cc.color(0,0,0,255);
        ctx.moveTo(lastPoint.x - 4, lastPoint.y - 4);
        ctx.lineTo(loc.x - 4, loc.y - 4);
        ctx.stroke();
        
        ctx.strokeColor = cc.color(0,0,0,200);
        ctx.moveTo(lastPoint.x - 2, lastPoint.y - 2);
        ctx.lineTo(loc.x - 2, loc.y - 2);
        ctx.stroke();
        
        ctx.strokeColor = cc.color(0,0,0,130);
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(loc.x, loc.y);
        ctx.stroke();
        
        ctx.strokeColor = cc.color(0,0,0,80);
        ctx.moveTo(lastPoint.x + 2, lastPoint.y + 2);
        ctx.lineTo(loc.x + 2, loc.y + 2);
        ctx.stroke();
        
        ctx.strokeColor = cc.color(0,0,0,20);
        ctx.moveTo(lastPoint.x + 4, lastPoint.y + 4);
        ctx.lineTo(loc.x + 4, loc.y + 4);
        ctx.stroke();

        this.lastPoint = loc;
    },

    onTouchEnded: function (event) {
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
