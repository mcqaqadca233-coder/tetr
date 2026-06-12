function sfx(src="sfx/kus.ogg"){
    let audio=new Audio(src);
    audio.volume = 0.5
    audio.currentTime = 0;
    audio.play().catch(e=>console.log(e))
}