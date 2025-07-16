let resultProgress = 0;
let wasChanged = false;

function onResult(initialized) {
    if (!initialized) {
        resultProgress = 0;
        wasChanged = false;
    }
    resultProgress += 1 / frameRate();
    
    fill(255);
    nineSlice(panel_question, 24, 210, 752, 158, 48);
    fill(0);
    textStyle(BOLD);
    textFont("Cinzel");
    text(questions[currentQuestion].question, 24, 210, 752, 158);

    for (let i = 0; i < 4; i++) {
        fill(255);
        textStyle(NORMAL);
        let c = color(255, 255, 255);
        if (resultProgress < 1.5 && currentAnswer === i) {
            c = color(196, 196, 255);
        } else if (resultProgress > 1.5 && i == questions[currentQuestion].correct) {
            c = color(196, 255, 196);
        } else if (resultProgress > 1.5 && currentAnswer == i) {
            c = color(255, 196, 196);
        }
        drawButton(questions[currentQuestion].answers[i], BUTTON_LAYOUT[i], c);
    }
    
    let player = () => drawPlayer(width * pX, 64,  floor(frameCount / 30) % 2);
    let enemy = () => drawEnemy(width * eX, 64,  floor(frameCount / 30) % 2);

    if (resultProgress > 1 && resultProgress < 2)
    {
        console.log(2 + floor((resultProgress - 1) * 2) % 2)
        if (currentAnswer == questions[currentQuestion].correct)
            player = () => drawPlayer(width * pX, 64, 2 + floor((resultProgress - 1) * 2) % 2);
        else 
            enemy = () => drawEnemy(width * eX, 64, 2 + floor((resultProgress - 1) * 2) % 2);
    }
    if (resultProgress > 1.5 && resultProgress < 2)
    {
        if (currentAnswer == questions[currentQuestion].correct)
            enemy = () => {
                tint(255, (resultProgress - 1.5) * 512, (resultProgress - 1.5) * 512);
                drawEnemy(width * eX + (16 * sin((resultProgress - 1.5) * PI * 2)), 64, 1);
                tint(255, 255, 255);
            }
        else 
            player = () => {
                tint(255, (resultProgress - 1.5) * 512, (resultProgress - 1.5) * 512);
                drawPlayer(width * pX - (16 * sin((resultProgress - 1.5) * PI * 2)), 64, 1);
                tint(255, 255, 255);
            }
    }

    player();
    enemy();

    drawPlayerHealth();
    drawEnemyHealth();

    if (!wasChanged && resultProgress > 1.5) {
        if (currentAnswer == questions[currentQuestion].correct)
            enemyHealth--;
        else health--;

        wasChanged = true;
    }

    if (resultProgress > 3)
        states.Goto("start");
}