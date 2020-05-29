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
          });
          tf.setBackend('cpu')
          window['Runner'] = Runner;
    }
function handleReset(Dinos) {
     if (firstTime) {
      firstTime = false;
    }
    else {
      Runner.instance_.tRexGroup.nextGeneration()
    }
    
  }

  document.addEventListener('DOMContentLoaded', onDocumentLoad);
    
})();
