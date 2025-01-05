export class Note {
  constructor(public pitch: string, public x: number, public y: number) {}

  render(ctx: CanvasRenderingContext2D) {
    // Draw the note head as a filled circle
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    ctx.fill();

    // Draw the stem
    ctx.beginPath();
    ctx.moveTo(this.x + 5, this.y);
    ctx.lineTo(this.x + 5, this.y - 30);
    ctx.stroke();

    // Add pitch text
    ctx.font = "12px Arial";
    ctx.fillText(this.pitch, this.x - 10, this.y + 20);
  }
}
