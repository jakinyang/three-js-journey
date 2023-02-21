import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matCapTexture1 = textureLoader.load('/textures/matcaps/1.png')
const matCapTexture2 = textureLoader.load('/textures/matcaps/2.png')
const matCapTexture3 = textureLoader.load('/textures/matcaps/3.png')
const matCapTexture4 = textureLoader.load('/textures/matcaps/4.png')
const matCapTexture5 = textureLoader.load('/textures/matcaps/5.png')
const matCapTexture6 = textureLoader.load('/textures/matcaps/6.png')
const matCapTexture7 = textureLoader.load('/textures/matcaps/7.png')
const matCapTexture8 = textureLoader.load('/textures/matcaps/8.png')

/*
* Font Loader
*/

const fontLoader = new FontLoader();
fontLoader.load(
  '/Lobster/Lobster_Regular.json',
  (font) => {
    console.log("Fonts Loaded");
    const textGeometry = new TextGeometry(
      "MOO (REVOLUTION!)",
      {
        font: font,
        size: 0.5,
        height: 0.1,
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 2,
      }
    );
    textGeometry.center()
    const material = new THREE.MeshMatcapMaterial()
    material.matcap = matCapTexture8
    material.wireframe = false
    const textMesh =  new THREE.Mesh(textGeometry, material)
    scene.add(textMesh)
  }
)

/*
* Geometry Flock
*/
const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matCapTexture8})
console.time('donut');
for (let i = 0; i < 300; i++) {
  const donut = new THREE.Mesh(donutGeometry, donutMaterial);
  donut.position.set(Math.floor((Math.random() - 0.5) * 15), Math.floor((Math.random() - 0.5) * 15), Math.floor((Math.random() - 0.5) * 15))
  donut.rotation.set(Math.floor(Math.random() * Math.PI), Math.floor(Math.random() * Math.PI), Math.floor(Math.random() * Math.PI))
  const scale = Math.random()
  donut.scale.set(scale, scale, scale)
  scene.add(donut)
}

console.timeEnd('donut')

/*
* Axes Helper
*/

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper);

/**
 * Object
 */
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial()
)

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 1
camera.position.z = 6
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()