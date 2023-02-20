import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import *  as dat from 'lil-gui';

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Debug
 */

const gui = new dat.GUI()

/**
 *  Environment Textures
 */

const cubeTextureLoader = new THREE.CubeTextureLoader();

const environmentTexture = cubeTextureLoader.load([
  '/textures/environmentMaps/2/px.jpg',
  '/textures/environmentMaps/2/nx.jpg',
  '/textures/environmentMaps/2/py.jpg',
  '/textures/environmentMaps/2/ny.jpg',
  '/textures/environmentMaps/2/pz.jpg',
  '/textures/environmentMaps/2/nz.jpg',
])

// Textures
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const matcapTexture = textureLoader.load('/textures/matcaps/4.png');
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const heightTexture = textureLoader.load('/textures/door/height.jpg');
const normalTexture = textureLoader.load('/textures/door/normal.jpg');
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
const gradientsTexture = textureLoader.load('/textures/gradients/5.jpg');

// Objects

// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// material.color = new THREE.Color('pink')
// material.wireframe = true
// material.opacity = 0.5;
// material.transparent = true;
// material.alphaMap = alphaTexture;

// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture

// const material = new THREE.MeshDepthMaterial();

// const material = new THREE.MeshLambertMaterial()

// const material = new THREE.MeshPhongMaterial();

// const material = new THREE.MeshToonMaterial();

// gradientsTexture.minFilter = THREE.NearestFilter;
// gradientsTexture.maxFilter = THREE.NearestFilter;
// gradientsTexture.generateMipmaps = false;
// material.gradientMap = gradientsTexture;

const material = new THREE.MeshStandardMaterial();
// material.map = doorColorTexture
material.metalness = 0.7;
material.roughness = 0.2;
// material.aoMap = ambientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = heightTexture
// material.displacementScale = 0.1
// material.metalnessMap = metalnessTexture
// material.roughnessMap = roughnessTexture
// material.normalMap = normalTexture
// material.normalScale.set(0.5, 0.5)
// material.alphaMap = alphaTexture
// material.transparent = true

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)

// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff);

material.envMap = environmentTexture

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 64, 64),
  material
)

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1, 100, 100),
  material
)
plane.position.set(0, -0.7, 0)
plane.rotation.x = -1

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
)
torus.position.set(0, 1, 0);

sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))

scene.add(sphere, plane, torus);

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(5, 5, 5)
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Update objects
    torus.rotation.y = 0.1 * elapsedTime,
    plane.rotation.y = 0.1 * elapsedTime,

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()