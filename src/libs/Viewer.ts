// need threejs
import * as THREE from "three";

// class vUtils
class vUtils {
  constructor() {}

  // AxesHelper
  // AxesHelper( size : number )
  AxesHelper = (size: number = 1) => {
    return new THREE.AxesHelper(size) as THREE.AxesHelper;
  };

  // GridHelper
  // GridHelper( size : number, divisions : number, colorCenterLine : Color, colorGrid : Color )
  GridHelper = (size: number = 40, divisions: number = 20) => {
    return new THREE.GridHelper(
      size,
      divisions,
      0x666666,
      0x404040
    ) as THREE.GridHelper;
  };
}
// export
export { vUtils };
