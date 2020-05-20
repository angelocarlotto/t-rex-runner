// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// extract from chromium source code by @liuwayong

import Runner from './Classes/Runner.js'
const rankList = [];
let firstTime = true;
import {getRandomNum} from './Classes/Utils.js'
(function () {
    'use strict';

    function onDocumentLoad() {
        new Runner('.interstitial-wrapper', {
            DINO_COUNT:1000,
            onReset: handleReset,
            onCrash: handleCrash,
            onRunning: handleRunning
          });

          window['Runner'] = Runner;
    }

    
    
    

function handleReset(Dinos) {
     if (firstTime) {
      firstTime = false;
      // console.info("in here")
      // console.info(Dinos)
      Dinos.forEach((dino) => {
        // console.info("happened");
       // dino.model = new RandomModel();
        //dino.model.init();
      });
  
    }
    else {
      // Train the model before restarting.
      //console.info('Training');
      const chromosomes = rankList;//.map((dino) => dino.model.getChromosome());
      // console.info(chromosomes)
      // Clear rankList
      rankList.splice(0);
      //geneticModel.fit(chromosomes);
      Dinos.forEach((dino, i) => {
        //dino.model.setChromosome(chromosomes[i]);
      });
    }
    
  }
  
  function handleRunning(dino, state) {
   let action = 0;
    if (!dino.jumping) {
      action = getRandomNum(-1,1);//dino.model.predictSingle(convertStateToVector(state));
    }
    return action;
  }
  
  function handleCrash(dino) {
    // console.info("i was called")
     if (!rankList.includes(dino)) {
      rankList.unshift(dino);
    }
    
  }
  document.addEventListener('DOMContentLoaded', onDocumentLoad);
    
})();
