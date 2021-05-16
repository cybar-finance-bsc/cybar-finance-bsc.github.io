class BoxedValue {
  fwd = true;
  flipped = false;

  constructor(initialValue = 0, min = 0, max = 100) {
    this.value = initialValue;
    this.min = min;
    this.max = max;
  }

  move(byValue) {
    this.value = this.fwd
      ? Math.min(this.value + byValue, this.max)
      : Math.max(this.min, this.value - byValue);

    if (!this.flipped && this.value >= this.max) {
      this.flipped = true;
      this.fwd = false;
    } else if (this.flipped && this.value <= this.min) {
      this.flipped = false;
      this.fwd = true;
    }
  }
}

const spotlight = document.querySelector(".bm-spotlight");
const xStep = 0.14;
const yStep = 0.18;
let x = new BoxedValue(20, 8, 90);
let y = new BoxedValue(20, 8, 90);

function animationLoop() {
  spotlight.style.setProperty("--x", x.value + "%");
  spotlight.style.setProperty("--y", y.value + "%");

  //Faster animation for narrower sreens
  const xFactor = Math.max(1, 1200 / window.innerWidth);
  x.move(xStep * xFactor);
  y.move(yStep);
  requestAnimationFrame(animationLoop);
}

animationLoop();
