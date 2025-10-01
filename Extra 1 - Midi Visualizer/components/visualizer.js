let notes = [];
let addSpeed = 5;
let removeSpeed = 10;

const VISUALIZER_MAX = 3;
const VISUALIZER_X = 600;
const VISUALIZER_Y = 270;
const VISUALIZER_W = 16;
const VISUALIZER_INNER = 64;
const VISUALIZER_NOTE_HEIGHT = 64;

function setupVisualizer() {
    for (let i = 0; i < 24; i++) {
        notes.push({
            target: 0,
            current: 0
        })
    }

    synth.addListener("attack", (event) => {
        notes[event.midi % notes.length].target++;
    });
}

function drawVisualizer() {

    colorMode(HSB, 360, 100, 100);

    for (let i = 0; i < notes.length; i++) {
        if (notes[i].target > 0) {
            notes[i].target = constrain(notes[i].target - removeSpeed * (deltaTime / 1000), 0, VISUALIZER_MAX)
        }
        if (notes[i].current < notes[i].target) {
            notes[i].current = min(notes[i].current + addSpeed * (deltaTime / 1000), notes[i].target);
        } else if (notes[i].current > notes[i].target) {
            notes[i].current = max(notes[i].current * 0.95, notes[i].target);
        }

        push();
        translate(VISUALIZER_X, VISUALIZER_Y);
        rotate(TWO_PI * (i / notes.length) + frameCount / 120);
        noStroke();
        fill((i * (360 / notes.length) + frameCount * 2) % 360, 80, 100);
        rect(-VISUALIZER_W * 0.5, VISUALIZER_INNER, VISUALIZER_W, max(4, notes[i].current * VISUALIZER_NOTE_HEIGHT), 2, 2);

        rect(-VISUALIZER_W * 0.5, VISUALIZER_INNER + max(4, notes[i].target * VISUALIZER_NOTE_HEIGHT) + 4, VISUALIZER_W, 4);

        pop();
    }
}