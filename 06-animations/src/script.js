import * as THREE from 'three';
import gsap from 'gsap';

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
  width: 800,
  height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// gsap
gsap.to(mesh.position, { x: 2, duration: 1, delay: 2 });
gsap.to(mesh.position, { x: 0, duration: 1, delay: 4 });
gsap.to(mesh.position, { x: -2, duration: 1, delay: 6 });

// Clock
const clock = new THREE.Clock();

// Animation
function tick() {
  const elapsedTime = clock.getElapsedTime();
  mesh.rotation.x = Math.sin(elapsedTime);
  mesh.rotation.y = Math.sin(elapsedTime);
  mesh.rotation.z = Math.sin(elapsedTime);
  window.requestAnimationFrame(tick)
  renderer.render(scene, camera)
}

tick();