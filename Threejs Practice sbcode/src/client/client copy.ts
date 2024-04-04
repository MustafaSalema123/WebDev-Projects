import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'


const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))
//scene.background = new THREE.Color(0xff0000)
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2

const canvas = document.getElementById("c1") as HTMLCanvasElement

const renderer = new THREE.WebGLRenderer({canvas:canvas}) //faster and best support
renderer.setSize(window.innerWidth, window.innerHeight)

//document.body.appendChild(renderer.domElement) // apend child in html page of canvas

const controll =  new OrbitControls(camera, renderer.domElement)

controll.addEventListener("change" ,render); // method render  fro controller

const geometry = new THREE.TorusKnotGeometry()
const geometry2 = new THREE.PlaneGeometry()

const material = new THREE.MeshBasicMaterial({
    color: 0xCCFFCC,
    wireframe: false,
})

const cube = new THREE.Mesh(geometry, material)
const plane = new THREE.Mesh(geometry2, material)
plane.position.y = -2;
plane.scale.x = 10;
plane.scale.y = 10;

const stats = new Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()
const cubeFolder = gui.addFolder("Cube")
const cubeRotationFolder = cubeFolder.addFolder('Rotation')
cubeRotationFolder.add(cube.rotation , "x" , 0 ,Math.PI * 2)
cubeRotationFolder.add(cube.rotation , "y" , 0 ,Math.PI * 2)
cubeRotationFolder.add(cube.rotation , "z" , 0 ,Math.PI * 2)
cubeFolder.open()
cubeRotationFolder.open()
const cubePositionFolder = cubeFolder.addFolder('Position')
cubePositionFolder.add(cube.position, 'x', -10, 10, 2)
cubePositionFolder.add(cube.position, 'y', -10, 10, 2)
cubePositionFolder.add(cube.position, 'z', -10, 10, 2)
cubeFolder.open()
cubePositionFolder.open()
const cubeScaleFolder = cubeFolder.addFolder('Scale')
cubeScaleFolder.add(cube.scale, 'x', -5, 5)
cubeScaleFolder.add(cube.scale, 'y', -5, 5)
cubeScaleFolder.add(cube.scale, 'z', -5, 5)
cubeFolder.add(cube, 'visible')

const cameraFolder = gui.addFolder("Camera") // name of folder
cameraFolder.add(camera.position, 'z', 0, 10)
cameraFolder.open()

scene.add(cube)
//scene.add(plane)

plane.rotateX(-90);
plane.rotateX(-90);

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() { 
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)

    //cube.rotation.x += 0.01
   // cube.rotation.y += 0.01
    stats.update()
    render()
}

function render() {
    renderer.render(scene, camera)
}
//render()
animate()