const tf = require('@tensorflow/tfjs-node');
const { loadModel } = require('./modelLoader.js');

async function predictDiscount(occupancy, revenue, model) {
  const input = tf.tensor2d([[occupancy, revenue]]);
  const discountPercentagePrediction = model.predict(input).dataSync()[0];
  return discountPercentagePrediction;
}

async function predict() {
  const discountModel = await loadModel();

  if (discountModel) {
    discountModel.compile({
      optimizer: 'adam',
      loss: 'meanSquaredError',
      metrics: ['accuracy'],
    });

    const maxOccupancy = 1.0;
    const revenue = 1.0;

    const minDiscount = await predictDiscount(maxOccupancy, revenue, discountModel);
    console.log("Discount that maximizes the revenue:", minDiscount);
    return minDiscount;
  }
}

module.exports = { predict };
