document.getElementById("send-btn").addEventListener("click", function() {
    let message = document.getElementById("chat-input").value;
    if (message.trim() === "") return;
    
    fetch("save_chat.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "message=" + encodeURIComponent(message)
    })
    .then(response => response.text())
    .then(() => {
        document.getElementById("chat-input").value = "";
        loadChat();
    });
});

function loadChat() {
    fetch("load_chat.php")
        .then(response => response.text())
        .then(data => {
            document.getElementById("chat-box").innerHTML = data;
        });
}

setInterval(loadChat, 2000); // Auto-refresh chat setiap 2 detik

document.getElementById("call-btn").addEventListener("click", function() {
    alert("Panggilan sedang berlangsung... 🔊");
});

document.getElementById("video-call-btn").addEventListener("click", function() {
    let videoModal = document.createElement("div");
    videoModal.innerHTML = `
        <div class="video-popup">
            <video src="video_call.mp4" autoplay controls></video>
            <button onclick="this.parentElement.remove()">Tutup</button>
        </div>`;
    document.body.appendChild(videoModal);
});

function playVoiceNote() {
    let audio = document.getElementById("welcome-audio");
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}
