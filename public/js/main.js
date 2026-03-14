function nextStep(stepNum) {
    const current = document.querySelector('.step.active');
    const next = document.getElementById(`step-${stepNum}`);
    const music = document.getElementById('bgMusic');
    const bar = document.getElementById('bar');
    
    if (stepNum === 2 && music.paused) music.play().catch(e => {});
    if (bar) bar.style.width = (stepNum * 25) + "%";

    const tl = gsap.timeline();
    
    tl.to(current, { 
        duration: 0.7, y: -30, opacity: 0, filter: "blur(10px)", ease: "power2.inOut", 
        onComplete: () => {
            current.classList.remove('active');
            next.classList.add('active');
        }
    });

    tl.fromTo(next, 
        { y: 30, opacity: 0, scale: 0.98, filter: "blur(10px)" }, 
        { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 1, ease: "expo.out" }
    );

    if (stepNum === 3) {
        tl.to(".glass-frame", { opacity: 1, y: 0, stagger: 0.2, duration: 1.2, ease: "power4.out" }, "-=0.6");
        tl.to(".glass-frame img", { scale: 1, duration: 2, ease: "expo.out" }, "-=1.2");
    }
}

function resetAndReturn() {
    document.getElementById('finalSignature').innerHTML = "";
    document.getElementById('celebrateBtn').style.display = "block";
    document.getElementById('downloadBtn').style.display = "none";
    document.getElementById('replayBtn').style.display = "none";
    
    gsap.set(".glass-frame", { opacity: 0, y: 40 });
    gsap.set(".glass-frame img", { scale: 1.5 });
    gsap.set(".step", { filter: "blur(0px)", y: 0, scale: 1, opacity: 0 });
    
    nextStep(1);
}

function downloadKeepsake() {
    const card = document.getElementById('keepsakeCard');
    html2canvas(card, { backgroundColor: '#fffcf9' }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'Birthday_Note.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}

function typeWriter(text, i) {
    const target = document.getElementById('finalSignature');
    if (i < text.length) {
        target.innerHTML = text.substring(0, i + 1);
        setTimeout(() => { typeWriter(text, i + 1) }, 50);
    } else {
        gsap.fromTo(["#downloadBtn", "#replayBtn"], { display: "block", opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.2 });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('celebrateBtn').addEventListener('click', function() {
        confetti({ particleCount: 200, spread: 80, origin: { y: 0.7 }, colors: ['#b8860b', '#1a1a1a', '#ffffff'] });
        this.style.display = "none";
        
        const note = "Happy Birthday Phi Saao! Sending you the biggest virtual hug today. Two years ago this April, a simple conversation about a series changed everything. Even though we’re miles apart, our bond has grown so much, and I’m so lucky to have you in my corner. Cheers to you, to us, and to the many more years of friendship ahead of us!";
        
        typeWriter(note, 0);
    });
});