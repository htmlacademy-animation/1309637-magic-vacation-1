import Animation from './animation.js';
import Scene2D from './scene-2d.js';
import Easing from './easing-utils.js';


const IMAGES_URLS = Object.freeze({
  crocodile: `../../img/module-4/lose-images/crocodile.png`,
  drop: `../../img/module-4/lose-images/drop.png`,
  flamingo: `../../../img/module-4/lose-images/flamingo.png`,
  key: `../../img/module-4/lose-images/key.png`,
  leaf: `../../img/module-4/lose-images/leaf.png`,
  snowflake: `../../img/module-4/lose-images/snowflake.png`,
  saturn: `../../img/module-4/lose-images/saturn.png`,
  watermelon: `../../img/module-4/lose-images/watermelon.png`
});


const OBJECTS = Object.freeze({
  key: {
    imageId: `key`,
    x: 50,
    y: 56,
    size: 22,
    opacity: 0,
    transforms: {}
  },
  crocodile: {
    imageId: `crocodile`,
    x: 90,
    y: 63,
    size: 85,
    opacity: 0,
    transforms: {}
  },
  flamingo: {
    imageId: `flamingo`,
    x: 50,
    y: 56,
    size: 15,
    opacity: 0,
    transforms: {}
  },
  watermelon: {
    imageId: `watermelon`,
    x: 50,
    y: 60,
    size: 15,
    opacity: 0,
    transforms: {}
  },
  snowflake: {
    imageId: `snowflake`,
    x: 50,
    y: 56,
    size: 15,
    opacity: 0,
    transforms: {}
  },
  saturn: {
    imageId: `saturn`,
    x: 50,
    y: 60,
    size: 15,
    opacity: 0,
    transforms: {}
  },
  leaf: {
    imageId: `leaf`,
    x: 50,
    y: 55,
    size: 15,
    opacity: 0,
    transforms: {}
  },
  drop: {
    imageId: `drop`,
    x: 48,
    y: 67,
    size: 4,
    opacity: 0,
    transforms: {}
  }
});

const LOCALS = Object.freeze({
  mask: {
    color: `#5f458c`,
    opacity: 0,
  }
});


export default class CrocodileScene extends Scene2D {
  constructor() {
    const canvas = document.getElementById(`crocodile-scene`);

    super({
      canvas,
      objects: OBJECTS,
      locals: LOCALS,
      imagesUrls: IMAGES_URLS,
    });

    this.initLocals();

    this.afterInit = () => {
      this.objects.crocodile.after = this.drawMask.bind(this);
    };

    this.initEventListeners();
    this.initObjects(OBJECTS);
    this.initLocals();
    this.updateSize();
  }

  init() {
    const observer = new IntersectionObserver(
        (entries) => entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.start();
          }
        }),
        {threshold: 1},
    );
    observer.observe(this.canvas);
  }

  initLocals() {
    this.locals = {
      mask: {
        color: LOCALS.mask.color,
        opacity: LOCALS.mask.opacity
      }
    };
  }

  initEventListeners() {
    window.addEventListener(`resize`, this.updateSize.bind(this));
  }

  initAnimations() {
    this.animations.push(new Animation({
      func: () => {
        this.drawScene();
      },
      duration: `infinite`,
      fps: 60
    }));

    this.initKeyAnimation();
    this.initCrocodileAnimation();
    this.initThingsAnimation();
    this.initDropAnimation();
    this.initMaskAnimation();
  }

  initKeyAnimation() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objects.key.transforms.scaleX = 0.9 + 0.1 * progress;
        this.objects.key.transforms.scaleY = 0.9 + 0.1 * progress;
        this.objects.key.transforms.translateX = progressReversed;
        this.objects.key.transforms.translateY = 2 * progressReversed;
        this.objects.key.opacity = progress;
      },
      duration: 1000,
      delay: 0,
      easing: Easing.easeInCubic
    }));
  }

  initCrocodileAnimation() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objects.crocodile.transforms.translateX = -39 * progress;
        this.objects.crocodile.transforms.rotate = 15 * progressReversed;
      },
      duration: 1200,
      delay: 1600,
      easing: Easing.easeOutCubic
    }));

    this.animations.push(new Animation({
      func: () => {
        this.objects.crocodile.opacity = 1;
      },
      duration: 0,
      delay: 1600,
    }));
  }

  initThingsAnimation() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objects.flamingo.transforms.translateX = -30 * progress;
        this.objects.flamingo.transforms.translateY = -12 * progress;
        this.objects.flamingo.transforms.scaleX = progress;
        this.objects.flamingo.transforms.scaleY = progress;
        this.objects.flamingo.transforms.rotate = 60 * progressReversed;

        this.objects.watermelon.transforms.translateX = -40 * progress;
        this.objects.watermelon.transforms.translateY = 10 * progress;
        this.objects.watermelon.transforms.scaleX = progress;
        this.objects.watermelon.transforms.scaleY = progress;
        this.objects.watermelon.transforms.rotate = 60 * progressReversed;

        this.objects.snowflake.transforms.translateX = 30 * progress;
        this.objects.snowflake.transforms.translateY = 3 * progress;
        this.objects.snowflake.transforms.scaleX = progress;
        this.objects.snowflake.transforms.scaleY = progress;
        this.objects.snowflake.transforms.rotate = -60 * progressReversed;

        this.objects.saturn.transforms.translateX = 40 * progress;
        this.objects.saturn.transforms.translateY = 20 * progress;
        this.objects.saturn.transforms.scaleX = progress;
        this.objects.saturn.transforms.scaleY = progress;
        this.objects.saturn.transforms.rotate = 60 * progressReversed;

        this.objects.leaf.transforms.translateX = 45 * progress;
        this.objects.leaf.transforms.translateY = -15 * progress;
        this.objects.leaf.transforms.scaleX = progress;
        this.objects.leaf.transforms.scaleY = progress;
        this.objects.leaf.transforms.rotate = -60 * progressReversed;
      },
      duration: 800,
      delay: 800,
      easing: Easing.easeOutCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.flamingo.transforms.translateY = -12 + 100 * progress;
        this.objects.watermelon.transforms.translateY = 10 + 100 * progress;
        this.objects.snowflake.transforms.translateY = 3 + 100 * progress;
        this.objects.saturn.transforms.translateY = 20 + 100 * progress;
        this.objects.leaf.transforms.translateY = -15 + 200 * progress;
      },
      duration: 800,
      delay: 1600,
      easing: Easing.easeInCubic
    }));

    this.animations.push(new Animation({
      func: () => {
        this.objects.flamingo.opacity = 1;
        this.objects.watermelon.opacity = 1;
        this.objects.snowflake.opacity = 1;
        this.objects.saturn.opacity = 1;
        this.objects.leaf.opacity = 1;
      },
      duration: 0,
      delay: 800,
    }));
  }

  initDropAnimation() {
    this.animations.push(new Animation({
      func: () => {
        this.objects.drop.opacity = 1;
      },
      duration: 0,
      delay: 2800,
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objects.drop.transforms.scaleX = progress;
        this.objects.drop.transforms.scaleY = progress;
        this.objects.drop.transforms.translateX = 2 * progressReversed;
      },
      duration: 600,
      delay: 2800,
      easing: Easing.easeOutCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objects.drop.transforms.translateY = 7 * progress;
        this.objects.drop.opacity = progressReversed;
      },
      duration: 600,
      delay: 3400,
      easing: Easing.easeInCubic
    }));

    this.animations.push(new Animation({
      func: () => {
        this.objects.drop.opacity = 1;
        this.objects.drop.transforms.translateY = 0;
      },
      duration: 0,
      delay: 4400,
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objects.drop.transforms.scaleX = progress;
        this.objects.drop.transforms.scaleY = progress;
        this.objects.drop.transforms.translateX = 2 * progressReversed;
      },
      duration: 600,
      delay: 4400,
      easing: Easing.easeOutCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;
        this.objects.drop.transforms.translateY = 7 * progress;
        this.objects.drop.opacity = progressReversed;
      },
      duration: 600,
      delay: 5000,
      easing: Easing.easeInCubic
    }));
  }

  initMaskAnimation() {
    this.animations.push(new Animation({
      func: () => {
        this.locals.mask.opacity = 1;
      },
      duration: 0,
      delay: 1600,
    }));
  }

  drawMask() {
    const m = this.locals.mask;

    if (m.opacity === 0) {
      return;
    }

    const s = this.size / 100;

    this.ctx.save();
    this.ctx.globalAlpha = m.opacity;
    this.ctx.fillStyle = m.color;

    this.ctx.beginPath();
    this.ctx.moveTo(50 * s, 0);
    this.ctx.lineTo(50 * s, 37.2 * s);
    this.ctx.lineTo(80 * s, 37.2 * s);
    this.ctx.lineTo(57.3 * s, 56.3 * s);
    this.ctx.lineTo(60.9 * s, 74.8 * s);
    this.ctx.lineTo(50 * s, 100 * s);
    this.ctx.lineTo(100 * s, 100 * s);
    this.ctx.lineTo(100 * s, 0);

    this.ctx.fill();
    this.ctx.restore();
  }
}
