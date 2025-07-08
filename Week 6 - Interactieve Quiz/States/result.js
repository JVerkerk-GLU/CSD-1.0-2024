
let timeline;

function onResult() {
    let player = () => character(char_player, width * 0.4, 64, floor(frameCount / 30) % 2);
    let enemy = () => character(char_enemy[0], width * 0.6, 64, floor(frameCount / 30) % 2);
    timeline++;


    if (timeline > 30 && timeline < 60)
    {
        if (currentAnswer == questions[currentQuestion].correct)
    }

    player();
    enemy();
}