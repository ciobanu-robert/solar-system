import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { distance, radians } from "three/examples/jsm/nodes/Nodes.js";
import { Pane } from "tweakpane";

// initialize pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// add textureLoader
const textureLoader = new THREE.TextureLoader();

// adding textures
const sunTexture = textureLoader.load(
  '/textures/2k_sun.jpg'
);
const mercuryTexture = textureLoader.load(
  '/textures/2k_mercury.jpg'
);
const venusTexture = textureLoader.load(
  '/textures/venus_surface.jpg'
);
const earthTexture = textureLoader.load(
  '/textures/2k_earth_daymap.jpg'
);
const marsTexture = textureLoader.load(
  '/textures/2k_mars.jpg'
);
const moonTexture = textureLoader.load(
  '/textures/2k_moon.jpg'
);

// add materials
const mercuryMaterial = new THREE.MeshStandardMaterial(
  {
    map: mercuryTexture
  }
);
const venusMaterial = new THREE.MeshStandardMaterial(
  {
    map: venusTexture
  }
);
const earthMaterial = new THREE.MeshStandardMaterial(
  {
    map: earthTexture
  }
);
const marsMaterial = new THREE.MeshStandardMaterial(
  {
    map: marsTexture
  }
);
const moonMaterial = new THREE.MeshStandardMaterial(
  {
    map: moonTexture
  }
);

// add stuff here
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial(
  {
    map: sunTexture
  }
);

const sun = new THREE.Mesh(
  sphereGeometry,
  sunMaterial
);

sun.scale.setScalar(5);
scene.add(sun);

const planets = [
  {
    name: 'Mercury',
    radius: 0.5,
    distance: 10,
    speed: 0.01,
    material: mercuryMaterial,
    moons: [],
  },
  {
    name: 'Venus',
    radius: 0.8,
    distance: 15,
    speed: 0.005,
    material: venusMaterial,
    moons: [],
  },
  {
    name: 'Earth',
    radians: 1,
    distance: 20,
    speed: 0.005,
    material: earthMaterial,
    moons: [
      {
        name: 'Moon',
        radius: 0.3,
        distance: 3,
        speed: 0.015,
      },
    ]
  },
  {
    name: 'Mars',
    radius: 0.7,
    distance: 25,
    speed: 0.003,
    material: marsMaterial,
    moons: [
      {
        name: 'Phobos',
        radius: 0.1,
        distance: 2,
        speed: 0.02,
      },
      {
        name: 'Deimos',
        radius: 0.2,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      }
    ]
  }
]


// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  400
);
camera.position.z = 100;
camera.position.y = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// add controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 200;
controls.minDistance = 20

// add resize listener
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// initialize a clock
const clock = new THREE.Clock()

// render loop
const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};


renderloop();
