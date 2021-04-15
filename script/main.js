// JavaScript Document
/*jshint esversion: 6*/

// Import Three JS
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Clock,
  Color,
  Vector3,
  Sphere,
  AxesHelper,
  GridHelper,
} from './_core/three.module.js';

import { OrbitControls } from './_core/OrbitControls.js';
import { PointerLockControls } from './_core/PointerLockControls.js';

import Shop from './shop.js';
import Lights from './lights.js';
import PlayerControls from './PlayerControls.js';
import PickHelper from './PickHelper.js';

/*----------------------------------- MAIN FUNCTION -----------------------------------*/

(function() {
// Set our main variables
let scene,
  renderer,
  camera,
//  mixer,
  mainRoom,
  roomLights,
  controls,
  playerControls = new PlayerControls(),
  selectedObject,
  clock = new Clock(),
  loaderAnim = document.getElementById('js-loader'),
  labelContainerElem = document.querySelector('#labels');
  
  const pickPosition = {x: 0, y: 0};
  const pickHelper = new PickHelper();      
  
//  const inDevMode = false;
  const inDevMode = true;
//  const seeHelpers = true;
  const seeHelpers = false;
  
  /*-------------------- Init Function --------------------*/
  function init() {

    const canvas = document.querySelector('#canvas');
    const backgroundColor = 0x606060;

    // Init the scene
    scene = new Scene();
    scene.background = new Color(backgroundColor);

    // Init the renderer
    renderer = new WebGLRenderer({ canvas, antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    // Add a camera
    camera = new PerspectiveCamera(
      75, // FOV
      window.innerWidth / window.innerHeight, // Size Ratio
      0.1,  // Near clipping
      1000  // Far clipping
    );
    camera.position.z = -5; // 30 units back
    camera.position.x = 0;
    camera.position.y = 1.5; // 3 units down
    
    const setCameraVector = new Vector3( 0, 0, 1 );
    camera.lookAt( setCameraVector );
    
    
    /*-------------------- Developing or playing --------------------*/
    if (inDevMode) {
    
      document.getElementById( 'blocker' ).style.display = 'none';
      
      controls = new OrbitControls( camera, renderer.domElement );
      controls.update();
    
    } else {
    /* First Person init */
      controls = new PointerLockControls( camera, renderer.domElement );

      // Initial instruction overlay
      const blocker = document.getElementById( 'blocker' );
      const instructions = document.getElementById( 'instructions' );

      instructions.addEventListener( 'click', function () {

        controls.lock();

      } );

      // Initial instruction overlay event listeners
      controls.addEventListener( 'lock', function () {

        instructions.style.display = 'none';
        blocker.style.display = 'none';

      } );

      controls.addEventListener( 'unlock', function () {

        blocker.style.display = 'block';
        instructions.style.display = '';

      } );
      
      scene.add( controls.getObject() );
      
      

      // Key Press event listeners
      document.addEventListener( 'keydown', evt => {
        playerControls.keys[evt.keyCode] = true;
      }, false );
      document.addEventListener( 'keyup', evt => {
        playerControls.keys[evt.keyCode] = false;
        controls.getObject().position.y = 1.5;
      }, false );
//      document.addEventListener('click', mouseClick, false);
    }
    // Add room to scene
    mainRoom = new Shop(scene, camera, seeHelpers);
    // Add lights to scene
    roomLights = new Lights(scene, seeHelpers);
    
    // add an AxesHelper
    // x = red
    // y = green
    // z = blue
    const axes = new AxesHelper();
    axes.material.depthTest = false;
    axes.renderOrder = 1;
    scene.add(axes);
//    
//    const grid = new GridHelper(20, 20);
//    grid.material.depthTest = false;
//    grid.renderOrder = 1;
//    scene.add(grid);

    loaderAnim.remove();
//    console.log(controls.getObject());
//    console.log(mainRoom);
    
//      console.log("main: "+mainRoom.mixer);
      
  }
  
  /*-------------------- Update Function --------------------*/
//let once = true;
  function update() {
    // Animate update
    requestAnimationFrame(update);
    
//    if (once) {
//      console.log(scene);
////      console.log(scene.children[16]);
//      once = false;
//      
//      for (let i = 0; i < scene.children.length; i++) {
//          console.log(scene.children[i].id);
//          console.log(scene.children[i].type);
//        }
//        
//    }
//    
//    console.log(scene.children);
//    if (mainRoom.mixer) {
      mainRoom.Update(clock.getDelta());
//    }
    
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    
    if (!inDevMode) {
      // Allows first-person view control
      
      if ( controls.isLocked === true ) {
        //Old position of camera
        const oldPosition = new Vector3();
        oldPosition.copy(controls.getObject().position);

        // Camera sphere for collision detection
        const sphere = new Sphere(controls.getObject().position, 0.7);
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
        playerControls.update(controls);
        
        // Selecting an object
//        selectedObject = pickHelper.pick(pickPosition, scene, camera);
      }

    }

    renderer.render(scene, camera);
  }
  
//  function mouseClick(evt) {
//    
//    if (selectedObject) {
//      labelContainerElem.textContent = selectedObject.name;
//    }
//  }
  
  /*-------------------- Resize Function --------------------*/
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let canvasPixelWidth = canvas.width / window.devicePixelRatio;
    let canvasPixelHeight = canvas.height / window.devicePixelRatio;

    const needResize =
      canvasPixelWidth !== width || canvasPixelHeight !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  /*-------------------- Initialize Functions --------------------*/
  init();

  update();

})();