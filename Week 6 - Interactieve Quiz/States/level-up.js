let levelUpProgress = 0;

function onLevelUp(initialized) {
    if (!initialized) {
        levelUpProgress = 0;
    }
    levelUpProgress += 1/frameRate();
    
    let player = () => drawPlayer(width * pX, 64, floor(frameCount / 30) % 2);
    let enemy = () => {};

    if (levelUpProgress < 0.5)
    {
        enemy = () => 
            {
                tint(255, 255, 255, 100 - (levelUpProgress * 200))
                drawEnemy(width * eX + random(-2,2), random(-2,2) + 64 + (levelUpProgress * 64), 0);
                tint(255, 255, 255);
            }
    }

    if (levelUpProgress > 0.5)
    {
        player = () => drawPlayer(width * (pX + (levelUpProgress * 0.5 - 0.25)), 64 + Math.cos((levelUpProgress - 0.5) * 48) * 3 , floor(frameCount / 30) % 2);
    }

    player();
    enemy();

    if (levelUpProgress > 2 && levelUpProgress < 2.5)
    {
        background(0, 0, 0, (levelUpProgress - 2) * 1024)
    }
    else if (levelUpProgress > 2.5)
    {
        let dividerMoveX = (1 - min(0.5, sin(((levelUpProgress - 2.5) / 2.5) * PI)) * 2);
        background(0);
        push();
        image(panel_divider, 32 - 256 * dividerMoveX, height * 0.5 - 18, 192, 36);
        pop();
        push();
        scale(-1, 1);
        image(panel_divider, -width + 32 - 256 * dividerMoveX, height * 0.5 - 18, 192, 36);
        pop();

        let tAlpha = max(0, min(1, 4 * sin(((levelUpProgress - 2.5) / 2.5) * PI)));
        let tSize = sin(((levelUpProgress - 2.5) / 2.5) * HALF_PI);

        fill(255, 255, 255, tAlpha * 255);
        textSize(min(72, 64 + 32 * tSize));
        textFont("Cinzel");
        text("Level Up", width * 0.5, height * 0.5 + 8);

        fill(192, 192, 192, tAlpha * 255);
        textSize(16);
        textFont("Merienda")
        text("LVL " + level + 1, width * 0.5, height * 0.5 + 48);
    }

    if (levelUpProgress > 5)
    {
        states.Goto("initLevel");
    }
}