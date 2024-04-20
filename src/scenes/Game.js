import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
  }
  preload() {
    this.load.image("background", "assets/country.png");
    this.load.image("hero", "assets/cat2.png");
    this.load.image("ball", "assets/ball.png");
  }

  create() {
    this.add.image(0, 0, "background").setOrigin(0);
    this.physics.world.gravity.y = 300;
    this.hero = this.physics.add.sprite(400, 400, "hero");

    let invisiblePlatform = this.physics.add.staticGroup();
    this.platform = invisiblePlatform.create(400, 700);

    this.platform.setSize(1200, 50);
    this.platform.setAlpha(0);

    this.physics.add.collider(this.hero, this.platform);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.hero.setCollideWorldBounds(true);

    this.balls = this.physics.add.group({
      key: "ball",
      repeat: 5,
      setXY: { x: 50, y: 0, stepX: 70 },
    });

    this.balls.children.iterate((ball) => {
      const randomX = Phaser.Math.Between(0, this.physics.world.bounds.width);
      const randomY = Phaser.Math.Between(0, this.physics.world.bounds.height);

      ball.setPosition(randomX, randomY);

      ball.setCollideWorldBounds(true);
      ball.setBounce(1);
      ball.setVelocity(Phaser.Math.Between(-200, 200), 20);
    });
  }

  update() {
    if (this.cursors.up.isDown && this.hero.body.touching.down) {
      this.hero.setVelocityY(-330);
    }

    if (this.cursors.left.isDown) {
      this.hero.setScale(-1, 1);
      this.hero.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.hero.setScale(1, 1);
      this.hero.setVelocityX(160);
    } else {
      this.hero.setVelocityX(0);
    }

    this.physics.overlap(this.hero, this.balls, this.collectBall, null, this);

    this.collectBall = (hero, ball) => {
      ball.disableBody(true, true);
    };
  }
}
