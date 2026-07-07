import * as THREE from "three";


// =====================
// Scene
// =====================

const scene = new THREE.Scene();


// Camera

const camera = new THREE.PerspectiveCamera(
    45,
    1,
    0.1,
    1000
);

camera.position.z = 5;


// Renderer

const renderer = new THREE.WebGLRenderer({

    alpha:true,

    antialias:true

});


renderer.setSize(380,380);


const container = document.getElementById(
    "three-container"
);


container.appendChild(
    renderer.domElement
);



// =====================
// AI Device Body
// =====================


const bodyGeometry = new THREE.BoxGeometry(
    2,
    3,
    0.45
);


const bodyMaterial = new THREE.MeshStandardMaterial({

    color:0x0ea5e9,

    metalness:1,

    roughness:0.12,

    emissive:0x38bdf8,

    emissiveIntensity:0.35

});


const device = new THREE.Mesh(
    bodyGeometry,
    bodyMaterial
);


scene.add(device);



// =====================
// Screen
// =====================


const screenGeometry = new THREE.BoxGeometry(
    1.4,
    2,
    0.05
);


const screenMaterial = new THREE.MeshStandardMaterial({

    color:0x020617,

    emissive:0x38bdf8,

    emissiveIntensity:1

});


const screen = new THREE.Mesh(
    screenGeometry,
    screenMaterial
);


screen.position.z = 0.18;


device.add(screen);



// =====================
// AI Scan Beam
// =====================


const scanGeometry = new THREE.BoxGeometry(
    1.5,
    0.05,
    0.35
);


const scanMaterial = new THREE.MeshBasicMaterial({

    color:0x38bdf8,

    transparent:true,

    opacity:0.8

});


const scanBeam = new THREE.Mesh(
    scanGeometry,
    scanMaterial
);


device.add(scanBeam);


scanBeam.position.y = -1.5;



// =====================
// Lights
// =====================


const light = new THREE.DirectionalLight(
    0xffffff,
    3
);


light.position.set(
    3,
    3,
    5
);


scene.add(light);



const ambient = new THREE.AmbientLight(
    0xffffff,
    1
);


scene.add(ambient);

// =====================
// Background Particles
// =====================

const particleGeometry = new THREE.BufferGeometry();

const particleCount = 300;

const positions = [];


for(let i = 0; i < particleCount; i++){

    positions.push(
        (Math.random()-0.5)*10,
        (Math.random()-0.5)*10,
        (Math.random()-0.5)*10
    );

}


particleGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
        positions,
        3
    )
);


const particleMaterial = new THREE.PointsMaterial({

    color:0x38bdf8,

    size:0.03

});


const particles = new THREE.Points(
    particleGeometry,
    particleMaterial
);


scene.add(particles);



// =====================
// Animation
// =====================


function animate(){


    requestAnimationFrame(animate);


    // auto rotate

    device.rotation.y += 0.01;
    particles.rotation.y += 0.001;



    // scanning

    scanBeam.position.y += 0.02;


    if(scanBeam.position.y > 1.5){

        scanBeam.position.y = -1.5;

    }



    renderer.render(
        scene,
        camera
    );


}


animate();




// =====================
// Mouse Rotation
// =====================


let mouseDown = false;

let previousX = 0;



renderer.domElement.addEventListener(
    "mousedown",
    (event)=>{


        mouseDown = true;


        previousX = event.clientX;


    }
);



window.addEventListener(
    "mouseup",
    ()=>{


        mouseDown = false;


    }
);



window.addEventListener(
    "mousemove",
    (event)=>{


        if(mouseDown){


            let movement =
            event.clientX - previousX;



            device.rotation.y += movement * 0.01;



            previousX = event.clientX;


        }


    }
);




// =====================
// AI Scanner Button
// =====================


const button = document.getElementById(
    "demoButton"
);


const scanBox = document.getElementById(
    "scanBox"
);


const scanLine = document.querySelector(
    ".scanner-line"
);


const scanText = document.getElementById(
    "scanText"
);



button.addEventListener(
    "click",
    ()=>{


        scanBox.style.display="block";


        scanText.innerHTML =
        "AI scanning device...";



        scanLine.style.width="0%";



        setTimeout(()=>{


            scanLine.style.width="100%";


        },500);



        setTimeout(()=>{


            scanText.innerHTML =

            `
            ✅ AI Detection Complete

            <br><br>

            Device:
            HaptoLife Smart Assistant

            <br><br>

            Status:
            Emergency Support Ready

            <br><br>

            Accuracy:
            98.7%

            `;


        },3500);



    }
);