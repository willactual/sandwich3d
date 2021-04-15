// JavaScript Document
/*jshint esversion: 6*/

import {
  Raycaster
} from './_core/three.module.js';


export default class PickHelper {
  
  constructor() {
    this.raycaster = new Raycaster();
    this.pickedObject = null;
    this.pickedObjectSavedColor = 0;
  }
  
  pick(normalizedPosition, scene, camera) {
//    time *= 0.0002;
    // restore the color if there is a picked object
    if (this.pickedObject) {
      this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
      this.pickedObject = undefined;
    }
 
    // cast a ray through the frustum
    this.raycaster.setFromCamera(normalizedPosition, camera);
    // Limits the object availability
    this.raycaster.far = 1.5;
    // get the list of objects the ray intersected
    const intersectedObjects = this.raycaster.intersectObjects(scene.children[10].children);
//    console.log(this.raycaster);
      
      if (intersectedObjects.length) {
        
//        if (intersectedObjects[0].object.name !== "floor" && 
//            intersectedObjects[0].object.name.slice(0,4) !== "wall" && 
//            intersectedObjects[0].object.name.slice(0,4) !== "Lens" && 
//            intersectedObjects[0].object.name.slice(0,4) !== "spot") {
//          // pick the first object. It's the closest one
//          this.pickedObject = intersectedObjects[0].object;
//          
////          console.log(this.pickedObject);
//          // save its color
//          this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();
//          // set its emissive color to flashing red/yellow
////          this.pickedObject.material.emissive.setHex((time * 8) % 2 > 1 ? 0xFFFF00 : 0xFF0000);
////          this.pickedObject.material.emissive.setHex(0x0054FF);
//          this.pickedObject.material.emissive.setHex(0x0054FF);
//          this.pickedObject.material.emissiveIntensity = 0.2;
//      }
    }
    
    return this.pickedObject;
    
  }  
}