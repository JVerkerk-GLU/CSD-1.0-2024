function nineSlice(texture, x1, y1, x2, y2, size = 64) {
    // Corners
    image(texture, x1, y1, 20, 20, 0, 0, 20, 20);
    image(texture, x1 + x2 - 20, y1, 20, 20, size - 20, 0, 20, 20);
    image(texture, x1, y1 + y2 - 20, 20, 20, 0, size - 20, 20, 20);
    image(texture, x1 + x2 - 20, y1 + y2 - 20, 20, 20, size - 20, size - 20, 20, 20);
    // Sides
    image(texture, x1 + 20, y1, x2 - 40, 20, 20, 0, size - 40, 20);
    image(texture, x1 + 20, y1 + y2 - 20, x2 - 40, 20, 20, size - 20, size - 40, 20);
    image(texture, x1, y1 + 20, 20, y2 - 40, 0, 20, 20, size - 40);
    image(texture, x1 + x2 - 20, y1 + 20, 20, y2 - 40, size - 20, 20, 20, size - 40);
    // Fill
    image(texture, x1 + 20, y1 + 20, x2 - 40, y2 - 40, 20, 20, size - 40, size - 40);
}

function character(texture, x, y, frame, index, size = 80) {
    image(texture, x, y, size, size, Math.floor(frame % 4) * size, index * size, size, size);
}

function portrait(texture, x, y, frame, index, size = 80) {
    image(texture, x, y, size, size, Math.floor(index % 8) * size, ((Math.floor(index / 8) * 2) + Math.floor(frame % 2)) * size, size, size);
}