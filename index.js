// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// extract from chromium source code by @liuwayong

import Runner from './Classes/Runner.js'
(function () {
    'use strict';

    function onDocumentLoad() {
        new Runner('.interstitial-wrapper');
    }

    window['Runner'] = Runner;
    
    document.addEventListener('DOMContentLoaded', onDocumentLoad);
    
    
})();
