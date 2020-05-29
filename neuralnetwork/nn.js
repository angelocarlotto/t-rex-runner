export default class NeuralNetwork {
  constructor(a, b, c, d) {

    if (a instanceof tf.Sequential) {
      this.model = a;
      this.input_nodes = b;
      this.hidden_nodes = c;
      this.output_nodes = d;
    } else {
      this.input_nodes = a;
      this.hidden_nodes = b;
      this.output_nodes = c;
      this.model = this.createModel();
    }
  }
  mutate(rate) {
    tf.tidy(() => {
      const weights = this.model.getWeights();
      const mudateWeights = [];
      for (let i = 0; i < weights.length; i++) {
        let tensor = weights[i];
        let shape = weights[i].shape;
        let values = tensor.dataSync().slice();
        for (let j = 0; j < values.length; j++) {
          if (Math.random(1) < rate) {
            let w = values[j];
            values[j] = w + randomGaussian();
          }
        }
        let newTensor = tf.tensor(values, shape);
        mudateWeights[i] = newTensor;
      }
      this.model.setWeights(mudateWeights)
    })
  }
  copy() {
    return tf.tidy(() => {
      const modelCopy = this.createModel();
      const weights = this.model.getWeights();
      const wheithsCopies = [];
      for (let i = 0; i < weights.length; i++) {
        wheithsCopies[i] = weights[i].clone();
      }
      modelCopy.setWeights(weights);
      return new NeuralNetwork(modelCopy, this.input_nodes, this.hidden_nodes, this.output_nodes);
    })
  }
  dispose() {
    this.model.dispose();
  }
  createModel() {
    //return tf.tidy(()=>{
    let model = tf.sequential();
    const hidden = tf.layers.dense({
      units: this.hidden_nodes,
      inputShape: [this.input_nodes],
      activation: 'sigmoid'
    })
    model.add(hidden)
    const output = tf.layers.dense({
      units: this.output_nodes,
      activation: 'softmax'
    })

    model.add(output)
    return model;
    //})
  }

  predict(inputs) {
    return tf.tidy(() => {
      const xs = tf.tensor2d([inputs]);
      const ys = this.model.predict(xs)
      const outputs = ys.dataSync()
      //console.log(outputs)
      return outputs;
    })


  }


}