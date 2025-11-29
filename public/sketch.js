

let { Vec2D, Rect } = toxi.geom;
let { VerletPhysics2D, VerletParticle2D, VerletSprings2D } = toxi.physics2d;
let { GravityBehavior, ConstantForceBehavior, AttractionBehavior} = toxi.physics2d.behaviors;

let physics;


// ==Global variables==


// Objects
let fishes = []
let boxes =[];
let liquid;
let boundaries = []
let particle;
let fish;
let food;


// image files
let images = [];
let img;
let imges;
let files;
let filteredFiles;

// sound files
let soundEffects = []
let soundFiles;
let SOUNDS;
let sounds;
let filteredSounds;

// random variable
let randomizer;

// Sound effects
let spawnSound;

// time variable
let t = 0;

let spawnButton = {
    radius : 15,
    fill: 'green',
    stroke: [0, 0, 0, 0]
 };


// == Asynchronous setup ==
async function setup() {

     // Create the canvas. Fits to the screen size.
   createCanvas(500, 500);

  physics = new VerletPhysics2D();
  food = new Food(width/3, height/2, 15)
  physics.setWorldBounds(new Rect(0, 0, width, height))
  physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.6)))
  physics.addBehavior(new ConstantForceBehavior(new Vec2D(0,-0.6)))

  physics.setDrag(1)
  
  engine = Engine.create();

    // load the JSON object containing the image files located in the get request for /images
    img = await loadJSON("/images");
    imges = Object.values(img);

    soundFiles = await loadJSON("/Sound_Effects");
    SOUNDS = Object.values(soundFiles);

    // Store the array containing the file paths
    files = imges[0]
    sounds = SOUNDS[0]
    console.log(sounds)

    //  filter out the files that end in .png
    filteredFiles = files.filter(item => item.endsWith('.png'))
    // console.log(filteredFiles)

    filteredSounds = sounds.filter(item => item.endsWith('.wav'))
    // console.log(filteredSounds)
    liquid = new Liquid()

   spawnButton = new Button("circle", width/2, 100)
    
   // Iterate through the array of files, and make a promise for each
    for (let i=0; i < filteredFiles.length; i++){
      images[i] = await loadImage('/images/' + filteredFiles[i])
      // console.log('/images/' + filteredFiles[i])
    } 

    for (let i=0; i < filteredSounds.length; i++){
      soundEffects[i] = await loadSound('/Sound_Effects/' + filteredSounds[i])
      // console.log(`[${i}]/Sound_Effects/` + filteredSounds[i])
    } 
    
  



    // Assign sound effect values
   spawnSound = soundEffects[38];
}

function draw() {


  let n = noise(t);
    // Increment the noise value 
  t += 0.1;

  // Set the background color
  background(220);
  liquid.show();

  physics.addParticle(food);
  food.show()
  food.followMouse()
  
  // Run each instance of the fish object.
  for (let fish of fishes) {
    physics.addParticle(fish);
    fish.show();
    fish.update();
    
    // console.log(fish.x, fish.y)
    foodPosition = new Vec2D(food.x, food.y)
    fish.seek(foodPosition)
  }

  // activate spawn buttons
  spawnButton.render();
  spawnButton.check();
  spawnButton.update();

  // spawn button default state
  spawnButton.radius = 15;
  spawnButton.fill = 'green';
  spawnButton.stroke = [0, 0, 0, 0];
  spawnButton.active = true;

  // Spawn button hover state
  if (spawnButton.hover == true) {
  spawnButton.fill = "red"
  spawnButton.radius += 5
  }

  // Spawn a img when the button is pressed!
  spawnButton.onPressBegin = function() {
  // random variable
  randomizer = floor(random(images.length))
  // randomly choose an image for the object from the array.
  let fishSize = 35
  let fishWeight = 10
    fishes.push(new Fish(images[randomizer], spawnButton.x, spawnButton.y, fishWeight,fishSize ));
  spawnSound.play();
  // physics.addParticle(fish);
  
  }
  // ==text==
  // spawnButton text
  fill('black')
  text('spawn a new fish!', spawnButton.x - 40, spawnButton.y + 30)

  physics.update();

  Engine.update(engine);
  
}






