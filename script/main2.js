// JavaScript Document
/*jshint esversion: 6*/

// Import Three JS
import WorldScene from './WorldScene.js';

/*----------------------------------- MAIN FUNCTION -----------------------------------*/

(function() {
  // Set our main variables
  let world,
//  newProject = true,
  newProject = false,

   inDevMode = false,
//  inDevMode = true,

//   seeHelpers = true;
  seeHelpers = false;

  /*-------------------- Init Function --------------------*/
  function init() {
    let initLoad = {
      inDevMode,
      seeHelpers,
      newProject,
    };
    
    world = new WorldScene(initLoad);

    document.getElementById('js-loader').remove();
  }

  /*-------------------- Initialize Functions --------------------*/
  init();

})();
