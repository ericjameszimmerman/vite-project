import { Staff } from "./Staff";
import { Note } from "./Note";

export class Renderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(canvasId: string) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) throw new Error(`Canvas with ID "${canvasId}" not found.`);
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
  }

  render(staff: Staff, notes: Note[]) {
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Render the staff
    staff.render(this.ctx);

    // Render the notes
    notes.forEach(note => note.render(this.ctx));
  }
}
