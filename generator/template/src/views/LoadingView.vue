<template>
    <div class="wrap"></div>
</template>
<script>
import PreloadAsset from "@/preload_assets";
import { useGlobalStore } from "@/stores/globalStore";
export default {
    name: "LoadingView",
    data() {
        return { progress: 0 };
    },
    setup() {
        var store = useGlobalStore();
        return { store };
    },
    mounted() {
        this.preload();
    },
    methods: {
        preload() {
            var self = this;
            const mainfest = PreloadAsset;
            var preload = new createjs.LoadQueue(true);
            preload.on("progress", function (e) {
                self.progress = parseInt(e.progress * 100);
            });

            preload.on("complete", function (e) {
                self.store.setInitCheck();
                // self.$router.replace("/home");
            });
            preload.setMaxConnections(10);
            preload.loadManifest(mainfest);
        },
    },
};
</script>
<style scoped></style>
