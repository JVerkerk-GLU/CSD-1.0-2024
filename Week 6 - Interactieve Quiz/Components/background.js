let bgNoise = [[]];
const BG_TILE_SIZE = 64;
const NOISE_INTENSITY = 8;

function drawBackground() {
    for (let ix = 0; ix < width / BG_TILE_SIZE; ix++)
    {
        for (let iy = 0; iy < height / BG_TILE_SIZE; iy++)
        {
            const index = round(noise(ix, iy) * NOISE_INTENSITY) % 4;

            image(bg_tiles, 
                ix * BG_TILE_SIZE, iy * BG_TILE_SIZE, 
                BG_TILE_SIZE, BG_TILE_SIZE, 
                (index % 2) * BG_TILE_SIZE, floor(index / 2) * BG_TILE_SIZE, 
                BG_TILE_SIZE, BG_TILE_SIZE);
        }
    }
  for (let i = 0; i < width; i += 40) {
    image(bg_dungeon, i, 0, 40, 200);
  }
}