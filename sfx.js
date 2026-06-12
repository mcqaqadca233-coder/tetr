function sfx(src="sfx/kus.ogg"){
    let audio=new Audio(src);
    audio.volume = 0.5
    audio.currentTime = 0;
    audio.play().catch(e=>console.log(e))
}

// 需要预加载的所有音效路径（按你实际文件填写）
const preloadSounds = [
    "./sfx/0/c.ogg",
    "./sfx/0/e.ogg",
    "./sfx/0/d.ogg",
    "./sfx/0/Hx.ogg",
    "./sfx/0/f.ogg",
    "./sfx/0/b.ogg",
    "./sfx/0/g.ogg",
    "./sfx/0/a.ogg",
    "./sfx/0/tetris",
    "sfx/kus.ogg"
];

// 页面加载完成后，批量预加载音效
window.addEventListener("load", function() {
    preloadSounds.forEach(function(src) {
        const tempAudio = new Audio(src);
        tempAudio.preload = "auto"; // 强制提前加载
        tempAudio.load();
    });
});
