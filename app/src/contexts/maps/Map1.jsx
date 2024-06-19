import Map from '../../classes/Map';
import Porter from '../../classes/characters/npc/Porter';
import { DirtTile, BuildingTile, TransitionTile } from '../../classes/Tile';

const initialMap1 = new Map(25, 10);

// Fill the entire map with DirtTile
for (let x = 0; x < 25; x++) {
    for (let y = 0; y < 10; y++) {
        initialMap1.placeTile(new DirtTile(), x, y);
    }
}

// Place rows of BuildingTile
for (let row = 0; row <= 6; row++) {
    initialMap1.placeRow(new BuildingTile(), row);
}

// Place specific columns of BuildingTile
const buildingColumns = [0, 1, 2, 8, 17, 19];
buildingColumns.forEach(col => initialMap1.placeColumn(new BuildingTile(), col));

// Place specific tiles
initialMap1.placeRow(new DirtTile(), 9);
initialMap1.placeTile(new DirtTile(), 0, 8);
initialMap1.placeTile(new DirtTile(), 1, 8);
initialMap1.placeTile(new DirtTile(), 2, 8);
initialMap1.placeTile(new BuildingTile(), 9, 7);
initialMap1.placeTile(new BuildingTile(), 10, 7);
initialMap1.placeTile(new BuildingTile(), 13, 7);
initialMap1.placeTile(new TransitionTile(1, 0, 9), 24, 9);
initialMap1.placeTile('store', 5, 6);
initialMap1.placeTile(new Porter(), 20, 7);

export default initialMap1;
