const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const im0 = document.querySelector("#im0");
const im1 = document.querySelector("#im1");
const im2 = document.querySelector("#im2");
const im3 = document.querySelector("#im3");
const au0 = document.getElementById("au0");
const au1 = document.getElementById("au1");
const au2 = document.getElementById("au2");
const au3 = document.getElementById("au3");

let w, h, particles, start, now, onevent = [0,0,0,0];
let particleDistance = 40;
let mouse = {
   x: undefined,
   y: undefined,
   radius: 60
}

function init() {
   resizeReset();
   animationLoop();
}

let exX = [];
let exY = [];
function resizeReset() {
   w = canvas.width = window.innerWidth;
   h = canvas.height = window.innerHeight;
   const Cx = w/2;
   const Cy = h/2;
   exX.push(w*0.15);
   exX.push(w*0.65);
   exX.push(w*0.35);
   exX.push(w*0.85);
   exY.push(h*0.3);
   exY.push(h*0.3);
   exY.push(h*0.7);
   exY.push(h*0.7);
   im0.style.left = w * 0.092 + "px";
   im0.style.top = h * 0.20 + "px";
   im1.style.left = w * 0.57 + "px";
   im1.style.top = h * 0.195 + "px";
   im2.style.left = w * 0.273 + "px";
   im2.style.top = h * 0.62 + "px";
   im3.style.left = w * 0.793 + "px";
   im3.style.top = h * 0.585 + "px";

   particles = [];
   for (let y = (((h - particleDistance) % particleDistance) + particleDistance) / 2; y < h; y += particleDistance) {
      for (let x = (((w - particleDistance) % particleDistance) + particleDistance) / 2; x < w; x += particleDistance) {
            particles.push(new Particle(x, y));
      }
   }
} 

start = new Date();
let clicked = false;

function animationLoop() {
   ctx.clearRect(0, 0, w, h);
   drawScene();
   playMusic();
   requestAnimationFrame(animationLoop);
}

function drawScene() {
   let speedbias = 0;
   for (let i = 0; i < particles.length; i++) {
      particles[i].update(speedbias);
      particles[i].draw();
   }
   drawLine();
}

function drawLine() {
   for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
         let dx = particles[a].x - particles[b].x;
         let dy = particles[a].y - particles[b].y;
         let distance = Math.sqrt(dx * dx + dy * dy);

         if (distance < particleDistance * 1.8) {
            opacity = 1 - (distance / (particleDistance * 1.8));
         let R = (particles[a].red + particles[b].red)/2;
         let G = (particles[a].green + particles[b].green)/2;
         let B = (particles[a].blue + particles[b].blue)/2;
            ctx.strokeStyle = "rgba(" + R + "," + G + "," + B + "," + opacity + ")";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
         }
      }
   }
}
function playMusic() {
   let vol = 0;
   if(onevent[0]) {
      if(onevent[0] == 1) vol = 0.1;
      else if(onevent[0]==3) vol=0.5;
      else vol = 1;
      if(au0.paused) {
         au0.play();
      }
      au0.volume = vol;
   }
   else if(!au0.paused){
      au0.pause();
   }
   
   if(onevent[1]) {
      if(onevent[1] == 1) vol = 0.1;
      else if(onevent[1]==3) vol=0.5;
      else vol = 1;
      if(au1.paused) {
         au1.play();
      }
      au1.volume = vol;
   }
   else if(!au1.paused){
      au1.pause();
   }
   
   if(onevent[2]) {
      if(onevent[2] == 1) vol = 0.1
      else if(onevent[2]==3) vol=0.5;
      else vol = 1;
      if(au2.paused) {
         au2.play();
      }
      au2.volume = vol;
   }
   else if(!au2.paused){
      au2.pause();
   }
   
   if(onevent[3]) {
      if(onevent[3] == 1)vol = 0.1;
      else if(onevent[3]==3) vol=0.5;
      else vol = 1;
      if(au3.paused) {
         au3.play();
      }
      au3.volume = vol;
   }
   else if(!au3.paused){
      au3.pause();
   }
}
function mouseclick(e) {
   clicked = true;
}

function mouseclickoff(e) {
   clicked = false;
}

function mousemove(e) {
   mouse.x = e.x;
   mouse.y = e.y;
}

function mouseout() {
   mouse.x = undefined;
   mouse.y = undefined;
}

class Particle {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = 4;
     this.I = 4;
      this.baseX = this.x;
      this.baseY = this.y;
      this.speed = (Math.random() * 25) + 5;
      this.red = 0;
      this.green = 0; 
      this.blue = 0;  
   }
   draw() {
     switch (this.I) {
      case 4:
         this.red = 0;
         this.green = 0;
         this.blue = 0;
         break;
      case 0:
         if(this.x+this.y <= w) {
            this.red = (42 * (w - this.x - this.y) / w) + (38 * (this.x + this. y) / w);
            this.green = (128 * (w - this.x - this. y) / w) + (167 * (this.x + this. y) / w);
            this.blue = (197 * (w - this.x - this. y) / w) + (155 * (this.x + this. y) / w);
         }
         else {
            this.red = 70 * (w + h - this.x - this.y) / h + 237 * (this.x + this.y - w) / h;
            this.green = 167 * (w + h - this.x - this.y) / h + 229 * (this.x + this.y - w) / h;
            this.blue = 155 * (w + h - this.x - this.y) / h + 130 * (this.x + this.y - w) / h
         }
         break;
      case 1:
         if(this.x+this.y <= w) {
            this.red = 255;
            this.green = (67 * (w - this.x - this. y) / w) + (129 * (this.x + this. y) / w);
            this.blue = (28 * (w - this.x - this. y) / w) + (18 * (this.x + this. y) / w);
         }
         else {
            this.red = 255;
            this.green = 129 * (w + h - this.x - this.y) / h + 255 * (this.x + this.y - w) / h;
            this.blue = 18 * (w + h - this.x - this.y) / h + 43 * (this.x + this.y - w) / h
         }
         break;
      case 2:
         if(this.x+this.y <= w) {
            this.red = 255 * (w - this.x - this.y) / h;
            this.green = 255 * (this.x + this. y) / h ;
         }
         else {
            this.green = 255 * (w + h - this.x - this.y) / h ;
            this.blue = 255 * (this.x + this.y - w) / h;
         }
         break;
      case 3:
         if(this.x+this.y <= w) {
            this.red = (33 * (w - this.x - this.y) / w) + (87 * (this.x + this. y) / w);
            this.green = (103 * (w - this.x - this. y) / w) + (171 * (this.x + this. y) / w);
            this.blue = (30 * (w - this.x - this. y) / w) + (68 * (this.x + this. y) / w);
         }
         else {
            this.red = (87 * (w + h - this.x - this.y) / h) + (211 * (this.x + this.y - w) / h);
            this.green = (171 * (w + h - this.x - this.y) / h) + (0 * (this.x + this.y - w) / h);
            this.blue = (68 * (w + h - this.x - this.y) / h) + (20 * (this.x + this.y - w) / h);
         }
         break;
     }
     ctx.fillStyle = "rgba(" + this.red + "," + this.green + "," + this.blue + ",1)";
     ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
   }
   update(b) {
     this.I = 4;
      this.speed += b;
      let dx = (mouse.x - this.x);
      let dy = (mouse.y - this.y);
      let distance = Math.sqrt(dx * dx + dy * dy);
      let maxDistance = mouse.radius;
      let force = (maxDistance - distance) / maxDistance; // 0 ~ 1
      let forceDirectionX = dx / distance;
      let forceDirectionY = dy / distance;
      let directionX = forceDirectionX * force * this.speed;
      let directionY = forceDirectionY * force * this.speed;
      
     let flag = false;
     let drawn = false;
     for (let i = 0; i < 4; i++) {
      let tx = exX[i];
      let ty = exY[i];
      let tdistance = Math.sqrt((tx-mouse.x)*(tx-mouse.x) + (ty-mouse.y)*(ty-mouse.y));
      if(tdistance < 100) {
         onevent[i] = 2;
         flag = true;
         this.I = i;
      }
      else if(tdistance < 200) {
        onevent[i]=3;
      }
      else if(tdistance < 300){
        onevent[i] = 1;
      }
      else {
        onevent[i] = 0;
      }
     }
     if (flag) {
      let tx = exX[this.I];
      let ty = exY[this.I];
      let tdx = tx - this.x;


      let tdy = ty - this.y;
      let tdistance = Math.sqrt(tdx * tdx + tdy * tdy);
      let tforce = (150 - tdistance) / 150; // 0 ~ 1
         let tforceDirectionX = tdx / tdistance;
         let tforceDirectionY = tdy / tdistance;
         let tdirectionX = tforceDirectionX * tforce * this.speed;
         let tdirectionY = tforceDirectionY * tforce * this.speed;
      
      if(drawn == false) {
         canvas.style.backgroundColor = "rgba(0,0,0,1)"
         ctx.fillStyle = "rgba(255,255,255,1)";
         ctx.beginPath();
         ctx.arc(tx, ty, 145, 0, Math.PI * 2);
         ctx.closePath();
         ctx.fill();
         switch (this.I){
            case 0:
               im0.style.opacity = 1;
               break;
            case 1:
               im1.style.opacity = 1;
               break;
            case 2:
               im2.style.opacity = 1;
               break;
            case 3:
               im3.style.opacity = 1;
               break;
         }
         drawn = true;
      }

      if (tdistance < 150) {
         this.x -= tdirectionX;
         this.y -= tdirectionY;
      } else {
         if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 10;
         }
         if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 10;
         }
      }
     } else {
      canvas.style.backgroundColor = "white";
      im0.style.opacity=0;
      im1.style.opacity=0;
      im2.style.opacity=0;
      im3.style.opacity=0;
      if (distance < mouse.radius) {
         this.x -= directionX;
         this.y -= directionY;
       } else {
         if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 10;
         }
         if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 10;
         }
       }
     }
      this.speed -= b;
   }
}



init();
window.addEventListener('mousedown', mouseclick);
window.addEventListener('mouseup', mouseclickoff);
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseout", mouseout);