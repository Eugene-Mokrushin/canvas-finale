
// initial params
const canvas = document.querySelector('#cv1');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;

// resizing window
window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

//saved mouse coordinates
const mouseCord = {
    x: undefined,
    y: undefined,
}

//current mouse coordinates
canvas.onclick = (e) => {
    mouseCord.x = e.x;
    mouseCord.y = e.y;
    for (let index = 0; index < 10; index++) {
        particlesArray.push(new Partcicle());

    }
}

canvas.onmousemove = (e) => {
    mouseCord.x = e.x;
    mouseCord.y = e.y;
    for (let index = 0; index < 10; index++) {
        particlesArray.push(new Partcicle());

    }
}


class Partcicle {
    constructor() {
        this.x = mouseCord.x;
        this.y = mouseCord.y;
        this.size = Math.random() * 10 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
    }
}



function handleParticles() {
    for (let index = 0; index < particlesArray.length; index++) {
        particlesArray[index].update()
        particlesArray[index].draw();
        for (let j = index; j < particlesArray.length; j++) {
            const dx = particlesArray[index].x - particlesArray[j].x;
            const dy = particlesArray[index].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 50) {
                context.beginPath();
                context.strokeStyle = particlesArray[index].color;
                context.lineWidth = particlesArray[index].size / 10;
                // context.lineWidth = 0.2;
                context.moveTo(particlesArray[index].x, particlesArray[index].y);
                context.lineTo(particlesArray[j].x, particlesArray[j].y);
                context.stroke();
                context.closePath();
            }
        }
        if (particlesArray[index].size <= 0.3) {
            particlesArray.splice(index, 1);
            index--;
        }
    }
}


function animate(params) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // context.fillStyle = 'rgba(0, 0, 0, 0.02)';
    // context.fillRect(0, 0, canvas.width, canvas.height);
    hue += 4;
    handleParticles();
    requestAnimationFrame(animate)
}
animate()