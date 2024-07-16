import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// initialize the scene
const scene = new THREE.Scene();

// add textureLoader
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath('/textures/cubeMap/');

// adding textures
const sunTexture = textureLoader.load(
  '/textures/2k_sun.jpg'
);
const mercuryTexture = textureLoader.load(
  '/textures/2k_mercury.jpg'
);
const venusTexture = textureLoader.load(
  '/textures/2k_venus_surface.jpg'
);
const earthTexture = textureLoader.load(
  '/textures/2k_earth_daymap.jpg'
);
const marsTexture = textureLoader.load(
  '/textures/2k_mars.jpg'
);
const jupiterTexture = textureLoader.load(
  '/textures/2k_jupiter.jpg'
);
const saturnTexture = textureLoader.load(
  '/textures/2k_saturn.jpg'
);
const saturnRingTexture = textureLoader.load(
  '/textures/2k_saturn_ring_alpha.png'
)
const moonTexture = textureLoader.load(
  '/textures/2k_moon.jpg'
);

const backgroundCubemap = cubeTextureLoader.load( 
  [
    'px.png',
    'nx.png',
    'py.png',
    'ny.png',
    'pz.png',
    'nz.png'
  ] 
);

scene.background = backgroundCubemap;

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
const jupiterMaterial = new THREE.MeshStandardMaterial(
  {
    map: jupiterTexture
  }
);
const saturnMaterial = new THREE.MeshStandardMaterial(
  {
    map: saturnTexture
  }
);
const saturnRingMaterial = new THREE.MeshStandardMaterial(
  {
    map: saturnRingTexture,
    side: THREE.DoubleSide,
    transparent: true,
  }
);
const moonMaterial = new THREE.MeshStandardMaterial(
  {
    map: moonTexture
  }
);

// add stuff here
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const ringGeometry = new THREE.RingGeometry(1.5, 6, 64)
var pos = ringGeometry.attributes.position;
var v3 = new THREE.Vector3();
for (let i = 0; i < pos.count; i++){
  v3.fromBufferAttribute(pos, i);
  ringGeometry.attributes.uv.setXY(i, v3.length() < 4 ? 0 : 1, 1);
};
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
    speed: 0.007,
    material: venusMaterial,
    moons: [],
  },
  {
    name: 'Earth',
    radius: 1,
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
      }
    ]
  },
  {
    name: 'Jupiter',
    radius: 2,
    distance: 40,
    speed: 0.002,
    material: jupiterMaterial,
    moons: [
      {
        name: 'Europa',
        radius: 0.3,
        distance: 2,
        speed: 0.02,
      },
      {
        name: 'Io',
        radius: 0.25,
        distance: 3,
        speed: 0.015,
      },
      {
        name: 'Granymede',
        radius: 0.2,
        distance: 4,
        speed: 0.01,
      },
      {
        name: 'Calisto',
        radius: 0.1,
        distance: 4.5,
        speed: 0.005,
      },
      {
        name: 'Kallichore',
        radius: 0.05,
        distance: 5,
        speed: 0.003,
      },
    ],
  },
  {
    name: 'Saturn',
    radius: 1.8,
    distance: 60,
    speed: 0.001,
    material: saturnMaterial,
    moons: [
      // {
      //   name: 'Europa',
      //   radius: 0.3,
      //   distance: 2,
      //   speed: 0.02,
      // },
      // {
      //   name: 'Io',
      //   radius: 0.25,
      //   distance: 3,
      //   speed: 0.015,
      // },
      // {
      //   name: 'Granymede',
      //   radius: 0.2,
      //   distance: 4,
      //   speed: 0.01,
      // },
      // {
      //   name: 'Calisto',
      //   radius: 0.1,
      //   distance: 4.5,
      //   speed: 0.005,
      // },
      // {
      //   name: 'Kallichore',
      //   radius: 0.05,
      //   distance: 5,
      //   speed: 0.003,
      // },
    ],
  },
];

const createPlanet = (planet) => {
  const planetMesh = new THREE.Mesh(
    sphereGeometry,
    planet.material
  );
  planetMesh.scale.setScalar(planet.radius);
  planetMesh.position.x = planet.distance;
  return planetMesh;
};

const createMoon = (moon) => {
  const moonMesh = new THREE.Mesh(
    sphereGeometry,
    moonMaterial
  );
  moonMesh.scale.setScalar(moon.radius);
  moonMesh.position.x = moon.distance;
  return moonMesh;
}

const planetMeshes = planets.map((planet, index) => {

  const planetMesh = createPlanet(planet);
  scene.add(planetMesh);

  if (index === 5) {
    const rings = new THREE.Mesh(
      ringGeometry,
      saturnRingMaterial,
    );

    rings.rotateX(1.6);
    planetMesh.add(rings);
  }
  console.log(index)

  // loop through earch moon create the moon
  planet.moons.forEach((moon) => {
    const moonMesh = createMoon(moon)
    planetMesh.add(moonMesh);
  })

  return planetMesh;
})

// add lights
const ambientLight = new THREE.AmbientLight(
  0xffffff,
  0.5
);
scene.add(ambientLight)

const pointLight = new THREE.PointLight(
  0xffffff,
  2
);
scene.add(pointLight);

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
  planetMeshes.forEach((planet, planetIndex) => {
    planet.rotation.y += planets[planetIndex].speed;
    planet.position.x = Math.sin(planet.rotation.y) * planets[planetIndex].distance;
    planet.position.z = Math.cos(planet.rotation.y) * planets[planetIndex].distance;

    planet.children.forEach((moon, moonIndex) => {
      if (planetIndex != 5) {
        moon.rotation.y += planets[planetIndex].moons[moonIndex].speed;
        moon.position.x = Math.sin(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance;
        moon.position.z = Math.cos(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance;
      }
    });
  })

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};


renderloop();
