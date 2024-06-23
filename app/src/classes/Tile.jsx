class Tile {
  constructor(walkable) {
    this.walkable = walkable;
  }
}

class BuildingTile extends Tile {
  constructor() {
    super(false); // not walkable
  }
}

class TreeTile extends Tile {
  constructor() {
    super(false); // not walkable
  }
}

class RoadTile extends Tile {
  constructor() {
    super(true); // walkable
  }
}

class DirtTile extends Tile {
  constructor() {
    super(true); // walkable
  }
}

class TransitionTile extends Tile {
  constructor(targetMapIndex, targetX, targetY) {
    super(true); // walkable
    this.targetMapIndex = targetMapIndex;
    this.targetX = targetX;
    this.targetY = targetY;
  }
}

export { BuildingTile, TreeTile, DirtTile, RoadTile, TransitionTile };
export default Tile;
