<template>
    <video ref="player-container" class="player-container" :style="`width:100%; height:100%;`" preload="auto" webkit-playsinline="true" crossorigin="anonymous" playsinline="true" x-webkit-airplay="true" x5-video-player-type="h5-page"></video>
</template>
<script>
import TCPlayer from "tcplayer.js";
import "tcplayer.js/dist/tcplayer.min.css";
export default {
    name: "tc-player",
    props: {
        options: {
            type: Object,
            default: () => {
                return {
                    // multiResolution: {
                    //     sources: {
                    //         HD: [
                    //             {
                    //                 src: "webrtc://live.stream.inlarks.com/live/test",
                    //             },
                    //         ],
                    //         SD: [
                    //             {
                    //                 src: "webrtc://live.stream.inlarks.com/live/test_720P",
                    //             },
                    //         ],
                    //     },
                    // },
                    // or
                    // srouces: [{ src: "webrtc://live.stream.inlarks.com/live/test_720P" }],
                };
            },
        },
    },
    data() {
        return {
            playerOptions: {},
        };
    },
    mounted() {
        var def_options = {
            licenseUrl: "https://license.vod2.myqcloud.com/license/v2/1302203771_1/v_cube.license",
            poster: "",
            autoplay: true,
            bigPlayButton: false,
            controlBar: {
                QualitySwitcherMenuButton: true,
                progressControl: false,
            },
            showOrder: ["SD", "HD"],
            defaultRes: "SD",
            playbackRates: [],
        };
        this.playerOptions = Object.assign({}, def_options, this.options);
        console.log(this.playerOptions);
        const player = (this.player = TCPlayer(this.$refs["player-container"], this.playerOptions));
        player.ready(function () {
            var btnContainer = document.createElement("button");
            btnContainer.type = "button";
            btnContainer.className = "vjs-big-play-button";
            btnContainer.innerHTML = `<div class="vjs-button-icon">
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" height="100%"><path d="M810.4 465.8 253.6 134.4c-6.8-4-13.8-6.4-21.8-6.4-21.8 0-39.6 18-39.6 40L192 168l0 688 0.2 0c0 22 17.8 40 39.6 40 8.2 0 15-2.8 22.4-6.8l556.2-331c13.2-11 21.6-27.6 21.6-46.2C832 493.4 823.6 477 810.4 465.8z" fill="#ffffff"></path></svg>
            </div>`;
            btnContainer.addEventListener("click", function () {
                player.play();
            });
            document.querySelector(".tcplayer").appendChild(btnContainer);
        });
    },
    beforeUnmount() {
        this.player?.dispose();
    },
    methods: {},
};
</script>
<style scoped></style>
