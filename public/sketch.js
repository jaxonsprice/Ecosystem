let img;
let images = [];
let fish;
let walkers = []
let fishes;
let files;
let filteredFiles;
let randomizer;





async function setup() {

  
  fish = await loadJSON("/images");
  fishes = Object.values(fish);
  files = fishes[0]
  filteredFiles = files.filter(item => item.endsWith('.png'))
  console.log(filteredFiles)
  
// Iterate through the array of files, and make a promise for each
  for (let i=0; i < filteredFiles.length; i++){
    images[i] = await loadImage('/images/' + filteredFiles[i])
   console.log('/images/' + filteredFiles[i])
  }


  // for(let file of files) {

  //   console.log('loaded /images/' + file)
  //   console.log(indexOf(file))
  // }
 createCanvas(400, 400);
  


}

function mouseClicked() {
randomizer = floor(random(images.length))
console.log(randomizer)
  walkers.push(new Walker(images[randomizer]))
}



function draw() {
  
  background(220);
  for (let walker of walkers) {
    walker.show();
    walker.step();
  }
 
}



