// 如需固定配置範本的簡介，請參閱下列文件:
// http://go.microsoft.com/fwlink/?LinkId=232508
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: 這個應用程式剛啟動。請在這裡初始化
                // 您的應用程式。
            } else {
                // TODO: 這個應用程式已經從擱置重新啟用。
                // 請在這裡還原應用程式狀態。
            }
            args.setPromise(WinJS.UI.processAll().then(init));
        }
    };

    var stage;
    function init() {
        var mc = document.getElementById("video1");
        TweenLite.to(mc, 2, { x: 65, y: 117, rotation: 180 });
        TweenLite.to(mc, 2, { y: 0, rotation: 90, delay: 2, writeover: false });
        stage = new createjs.Stage("gameCanvas");
        createjs.Ticker.addEventListener("tick", stage);

        // Create the MovieClip
        var mc = new createjs.MovieClip(null, 0, true, {
            start: 0,
            middle: 40
        });
        stage.addChild(mc);

        // Create the States. Each state is just a circle shape.
        var state1 = new createjs.Shape(
        new createjs.Graphics().beginFill("#999999")
            .drawCircle(100, 100, 100));
        var state2 = new createjs.Shape(
        new createjs.Graphics().beginFill("#5a9cfb")
            .drawCircle(100, 100, 100));

        // Create a tween for each shape, animating from one side to the other.
        mc.timeline.addTween(
        createjs.Tween.get(state1)
            .to({
                x: 0
            }).to({
                x: 760
            }, 40).to({
                x: 0
            }, 40));
        mc.timeline.addTween(
        createjs.Tween.get(state2)
            .to({
                x: 760
            }).to({
                x: 0
            }, 40).to({
                x: 760
            }, 40));

        // Play the animation starting from the middle. See the MovieClip constructor above where the labels are specified.
        mc.gotoAndPlay("middle");
    }

    app.oncheckpoint = function (args) {
        // TODO: 這個應用程式即將暫停。請在這裡儲存任何
        // 需要在擱置間保存的狀態。您可以使用
        // WinJS.Application.sessionState 物件，這個物件會自動
        // 在擱置間儲存並還原。如果您需要在
        // 應用程式暫停之前完成非同步作業，請呼叫
        // args.setPromise()。
    };

    app.start();
})();
