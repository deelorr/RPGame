class Map {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => null)
    );
  }

  placeTile(tileType, x, y) {
    if (this.isValidPosition(x, y)) {
      this.grid[y][x] = tileType;
    }
  }

  placeRow(tileType, y) {
    for (let x = 0; x < this.width; x++) {
      this.placeTile(tileType, x, y);
    }
  }

  placeColumn(tileType, x) {
    for (let y = 0; y < this.height; y++) {
      this.placeTile(tileType, x, y);
    }
  }

  isValidPosition(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  getItem(x, y) {
    if (this.isValidPosition(x, y)) {
      return this.grid[y][x];
    }
    return null;
  }

  removeItem(x, y) {
    if (this.isValidPosition(x, y)) {
      this.grid[y][x] = "plainTile";
    }
  }

  findItemPosition(item) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.grid[y][x] === item) {
          return { x, y };
        }
      }
    }
    return null;
  }
}

export default Map;
