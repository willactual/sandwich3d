// JavaScript Document
/*jshint esversion: 6*/

import * as THREE from './_core/three.module.js';

import { RectAreaLightHelper } from './_core/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from './_core/RectAreaLightUniformsLib.js';

export default class Lights {

  constructor(scene, seeHelpers) {
    this.scene = scene;
    this.seeHelpers = seeHelpers;
    this.initialize();
  }
  
  degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi/180);
  }

  initialize() {
    this.sun = new THREE.AmbientLight(0x404040, 2); // soft white light
    this.sun.position.set(0, 50, 0);
    // Add hemisphere light to scene
    this.scene.add(this.sun);
    
//    if (this.seeHelpers) {
//      const hemiHelper = new HemisphereLightHelper( this.sun, 1 );
//      this.scene.add( hemiHelper );
//    }
    
    RectAreaLightUniformsLib.init();
    //              (color, width, height, intensity, posX, posZ, posY, tarX, tarZ, tarY)
    this.addRectLight(0xFFFFFF, 10, 2.5, 1, 0, 7, 2, 0, -5, 2);
    
    this.addRectLight(0xf72f30,4,0.7,3, -3.4, 0.5, 2.5, 3.2,0.5,2.5);
    this.addRectLight(0xe5b40f,4,0.7,3, -3.4, 0.5, 1.8, 3.2,0.5,1.8);
//    f72f30 //red
//    e5b40f //yel
    
//    this.addDirectionLight(0, 2, 6.5);
//    this.addDirectionLight(5, 8, 0);
//    this.addDirectionLight(-5, 8, 0);
    
    this.addDirectionLight(0, 3, 0);
    this.addDirectionLight(0, 3, 5);
//    this.addDirectionLight(0, 3, -5);
//    this.addDirectionLight(0, 0, 0);
    
    // Lights on wall near door
//    this.addSpotLight(3,-3,3,-3);
//    this.addSpotLight(-1,-5,-1,-5);
    
    //front of shop next to street
    this.addSpotLight(2.3, 2.7, 2.3, 2.7); // by shop door
    this.addSpotLight(-2.3, 2.7, -2.3, 2.7);
//    this.addSpotLight(-3,3,-3,3);
    
    
    // middle
    this.addSpotLight(2.3, -2.3, 2.3, -2.3);
    this.addSpotLight(-2.3, -2.3, -2.3, -2.3);
    
    // kitchen
//    this.addSpotLight(-1,-1,-1,-1);
    this.addSpotLight(-2, -5.2, 0, -4);
    
    
  }
  
  addDirectionLight(x,y,z) {
//    let d = 25;
    let dirLight = new THREE.DirectionalLight(0xffffff, 0.2);
    dirLight.position.set(x,y,z);
    dirLight.target.position.set(x,0,z);
//    dirLight.castShadow = true;
//    dirLight.shadow.mapSize = new Vector2(104, 100);
//    dirLight.shadow.camera.near = 0.1;
//    dirLight.shadow.camera.far = 10;
//    dirLight.shadow.camera.left = d * -1;
//    dirLight.shadow.camera.right = d;
//    dirLight.shadow.camera.top = d;
//    dirLight.shadow.camera.bottom = d * -1;
    dirLight.target.updateMatrixWorld();
    // Add directional Light to scene
    this.scene.add(dirLight);
    
    if (this.seeHelpers) {
      const dirHelper = new THREE.DirectionalLightHelper( dirLight, 2 );
      this.scene.add( dirHelper );
    }
    
  }
  
  addRectLight(color, width, height, intensity, posX, posZ, posY, tarX, tarZ, tarY) {
//    const width = 10;
//    const height = 3;
//    const intensity = 2;
    const rectLight = new THREE.RectAreaLight( color, intensity,  width, height );
    rectLight.position.set( posX, posY, posZ );
    rectLight.lookAt( tarX, tarY, tarZ);
    this.scene.add( rectLight );

    if (this.seeHelpers) {
      const rectLightHelper = new RectAreaLightHelper( rectLight );
      rectLight.add( rectLightHelper );
    }
  }
  
  addSpotLight(x,z, tarX, tarZ) {
    /*
      x
      y
      tarX=to or from camera
      tarZ=left or right
    */
    let spotAngle = this.degrees_to_radians(45);
    //                                color, intensity,distance,angle
    const spotLight = new THREE.SpotLight( 0xE7EAFF, 0.1, 0, spotAngle, 0.5);
    spotLight.position.set( x, 3, z );
    //                            left or right, up or down, back or front
    spotLight.target.position.set(tarX,-10,tarZ);

    spotLight.castShadow = true;
    spotLight.target.updateMatrixWorld();


    this.scene.add( spotLight );
    this.scene.add( spotLight.target );
    
    if (this.seeHelpers) {
      const spotLightHelper = new THREE.SpotLightHelper( spotLight );
      this.scene.add( spotLightHelper );
    }
  }
  
}