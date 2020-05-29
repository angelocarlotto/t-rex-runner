import Runner from './Runner.js';
import Trex from './Trex.js';
import  { checkForCollision,noop, getRandomNum } from './Utils.js';

export default class TrexGroup {
  onReset = noop;
  onRunning = noop;
  onCrash = noop;

  constructor(count, canvas, spriteDef) {
    this.tRexes = [];
    this.savedtRexes=[];
    this.TOTAL=count;
    this.canvas=canvas;
    this.spritDef=spriteDef;
    for (let i = 0; i < count; i += 1) {
      const tRex = new Trex(canvas, spriteDef);
      //tRex.id = i;
      this.tRexes.push(tRex);
    }

    //nextGeneration(canvas, spriteDef);
  }
   nextGeneration() {
    console.log('next generation');
    this.calculateFitness();
   // console.log(this.savedtRexes.length)
    for (let i = 0; i < this.TOTAL; i++) {
      let pickedOne=this.pickOneBrain();
      //console.log(pickedOne.id,pickedOne.fitness,pickedOne.score)
      this.tRexes[i].brain=pickedOne.brain.copy()
      this.tRexes[i].brain.mutate();

    }
    
    this.savedtRexes = [];
  }
  
   pickOneBrain() {
    let index = 0;
    let r = Math.random(1);
    while (r > 0) {
      r = r - this.savedtRexes[index].fitness;
      index++;
    }
    index--;
    let tRex = this.savedtRexes[index];
    //let child = new Trex(this.canvas, this.spriteDef,tRex.brain);
  
   // tRex.mutate();
    return tRex;
  }
  
   calculateFitness() {
    let sum = 0;
    for (let tRex of this.savedtRexes) {
      sum += tRex.score;
    }
    console.log("sum",sum)
    for (let tRex of this.savedtRexes) {
      tRex.fitness = tRex.score / sum;
    }
  }

  update(deltaTime, status) {
    this.tRexes.forEach((tRex) => {
      if (!tRex.crashed) {
        tRex.update(deltaTime, status);
        tRex.score=Number(Runner.instance_.distanceMeter.digits.join(""));
      }
    });
  }

  draw(x, y) {
    this.tRexes.forEach((tRex) => {
      if (!tRex.crashed) {
        tRex.draw(x, y);
      }
    });
  }

  updateJump(deltaTime, speed) {
    this.tRexes.forEach((tRex) => {
      if (tRex.jumping) {
        tRex.updateJump(deltaTime, speed);
      }
    });
  }

  reset() {
    console.log("reset")
    this.tRexes.forEach((tRex) => {
      tRex.reset();
      this.onReset({ tRex });
    });
  }

  lives() {
    return this.tRexes.filter(( tRex) => !tRex.crashed ).length;
  }

  checkForCollision(obstacle) {
    let crashes = 0;
    
    this.tRexes.forEach(async (tRex) => {
      
     // console.log(tRex.score)
      if (!tRex.crashed) {
        const result = checkForCollision(obstacle, tRex);
        if (result) {
          crashes += 1;
          tRex.crashed = true;

          if(this.savedtRexes.findIndex(e=>tRex.id===e.id)<0){
            //console.log(tRex.id,tRex.score)
            let tRexCopy=JSON.parse(JSON.stringify( tRex));
            tRexCopy.brain=tRex.brain.copy();
            this.savedtRexes.push(tRexCopy);
          }
        
        } else {
          tRex.think(obstacle,Runner.instance_.currentSpeed);
        }
      } else {
        crashes += 1;
      }
    });
    return crashes === this.tRexes.length;
  }
}

