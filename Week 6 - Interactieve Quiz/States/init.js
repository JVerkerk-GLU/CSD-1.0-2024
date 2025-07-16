
function onInit() {
    level = 1;
    if (question_table.has(level) && question_table.get(level))
    {
        health = MAX_HEALTH;
        enemyHealth = MAX_ENEMY_HEALTH;

        currentQuestion = -1;
        questions = 0;
        questions = shuffle(question_table.get(level).questions);
        states.Goto("start");
    }
}