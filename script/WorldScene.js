// JavaScript Document
/*jshint esversion: 6*/

// Import Three JS
import * as THREE from './_core/three.module.js';

import {OrbitControls} from './_core/OrbitControls.js';
import { PointerLockControls } from './_core/PointerLockControls.js';

import Settings from './Settings.js';
import Model from './Model.js';
import Lights from './Lights.js';
import PlayerControls from './PlayerControls.js';
import PickHelper from './PickHelper.js';

export default class WorldScene {
  constructor(args) {
    this.newProject = args.newProject;
    this.inDevMode = args.inDevMode;
    this.seeHelpers = args.seeHelpers;
    this.initialize();
  }

  initialize() {
    this.playerControls = undefined;
//    this.controls = undefined;
    this.settings = new Settings();
    this.clock = new THREE.Clock();
    this.canvas = document.querySelector('#canvas');
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setPixelRatio(window.devicePixelRatio);

    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(this.settings.fov, this.settings.aspect, this.settings.near, this.settings.far);
    this.camera.position.set(this.settings.startX, this.settings.startY, this.settings.startZ);
    // this.camera.position.set(75, 20, 0);
    // this.setCameraVector = this.settings.startDir
    // const setCameraVector = new THREE.Vector3( 0, 0, 1 );
     this.camera.lookAt(this.settings.startDir);

    this.scene = new THREE.Scene();
    this.scene.background = this.settings.offWhite;

    if (this.newProject) {
      this.blankProject();
    } else {
      // Add models, lights, etc. here
      this.model = new Model(this.scene, this.camera, this.seeHelpers, this.settings);
      this.lights = new Lights(this.scene, this.seeHelpers);
    }

    if (this.inDevMode) {

      document.getElementById( 'blocker' ).style.display = 'none';
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
//      this.controls.target.set(0, 20, 0);
      this.controls.update();

    } else {
      this.playerControls = new PlayerControls();
      this.controls = new PointerLockControls(this.camera, this.renderer.domElement);
      const blocker = document.getElementById( 'blocker' );
      const instructions = document.getElementById( 'instructions' );

      instructions.addEventListener( 'click', function () {

        this.controls.lock();

      } );

      // Initial instruction overlay event listeners
      this.controls.addEventListener('lock', () => {

        instructions.style.display = 'none';
        blocker.style.display = 'none';

      });

      this.controls.addEventListener('unlock', () => {

        blocker.style.display = 'block';
        instructions.style.display = '';

      });

      this.scene.add(this.controls.getObject());
      
      // Key Press event listeners
      document.addEventListener( 'keydown', evt => {
        this.playerControls.keys[evt.keyCode] = true;
      }, false );
      document.addEventListener( 'keyup', evt => {
        this.playerControls.keys[evt.keyCode] = false;
        this.controls.getObject().position.y = 1.5;
      }, false );
//      document.addEventListener('click', mouseClick, false);
      
    }

    this.update();
  }

  resizeCheck() {

    let width = window.innerWidth;
    let height = window.innerHeight;
    let canvasPixelWidth = this.canvas.width / window.devicePixelRatio;
    let canvasPixelHeight = this.canvas.height / window.devicePixelRatio;

    const needResize =
      canvasPixelWidth !== width || canvasPixelHeight !== height;
    if (needResize) {
      this.renderer.setSize(width, height, false);
    }
    return needResize;
  }

  update() {
    requestAnimationFrame(() => {

//      if (this.mixer) {
//        this.mixer.update(this.clock.getDelta());
//      }
      this.model.Update(this.clock.getDelta());

      if (this.resizeCheck()) {
        this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera.updateProjectionMatrix();
      }
      
      if (!this.inDevMode) {
      // Allows first-person view control
      
      if ( this.controls.isLocked === true ) {
        //Old position of camera
        const oldPosition = new THREE.Vector3();
        oldPosition.copy(this.controls.getObject().position);

        // Camera sphere for collision detection
        const sphere = new THREE.Sphere(this.controls.getObject().position, 0.7);
//        const sphere = new Sphere(controls.getObject().position, 0.1);

//        mainRoom.objects.forEach(obj => {
//          // Iterate 3d objects in room
//          if (obj.collider) {
//            if (sphere.intersectsBox(obj.collider) && obj.name !== "floor") {
//              // If collision detected, camera position reverted to previous
//              controls.getObject().position.copy(oldPosition);
//
//              // Stop movement, stops jitter
////              velocity.x = 0;
////              velocity.z = 0;
//            }
//          }
//        });
        this.playerControls.update(this.controls);
        
        // Selecting an object
//        selectedObject = pickHelper.pick(pickPosition, scene, camera);
      }

    }

      

      this.renderer.render(this.scene, this.camera);
      this.update();
    });
  }

  blankProject() {

    this.addFog();

    let light = new THREE.DirectionalLight(this.settings.white, 1.0);
    light.position.set(20, 100, 10);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.left = 100;
    light.shadow.camera.right = -100;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = -100;
    this.scene.add(light);

    light = new THREE.AmbientLight(this.settings.offBlack);
    this.scene.add(light);

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100, 10, 10),
        new THREE.MeshStandardMaterial({
            color: this.settings.grey,
          }));
    plane.castShadow = false;
    plane.receiveShadow = true;
    plane.rotation.x = this.settings.deg90;
    this.scene.add(plane);

    const box = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.MeshStandardMaterial({
          color: this.settings.darkGrey,
      }));
    box.position.set(0, 1, 0);
    box.castShadow = true;
    box.receiveShadow = true;
    this.scene.add(box);

    for (let x = -8; x < 8; x++) {
      for (let y = -8; y < 8; y++) {
        const box = new THREE.Mesh(
          new THREE.BoxGeometry(2, 2, 2),
          new THREE.MeshStandardMaterial({
              color: this.settings.darkGrey,
          }));
        box.position.set(Math.random() + x * 5, Math.random() * 4.0 + 2.0, Math.random() + y * 5);
        box.castShadow = true;
        box.receiveShadow = true;
        this.scene.add(box);
      }
    }

  }

  addFog() {
    this.scene.fog = new THREE.Fog(this.scene.background, 60, 100);
  }

}
