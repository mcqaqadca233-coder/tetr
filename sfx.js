// sfx.js - 支持动态音效包切换（通过 sfxPack 滑条）

// 获取音量（0-1）
function getVolume() {
    let vol = parseInt(document.getElementById("vol")?.value) || 80;
    return vol / 100;
}

// 获取当前音效包编号（默认0）
function getSfxPack() {
    let pack = document.getElementById("sfxPack")?.value;
    return pack !== undefined ? parseInt(pack) : 0;
}

// 将路径中的音效包编号替换为当前选择的编号
function replaceSfxPack(path) {
    let pack = getSfxPack();
    // 匹配 "./sfx/任意数字/" 并替换为 "./sfx/当前pack/"
    return path.replace(/\.\/sfx\/\d+\//, `./sfx/${pack}/`);
}

// 播放音效（支持动态音效包）
function sfx(src = "sfx/kus.ogg") {
    // 如果路径包含 "./sfx/数字/"，则自动替换数字部分
    let finalSrc = src.includes("./sfx/") ? replaceSfxPack(src) : src;
    let audio = new Audio(finalSrc);
    audio.volume = getVolume();
    audio.currentTime = 0;
    audio.play().catch(e => console.log("音效播放失败:", finalSrc, e));
}

// 预加载当前音效包的所有常用音效
function preloadCurrentSfxPack() {
    // 基础音效文件名列表（不含路径）
    const soundFiles = [
        "cww.ogg", "cw.ogg", "r180.ogg", "hard.ogg", "restart.ogg",
        "left.ogg", "g.ogg", "a.ogg", "tetris.ogg", "kus.ogg"
    ];
    let pack = getSfxPack();
    soundFiles.forEach(file => {
        let url = `./sfx/${pack}/${file}`;
        let audio = new Audio(url);
        audio.preload = "auto";
        audio.load();
    });
}

// 页面加载后预加载默认音效包（0）
window.addEventListener("load", function() {
    preloadCurrentSfxPack();
});

// 监听音效包滑条变化，重新预加载新包（可选，避免切换后卡顿）
document.addEventListener("DOMContentLoaded", function() {
    let packSlider = document.getElementById("sfxPack");
    if (packSlider) {
        packSlider.addEventListener("change", function() {
            preloadCurrentSfxPack();
        });
    }
});