const tf = require('@tensorflow/tfjs-node');

async function loadModel() {
  try {
    const model = await tf.loadLayersModel('file://./model/model.json');
    return model;
  } catch (error) {
    console.error('Error loading the model:', error);
    return null;
  }
}

module.exports = { loadModel };
