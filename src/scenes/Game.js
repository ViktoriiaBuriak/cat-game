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
    this.platform = invisiblePlatform.create(400, 750);

    this.platform.setSize(1200, 20);

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

    //level
    this.level = 1;
    this.levelText = this.add.text(16, 50, "level: " + this.level, {
      fontSize: "32px",
      fill: "#000",
    });

    //Score
    this.score = 0;
    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#000",
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
      this.score += 10;
      this.scoreText.setText("score: " + this.score);
      if (this.balls.countActive(true) === 0) {
        this.balls.children.iterate((ball) => {
          ball.enableBody(true, ball.x, 0, true, true);
          ball.setVelocity(
            Phaser.Math.Between(-200, 200),
            Phaser.Math.Between(-200, 200)
          );
        });

        this.level++;
        this.levelText.setText("level: " + this.level);
      }
    };
  }
}
