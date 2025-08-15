Fr = {
    fruitsize: 32,
    db: ["banana", "cherry", "pineapple", "beer", "burger", "hotdog", "lollipop", "icecream", "broccoli", "aubergine"],
    Frequency: 70 // in percentage
};

function GenFruit(x, y) {
    var fsize = Fr.fruitsize;
    var points = 25;

    if (roll(50) == 1) {
        fsize *= 3;
        points = 100;
    }

    var x = x - fsize / 2;
    var h = y - fsize;
    var FruitType = Fr.db[roll(Fr.db.length) - 1];

    var Fruit = Crafty.e('spawnable, ' + FruitType + ', 2D, Color, DOM, Collision, Tween')
        .attr({ x: x, y: h, w: fsize, h: fsize, points: points });

    Fruit.bind("EnterFrame", function () {
        this.y -= _currPspeed;
        if (this.y < -this.h || this.y > _h + this.h + 1) {
            this.destroy();
        }
    });

    Fruit.onHit('Player_element', function (who) {
		
		// Prevent multiple hits triggering multiple animations
        if (this._eaten) return;
        this._eaten = true;
        playsound("bite");

        // Score & fat logic
        if (this.has("hotdog") || this.has("burger") || this.has("lollipop") || this.has("icecream")) {
            who[0].obj.fat_component.getFat();
            G.score.add(this.points * 5, who[0].obj);
        } else {
            G.score.add(this.points, who[0].obj);
            if (roll(3) < 4) {
                who[0].obj.fat_component.removeFat();
            }
        }

        // Animate shrink to 0 over 0.5 sec (500ms)
        this.tween({ w: 0, h: 0, x: this.x + this.w / 2, y: this.y - this.h }, 500) // 30 frames ≈ 0.5 sec
            .bind("TweenEnd", function () {
                this.destroy();
            });
    });
}
