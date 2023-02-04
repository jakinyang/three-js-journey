// Four Primary Components to Three.js
// Scene, Objects (actors), Camera, Renderer

// Scene
/* 
Like a container
- it "contains" objects, models, lights
- then we use a Three.js renderer to "render" the scene
*/
const scene = new THREE.Scene();

// Objects
/* 
Many types: primitive geo, imported models, particles, lights, etc...
Mesh = Geometry(shape) + Material(its look/texture/colour)
*/
// Geometry
const geometry = new THREE.BoxGeometry(3, 3, 3);

// Material
const material = new THREE.MeshBasicMaterial({ color: 'lightcoral' });

// Mesh
const mesh = new THREE.Mesh(geometry, material);

mesh.rotation.y = 5

scene.add(mesh)

// Camera
/* 
Not visible - serves as a POV and we can switch between them
Variety of types
Two Parameters:
1. Field of View: the Vertical vision angle in degrees (FOV)
2. Aspect Ratio: the width divided by the height
* It's easy to put these in a constant to reuse later

*/

const sizes = {
  width: 800,
  height: 600,
}

const camera = new THREE.PerspectiveCamera(75, (sizes.width / sizes.height));
camera.position.z = 5

scene.add(camera);

// Renderer

const canvas = document.querySelector('.webgl');

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);