export class Staff {
  constructor(public x: number, public y: number, public width: number) {}

  render(ctx: CanvasRenderingContext2D) {
    // Draw 5 horizontal lines
    const spacing = 10;
    for (let i = 0; i < 5; i++) {
      const y = this.y + i * spacing;
      ctx.beginPath();
      ctx.moveTo(this.x, y);
      ctx.lineTo(this.x + this.width, y);
      ctx.stroke();
    }
  }
}
