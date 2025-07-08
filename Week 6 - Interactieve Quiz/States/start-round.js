function onStartRound() {
    currentAnswer = -1;
    currentQuestion++;
    if (currentQuestion >= questions.length) {
        level++;
        currentQuestion = 0;
        questions = 0;
        questions = shuffle(question_table.get(level));
    }
    states.Goto("gameplay");
}