//对assets目录下的文件，生成预加载资源数组代码
const path = require("path");
const fs = require("fs");
var rootDir = "./src/assets";
var rootPath = path.resolve(rootDir);
const includeFileExt = [".jpg", ".jpeg", ".png", ".mp3"];
var data = [];
function traverse_dir_files(dir = "") {
    var currentPath = path.join(rootPath, dir);
    var list = fs.readdirSync(currentPath);
    list.forEach((file) => {
        var stat = fs.statSync(path.join(currentPath, file));
        if (stat.isFile()) {
            const ext = path.extname(file).toLowerCase();
            if (includeFileExt.includes(ext)) {
                var v = `require('@/${path.join("assets/", dir, file)}')`;
                v = v.replaceAll("\\", "/");
                data.push(v);
            }
        } else if (stat.isDirectory()) traverse_dir_files(path.join(dir, "/", file));
    });
}
traverse_dir_files();

console.log(data);
