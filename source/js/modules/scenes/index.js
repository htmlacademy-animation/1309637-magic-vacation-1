import SeaCalfScene from './sea-calf-scene';
import CrocodileScene from './crocodile-scene';

export default () => {
  const seaCalfScene = new SeaCalfScene();
  seaCalfScene.init();

  const crocodileScene = new CrocodileScene();
  crocodileScene.init();
};
