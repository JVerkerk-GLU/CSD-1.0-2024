class Button {
    /**
     * @param {number} x The x-coordinate of the button.
     * @param {number} y The y-coordinate of the button.
     * @param {number} size The width and height of the square button.
     * @param {string} label The text/icon displayed inside the button (e.g., "▶", "⏸", "■").
     * @param {string} action The action associated with the button (e.g., 'play', 'stop').
     */
    constructor(x, y, size, label, action) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.label = label;
        this.action = action;
        this.isHovered = false;
    }

    // A method to draw the button
    draw() {
        this.isHovered = this.checkHover();

        // Button background color (dark gray, lighter on hover)
        fill(this.isHovered ? 100 : 50);
        rect(this.x, this.y, this.size, this.size, 4); // Draw the rounded square button

        // Icon text style
        textAlign(CENTER, CENTER);
        textSize(14);
        fill(255);
        text(this.label, this.x + this.size / 2, this.y + this.size / 2); // Draw the icon
    }

    // Checks if the mouse is currently over the button
    checkHover() {
        return mouseX > this.x &&
               mouseX < this.x + this.size &&
               mouseY > this.y &&
               mouseY < this.y + this.size;
    }

    // Checks if the mouse was pressed inside the button
    isClicked() {
        return this.checkHover(); // On mousePressed, this is sufficient for a click
    }

    // Update the label
    setLabel(newLabel) {
        this.label = newLabel;
    }
}