<template>
    <router-view />
</template>
<script>
import { disable_weixin_browser_font_size_scale, mp_config_init, set_mp_share } from "./utils/mp.js";
// import { init_bgm } from "./utils/bgm.js";
import { useGlobalStore } from "./stores/globalStore";
export default {
    name: "App",
    setup() {
        const store = useGlobalStore();
        return { store };
    },
    beforeCreate() {
        this.$http.defaults((config) => {
            config.baseURL = process.env.VUE_APP_API_BASE_URL;
            config.timeout = 30000;
            config.$on_before_request = (options) => {
                options.headers["Authorization"] = "Bearer " + localStorage.getItem("access_token");
            };
            config.$400 = (err) => {
                this.$toast.error(err.response.data ? err.response.data : err.response.statusText, 3000);
            };
            config.$401 = () => {
                this.$router.push("/");
            };
            config.$403 = () => {
                this.$message.warning("您无权访问此功能!");
            };
            config.$catch = () => {
                this.$toast.error("系统换忙，请稍后再试!", 3000);
            };
            config.$no_network = () => {
                this.$toast.error("网络异常，请检查网络连接！", 3000);
            };
        });
    },

    mounted() {
        // var self = this;
        disable_weixin_browser_font_size_scale();
        mp_config_init()
            .then(() => {
                set_mp_share("测试分享标题", "测试分享描述", "", "");
            })
            .catch((err) => {
                console.error(err);
                //加上catch才能禁用vue捕获弹出错误
            });
        // init_bgm(require("@/assets/bgm.mp3"), true, true, function (status) {
        //     console.log("播放状态", status);
        //     self.store.setBgmStatus(status);
        // });
    },
    methods: {},
};
</script>
<style>
* {
    padding: 0;
    margin: 0;
}
li {
    list-style: none;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #333;
}
img {
    max-width: 100%;
    display: block;
}

@media screen and (min-aspect-ratio: 58/100) {
    #app {
        background: #ff0000;
        content: "短屏";
    }
}

@media screen and (max-aspect-ratio: 58/100) {
    #app {
        background: #103fae;
        content: "长屏";
    }
}
</style>
