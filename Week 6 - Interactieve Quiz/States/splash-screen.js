splashProgress = 0;
splashContinue = false;

function onSplashScreen(initialized) {
    if (!initialized) {
        splashProgress = 0;
    }
    splashProgress += 1/frameRate();

    if (!splashContinue && splashProgress > 2)
        splashProgress = 2;

    image(bg_menu, 0, 0, 800, 600);

    let dividerMoveX = (1 - min(0.5, sin(((splashProgress - 1.5) / 1.5) * PI)) * 2) + sin(frameCount / 30 * PI) * 0.2;
    push();
    image(panel_divider, 128 - 256 * dividerMoveX, height * 0.85 - 18, 96, 18);
    pop();
    push();
    scale(-1, 1);
    image(panel_divider, -width + 128 - 256 * dividerMoveX, height * 0.85 - 18, 96, 18);
    pop();

    let tAlpha = max(0, min(1, 4 * sin(((splashProgress - 1.5) / 2.5) * PI)));
    let tSize = sin(((splashProgress - 1.5) / 2.5) * HALF_PI);

    fill(255, 255, 255, tAlpha * 255);
    textSize(min(48, 24 + 32 * tSize) * (1 + 0.1 * sin(frameCount / 30 * PI)));
    textFont("Merienda");
    text("Click to Start", width * 0.5, height * 0.85 - 8);

    background(0, 0, 0, max(splashProgress - 2, 0.5 - splashProgress, 0) * 1024)

    if (splashProgress > 2.5)
        states.Goto("difficultySelect");
}

function onSplashScreenClick() {
    splashContinue = true;
}