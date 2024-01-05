import { defineStore } from "pinia";
export const useGlobalStore = defineStore("globalStore", {
    state: () => ({
        initCheck: false,
        bgmStatus: false,
    }),
    actions: {
        setBgmStatus(v) {
            this.bgmStatus = v;
        },
        setInitCheck() {
            this.initCheck = true;
        },
    },
});
