// JavaScript Document
/*jshint esversion: 6*/

//import {
//  Vector3
//} from './_core/three.module.js';


export default class PlayerControls {

  constructor() {
    this.keys = [];
    this.velZ = 0; //foward/backward
    this.velX = 0; // left/right
    this.speed = 2; // max speed
    this.friction = 0.1; // friction
  }
  
  update(controls) {
    // space=32, enter=13, shift=16
    if (this.keys[83]) {
      // S
        if (this.velZ > -this.speed) {
            this.velZ--;
        }
    }

    if (this.keys[87]) {
      // W
        if (this.velZ < this.speed) {
            this.velZ++;
        }
    }
    if (this.keys[68]) {
      // D
        if (this.velX < this.speed) {
            this.velX++;
        }
    }
    if (this.keys[65]) {
      // A
        if (this.velX > -this.speed) {
            this.velX--;
        }
    }
    if (this.keys[69]) {
      // E
      
    }
    if (this.keys[67]) {
//      // C
//      this.posY -= 1;
//      console.log(this.keys[67]);
//      if (this.keys[67]) {
//        console.log('key down');
//        controls.getObject().position.y === 1.5 ? controls.getObject().position.y = 0.8 : controls.getObject().position.y = 1.5;
      controls.getObject().position.y = 0.8;
//      } else {
//        console.log('key up');
//      }
//      console.log(controls.getObject());
////        if (this.velX > -this.speed) {
////            this.velX--;
////        }
    }
//console.log(this.velZ);
    // apply some friction to z velocity.
    this.velZ *= this.friction;
    controls.moveForward(this.velZ);

//        controls.moveForward( - velocity.z * delta );
    // apply some friction to x velocity.
    this.velX *= this.friction;
    controls.moveRight(this.velX);
  }
  
}