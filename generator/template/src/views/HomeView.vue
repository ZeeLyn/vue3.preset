<template>
    <div class="home">
        <img src="@/assets/bgm.png" @click="bgmHandler" v-if="store.bgmStatus" />
        <img src="@/assets/bgm-off.png" @click="bgmHandler" v-if="!store.bgmStatus" />
        <img alt="Vue logo" src="../assets/logo.png" />
        <button @click="showlive = true">开始直播</button>
        <div class="player-wrap">
            <TCPlayer v-if="showlive" :options="options"></TCPlayer>
        </div>
    </div>
</template>

<script>
import { switch_bgm } from "../utils/bgm.js";
import { useGlobalStore } from "@/stores/globalStore";
import TCPlayer from "@/components/TCPlayer.vue";

export default {
    name: "HomeView",
    components: { TCPlayer },
    data() {
        return {
            showlive: true,
            options: {
                poster: "https://web-vue-app.oss-cn-beijing.aliyuncs.com/xdog/upload/1443757156397617152.jpg",
                multiResolution: {
                    sources: {
                        HD: [
                            {
                                src: "webrtc://live.stream.inlarks.com/live/test",
                            },
                        ],
                        SD: [
                            {
                                src: "webrtc://live.stream.inlarks.com/live/test_720P",
                            },
                        ],
                    },
                },
            },
        };
    },
    setup() {
        var store = useGlobalStore();
        return { store };
    },
    methods: {
        bgmHandler() {
            switch_bgm();
        },
    },
};
</script>
<style scoped>
.player-wrap {
    width: 100%;
    height: 200px;
}
</style>
