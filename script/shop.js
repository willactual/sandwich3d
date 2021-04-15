// JavaScript Document
/*jshint esversion: 6*/

import {
  MeshPhongMaterial,
  MeshMatcapMaterial,
  MeshStandardMaterial,
  TextureLoader,
  Vector3,
  Box3,
  Box3Helper,
  AxesHelper,
  GridHelper,
  DoubleSide,
  AnimationMixer,
  AnimationClip,
  LoadingManager,
} from './_core/three.module.js';

import { GLTFLoader } from './_core/GLTFLoader.js';
//import { FBXLoader } from './_core/FBXLoader.js';
import { FBXLoader } from 'https://unpkg.com/three/examples/jsm/loaders/FBXLoader.js';

export default class Shop {

  constructor(scene, camera, seeHelpers) {
    this.seeHelpers = seeHelpers;
    this.objects = []; // Array of room objects
    this.mixer;
//    this.idle;
//    this.walk
    this.currAction;
    this.manager;
    this.animations = undefined;
    this.initialize(scene, camera);
  }

  initialize(scene, camera) {
    this.par = document.querySelector('#custConsole');
    let model = undefined;
//    this.mixer =  undefined;
    this.once = true;
    this.camera = camera;
    
//    this.animations = undefined;
//    let animationList;
    
    this.txtPathStart = 'file:///C:/Users/1383396987E/Documents/development/threejs/sandwich shop/_v3/images/';
    
    // Copy of this to use in nested funtion below
    let self = this;
    let objectsList = [];
    let loaderPath = `${this.txtPathStart}models/shop4.gltf`;
    // Load room
    let loader = new GLTFLoader();
    loader.load(
      
      loaderPath,

      function(gltf) {
        self.gltfParse(gltf, scene);

      },
      function ( xhr ) {
        
        self.addToConsole(`Room ${( xhr.loaded / xhr.total * 100 ).toFixed(2)}% loaded`);

      },
      function(error) {
        console.error(error);
      }
    );   
    
    
//    loaderPath = `${this.txtPathStart}models/xbot.fbx`;
//    
//    loader = new FBXLoader();
//    
//    loader.load(
//      
//      loaderPath,
//
//      function(object) {
//        
////        mixer = new THREE.AnimationMixer( object );
////
////        const action = mixer.clipAction( object.animations[ 0 ] );
////        action.play();
//
//        object.traverse(obj => {
//          if (obj.isMesh) {
//            obj.castShadow = true;
//            obj.receiveShadow = true;
////            console.log(obj.scale);
//            obj.scale.multiplyScalar(0.1);
////            console.log(obj.scale);
//          }
//        });
//        
//        object.scale.multiplyScalar(0.01);
////        let rad = 180 * (Math.PI/180);
//        object.rotation.y = 3.14;
//        object.position.x = 0;  // 2.4=on the street in front of door, 5=off screen
////        object.position.x = 1;
//        object.position.z = -3;  // 6.3=on the street
////        console.log("obj pos: "+[object.position.y]);
//        
//        
////          const anim = new FBXLoader();
////          anim.load(`file:///C:/Users/1383396987E/Documents/development/threejs/sandwich shop/_v2/images/models/animations/Walking.fbx`, (anim) => {
////            that.mixer = new AnimationMixer(anim);
//////            console.log(anim.animations);
////            let walkAnim = AnimationClip.findByName(anim.animations, 'mixamo.com');
////            that.walk = that.mixer.clipAction(walkAnim);
//////            that.idle.play();
////          });
////        console.log(object.animations);
//        
////        that.manager = new LoadingManager();
////        that.manager.onLoad = () => {
////          that.currAction = 'idle';
////        };
////
////        const OnLoad = (animName, anim, m, aList) => {
//////          console.log(anim.animations);
////          const clip = AnimationClip.findByName(anim.animations, 'mixamo.com');
////          const action = m.clipAction(clip);
////
////          aList[animName] = {
////            clip: clip,
////            action: action,
////          };
////        };
////
////        const loader = new FBXLoader(that.manager);
////        loader.setPath('file:///C:/Users/1383396987E/Documents/development/threejs/sandwich shop/_v2/images/models/animations/');
////        loader.load('Walking.fbx', (a) => { OnLoad('walk', a, this.mixer, that.animations); });
////        loader.load('Idle.fbx', (a) => { OnLoad('idle', a, this.mixer, that.animations); });
//        
//        // Add model to scene
//        scene.add(object);
//        
//        
//        that.mixer = new AnimationMixer(object);
////        console.log(object.animations);
//        let idleAnim = AnimationClip.findByName(object.animations, 'mixamo.com');
//        that.idle = that.mixer.clipAction(idleAnim);
//        that.idle.play();
//        
//        
//
//      },
//      function ( xhr ) {
////        this.par = document.querySelector('#custConsole');
////        let node = document.createElement('p');
////        node.textContent = `${( xhr.loaded / xhr.total * 100 )} % loaded`;
////        par.appendChild(node);
////        par.scrollTop = par.scrollHeight;
//        
//        that.addToConsole(`FBX ${( xhr.loaded / xhr.total * 100 ).toFixed(2)}% loaded`);
//
////        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
//
//      },
//      function(error) {
//        console.error(error);
//      }
//    );
    
  }
  
  playAni(name) {
    /* ["frigdoor.1Action",
        "frigdoor.2Action",
        "frigdoor.3Action",
        "frigdoor.4Action",
        "frigdoor.5Action",
        "frigdoor.6Action",
        "oven.doorAction",
        "glass.oven.doorAction",
        "bread.cut.topAction"]
    */
    this.animations.forEach(( clip ) => {
      if (clip.name === name) {
        this.mixer.clipAction(clip).play();
      }
    });
    
  }
  
  gltfParse(gltf, scene) {
    let model = gltf.scene;
        this.animations = gltf.animations;
        model.traverse(obj => {
          if (obj.isMesh) {
            /* Use different texture depending on object */
            this.setTextures(obj);
            
            // Helper to see collision detection box
            if (this.seeHelpers && obj.name.slice(0,4) !== "Lens") {
//              const helper = new Box3Helper( obj.collider, 0xffff00 );
//              scene.add( helper );
            }
          }
        });
        
        this.mixer = new AnimationMixer( model );
    
        scene.add(model);
  }
  
  addToConsole(txt) {
    this.par = document.querySelector('#custConsole');
    let node = document.createElement('p');
    node.textContent = txt;
    this.par.appendChild(node);
    this.par.scrollTop = this.par.scrollHeight;
  }
  
  setTextures(obj) {
    
    let txtPathMid = 'COL/';
    let obj_txt;
    
    if (obj.name.slice(0,5) === "glass") {
      this.transparentMesh(obj, 0.5);
      if (obj.name === 'glass') {
        obj.material.side = DoubleSide;
      }
    } else {
      if (obj.name.slice(0,6) === "season") {
        obj_txt = new TextureLoader().load(`${this.txtPathStart}${txtPathMid}seasoning.png`);
        obj_txt.flipY = false;
        this.transparentSkinMesh(obj, obj_txt);
      } else if (obj.name.slice(0,4) === "frig") {
        obj_txt = new TextureLoader().load(`${this.txtPathStart}${txtPathMid}frig.png`);
        obj_txt.flipY = false;
        this.texturedMesh(obj, obj_txt);
      } else if (obj.name.slice(0,4) === "cont") {
        obj_txt = new TextureLoader().load(`${this.txtPathStart}${txtPathMid}container.png`);
        obj_txt.flipY = false;
        this.texturedMesh(obj, obj_txt);
      } else if (obj.name === "sign" || obj.name === 'bulbs') {
        obj_txt = new TextureLoader().load(`${this.txtPathStart}${txtPathMid}${obj.name}.png`);
        obj_txt.flipY = false;
        this.spotlightMesh(obj, obj_txt);
      } else {
          obj_txt = new TextureLoader().load(`${this.txtPathStart}${txtPathMid}${obj.name}.png`);
        obj_txt.flipY = false;
        this.texturedMesh(obj, obj_txt);
      }
//      obj_txt.flipY = false;
//      this.texturedMesh(obj, obj_txt);
    }
    
    this.addToConsole(`Object ${obj.name} loaded`);
  }
  
  defaultMesh(obj) {
    // Meshed objects in room
    obj.castShadow = true;
    obj.receiveShadow = true;

    // Add box to object for collision detection
//    obj.collider = new Box3();
//    obj.collider.setFromObject(obj);
    
    let obj_mtl = new MeshStandardMaterial({
      color: 0xA6A6A6,
      skinning: true
      
    });
    
    obj.material = obj_mtl;
    
  }
  
  transparentMesh(obj, op) {
    let obj_mtl = new MeshPhongMaterial({
      color: 0xF6FEFF,
      opacity: op,
      transparent: true,
      skinning: true
      
    });
    
    obj.material = obj_mtl;
  }
  
  transparentSkinMesh(obj, obj_txt) {
    let obj_mtl = new MeshPhongMaterial({
      map: obj_txt,
      color: 0xffffff,
      opacity: 2.0,
      transparent: true,
      skinning: true
      
    });
    
    obj.material = obj_mtl;
  }
  
  texturedMesh(obj, obj_txt) {
    // Meshed objects in room
    obj.castShadow = true;
    obj.receiveShadow = true;

    // Add box to object for collision detection
//    obj.collider = new Box3();
//    obj.collider.setFromObject(obj);
    
    let obj_mtl = new MeshStandardMaterial({
      map: obj_txt,
      color: 0xffffff,
      skinning: true
    });
    
    obj.material = obj_mtl;
    
  }
  
  spotlightMesh(obj, obj_txt) {
    // Meshed objects in room
    
    let obj_mtl = new MeshMatcapMaterial({
      map: obj_txt,
      color: 0xffffff,
      skinning: true
    });
    
    obj.material = obj_mtl;
    
  }
  
  Update(time) {
    if (this.mixer) {
      
      this.mixer.update(time);
      if (this.once) {
//        console.log(this.mixer);
//        console.log(this.animations);
        this.playAni("frigdoor.1Action");
        this.once = false;
      }
    }
  }
  
}