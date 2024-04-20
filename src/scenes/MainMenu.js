import { Scene } from 'phaser';

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    const startButton = this.add
      .text(400, 300, "Lets start💕", { fontSize: "32px", fill: "#fff"})
      .setInteractive()
      .on("pointerdown", () => this.startGame());
      
      
  }

  startGame() {
    this.scene.start("Game");
  }
}
