const svg = {
  add: (a = [], b = []) => {
    return [a[0] + b[0], a[1] + b[1]];
  },

  sub: (a = [], b = []) => {
    return [a[0] - b[0], a[1] - b[1]];
  },

  screenToCanvas: (
    point = { x: null, y: null },
    camera = { x: 0, y: 0, z: 1 }
  ) => {
    return {
      x: point.x / camera.z - camera.x,
      y: point.y / camera.z - camera.y,
    };
  },

  canvasToScreen: (
    point = { x: null, y: null },
    camera = { x: 0, y: 0, z: 1 }
  ) => {
    return {
      x: (point.x + camera.x) * camera.z,
      y: (point.y + camera.y) * camera.z,
    };
  },

  getViewport: (
    box = {
      minX: null,
      minY: null,
      maxX: null,
      maxY: null,
      width: null,
      height: null,
    }
  ) => {
    const topLeft = screenToCanvas({ x: box.minX, y: box.minY });
    const bottomRight = screenToCanvas({ x: box.maxX, y: box.maxY });

    return {
      minX: topLeft.x,
      minY: topLeft.y,
      maxX: bottomRight.x,
      maxY: bottomRight.y,
      height: bottomRight.x - topLeft.x,
      width: bottomRight.y - topLeft.y,
    };
  },
}; // end class

//export default svg;
module.exports.svg = svg;
