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
                drawEnemyHealth();
            }
    }

    if (levelUpProgress > 0.5)
    {
        player = () => drawPlayer(width * (pX + (levelUpProgress * 0.5 - 0.25)), 64 + Math.cos((levelUpProgress - 0.5) * 48) * 3 , floor(frameCount / 30) % 2);
    }

    if (levelUpProgress > 2)
    {
        background(0, 0, 0, (levelUpProgress - 2) * 1024)
    }

    if (levelUpProgress > 2.5)
    {
        states.Goto("start");
    }

    player();
    enemy();

    drawPlayerHealth();
}