import wx from "weixin-js-sdk";
import http from "@zeelyn/http";
/*eslint-disable */
function __handleFontSize() {
    // 设置网页字体为默认大小
    WeixinJSBridge.invoke("setFontSizeCallback", {
        fontSize: 0,
    });
    // 重写设置网页字体大小的事件
    WeixinJSBridge.on("menu:setfont", function () {
        WeixinJSBridge.invoke("setFontSizeCallback", {
            fontSize: 0,
        });
    });
}
export const disable_weixin_browser_font_size_scale = () => {
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        __handleFontSize();
    } else {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", __handleFontSize, false);
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", __handleFontSize);
            document.attachEvent("onWeixinJSBridgeReady", __handleFontSize);
        }
    }
};
export const is_weixin = () => {
    return window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger";
};

export const mp_config_init = (apis = ["onMenuShareTimeline", "onMenuShareAppMessage", "updateAppMessageShareData", "updateTimelineShareData"], debug = false) => {
    if (!is_weixin()) return Promise.reject("非微信环境,跳过微信配置注入");
    return new Promise((resolve, reject) => {
        wx.ready(function () {
            resolve();
        });
        wx.error(function (err) {
            reject(err.errMsg);
        });
        http.post("https://open.mp.inlarks.com/api/mp/jssdk/signature?appid=wx01407fc5ce6c6ade", {
            data: {
                url: location.href.split("#")[0],
            },
        })
            .then((res) => {
                wx.config({
                    jsApiList: apis,
                    debug: debug, // 开启调试模式,
                    appId: res.data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
                    timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.noncestr, // 必填，生成签名的随机串
                    signature: res.data.signature, // 必填，签名，见附录1
                });
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const set_mp_share = (title, desc, imgurl, link) => {
    wx.onMenuShareTimeline({
        title: title,
        link: link,
        imgUrl: imgurl,
    });
    wx.onMenuShareAppMessage({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgurl,
    });
};
