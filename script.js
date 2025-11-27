
const particleCount = 40;
for(let i=0;i<particleCount;i++){
    const p = document.createElement('div');
    p.className='particle';
    p.style.left = Math.random()*window.innerWidth+'px';
    p.style.top = Math.random()*window.innerHeight+'px';
    p.style.width = p.style.height = (4+Math.random()*6)+'px';
    document.body.appendChild(p);
}

// IMAGE PROCESSING
document.getElementById("input").addEventListener("change", e => {
  const files = [...e.target.files];
  const out = document.getElementById("out");
  out.innerHTML = "";

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        const size = Math.max(img.width,img.height);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = canvas.height = size;

        ctx.fillStyle="black";
        ctx.fillRect(0,0,size,size);
        ctx.drawImage(img,(size-img.width)/2,(size-img.height)/2);

        const box = document.createElement("div");
        box.className="box";

        const boxInner = document.createElement("div");
        boxInner.className="box-inner";

        const canvasWrapper = document.createElement("div");
        canvasWrapper.className="canvas-wrapper";
        canvasWrapper.appendChild(canvas);

        const button = document.createElement("button");
        button.textContent="Download";
        button.onclick = ()=>{
          canvas.toBlob(blob=>{
            const a=document.createElement("a");
            a.href=URL.createObjectURL(blob);
            a.download="square_"+file.name;
            a.click();
            URL.revokeObjectURL(a.href);
          },"image/png");
        };

        boxInner.append(canvasWrapper,button);
        box.appendChild(boxInner);
        out.appendChild(box);
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });
});