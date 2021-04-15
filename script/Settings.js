// JavaScript Document
/*jshint esversion: 6*/

// Import Three JS
import * as THREE from './_core/three.module.js';

export default class Settings {
  constructor() {

this.Initialize();

  }

  Initialize() {
    this.txtPathStart = 'file:///C:/Users/1383396987E/Documents/development/threejs/sandwich shop/_v3/images/';
    this.model = 'models/shop4.gltf';
    
    this.fov = 60;
    this.aspect = window.innerWidth / window.innerHeight;
    this.near = 0.1;
    this.far = 1000.0;

    this.startZ = -5;
    this.startX = 0;
    this.startY = 1.5;

    this.startDir = new THREE.Vector3( 0, 0, 1 );

    this.pi = Math.PI;
    this.deg180 = Math.PI / 2;
    this.deg90 = -Math.PI / 2;

    this.white = new THREE.Color(0xFFFFFF);
    this.offWhite = new THREE.Color(0xF1F1F1);

    this.offBlack = new THREE.Color(0x101010);

    this.grey = new THREE.Color(0x9e9e9e);
    this.darkGrey = new THREE.Color(0x808080);
  }

  degrees_to_radians(degrees) {
    return degrees * (this.pi/180);
  }
}
