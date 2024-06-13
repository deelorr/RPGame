class Tile {
    constructor(walkable) {
        this.walkable = walkable;
    }
}

class BuildingTile extends Tile {
    constructor() {
        super(false); // Buildings are not walkable
    }
}

class TreeTile extends Tile {
    constructor() {
        super(false); // Trees are not walkable
    }
}

class RoadTile extends Tile {
    constructor() {
        super(true); // Roads are walkable
    }
}

class DirtTile extends Tile {
    constructor() {
        super(true); // Dirt is walkable
    }
}

class TransitionTile extends Tile {
    constructor(targetMapIndex, targetX, targetY) {
        super(true); // Transition tiles are walkable
        this.targetMapIndex = targetMapIndex;
        this.targetX = targetX;
        this.targetY = targetY;
        this.walkable = true;
    }
}

export { BuildingTile, TreeTile, DirtTile, RoadTile, TransitionTile };
export default Tile;
