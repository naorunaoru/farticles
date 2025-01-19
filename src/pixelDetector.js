export class PixelDetector {
  width = 0;
  height = 0;

  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.canvas = new OffscreenCanvas(this.width, this.height);
    this.ctx = this.canvas.getContext("2d");
  }

  async loadAndDrawSVG(svgUrl, x, y, width, height) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.ctx.drawImage(img, x, y, width, height);
        resolve();
      };
      img.onerror = reject;
      img.src = svgUrl;
    });
  }

  getOpaquePixels() {
    const imageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    const pixels = [];

    for (let y = 0; y < this.canvas.height; y++) {
      for (let x = 0; x < this.canvas.width; x++) {
        const index = (y * this.canvas.width + x) * 4;
        if (imageData.data[index + 3] > 0) {
          pixels.push({
            x,
            y,
          });
        }
      }
    }

    return pixels;
  }
}
