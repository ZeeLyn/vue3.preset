import { Howl } from "howler";
var _bgm, _isIOS;
var bgmStatus = false;
export const init_bgm = (source, autoplay = true, loop = true, onStatusChange = null) => {
    let u = navigator.userAgent;
    let isIOS = (_isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/));
    if (isIOS) {
        var audio = (_bgm = new Audio());
        window.bgm = audio;
        audio.loop = loop;
        audio.autoplay = autoplay;
        audio.preload = true;
        if (autoplay) {
            document.addEventListener(
                "WeixinJSBridgeReady",
                function () {
                    audio.play();
                },
                false
            );
        }
        audio.src = source;

        audio.addEventListener("play", function () {
            bgmStatus = true;
            if (onStatusChange) onStatusChange(bgmStatus);
        });
        audio.addEventListener("pause", function () {
            bgmStatus = false;
            if (onStatusChange) onStatusChange(bgmStatus);
        });
        audio.addEventListener("stop", function () {
            bgmStatus = false;
            if (onStatusChange) onStatusChange(bgmStatus);
        });
        if (autoplay) audio.play();
    } else {
        var sound = (_bgm = new Howl({
            src: [source],
            loop: loop,
            autoplay: autoplay,
        }));
        sound.on("play", function () {
            bgmStatus = true;
            if (onStatusChange) onStatusChange(bgmStatus);
        });
        sound.on("pause", function () {
            bgmStatus = false;
            if (onStatusChange) onStatusChange(bgmStatus);
        });
        sound.on("stop", function () {
            bgmStatus = false;
            if (onStatusChange) onStatusChange(bgmStatus);
        });
        window.bgm = sound;
        if (autoplay) sound.play();
    }
};

export const switch_bgm = () => {
    if (_isIOS) {
        if (!bgmStatus) {
            _bgm.play();
        } else {
            _bgm.pause();
        }
    } else {
        if (!_bgm.playing()) {
            _bgm.play();
        } else {
            _bgm.pause();
        }
    }
};
