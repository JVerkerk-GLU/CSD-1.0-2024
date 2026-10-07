let initLevelProgress = 0;

function onInitLevel(initialized) {
    if (!initialized) {
        levelUpProgress = 0;
        
        if (question_table.has(level) && question_table.get(level))
        {
            health = MAX_HEALTH;
            enemyMaxHealth = question_table.get(level).health;
            enemyHealth = enemyMaxHealth;

            currentQuestion = -1;
            questions = 0;
            questions = shuffle(question_table.get(level).questions);
        }
    }
    levelUpProgress += 1/frameRate();

    let player = () => drawPlayer(width * (pX * (levelUpProgress - 0.5)), 64 + Math.cos((levelUpProgress - 0.5) * 48) * 3 , floor(frameCount / 30) % 2);
    
    player();
    drawEnemy(width * eX, 64, floor(frameCount / 30) % 2);

    if (levelUpProgress < 0.5)
    {
        background(0, 0, 0, 255 - ((levelUpProgress) * 512))
    }

    if (levelUpProgress > 1.5)
    {
        states.Goto("initRound");
    }
}