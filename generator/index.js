module.exports = (api) => {
    api.render("./template");
    api.extendPackage({
        dependencies: {
            "@zeelyn/http": "^1.0.2",
            "@zeelyn/vue-ui": "^2.0.2",
            howler: "^2.2.4",
            pinia: "^2.1.7",
            "tcplayer.js": "^5.1.0",
            "weixin-js-sdk": "^1.6.5",
        },
    });
    api.extendPackage({
        scripts: {
            gen_preload_assets: "node gen_preload_assets_array.js",
        },
    });
    const deleteFiles = ["src/components/HelloWorld.vue", "public/favicon.ico"];
    api.render((files) => {
        Object.keys(files)
            .filter((path) => {
                return deleteFiles.includes(path);
            })
            .forEach((path) => delete files[path]);
    });
};
