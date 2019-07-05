function Boid(idNumber = -1,leader = false,speed = 1,size = 1,colour = 'green',x = random(0,width),y=random(0,height))
{
    this.level = 1
    this.speed = speed                  //speed of the boid
    this.size = size,                   //size of the boid
    this.leader = leader,               //Something to do with the leader...?????
    this.colour = colour,               //Colour of the Boid
    this.idNumber = idNumber            //Id Number of the boid.
    this.maxLife = 100                  //starting maxLife
    this.life = 100                     //current life of Biod
    this.moves = 0                      //how far it has moved in this cycle
    this.stamina = random(0,3)              //How much stamina the creature has
    this.experiance = 0                 //the current experiance of the Biod
    this.nextLevel = 100                //Experiance to the next level
    this.min = 0                        //Current minimum of level ups for the Biod, will increase with level
    this.mass = 1
    this.force = .1
    this.acceleration = createVector(0,0)
    this.position = createVector(x,y)
    this.velocity = createVector(0,0)
    this.max_acceleration = createVector(.1,.1)
    this.max_velocity = createVector(.1,.1)
    // this.
    


 //apply force to the boid
 //takes a force vector
 this.applyForce = function(force,r1=0,r2=0,r3=0)
 {
    f = p5.Vector.div(force,this.mass)
    this.acceleration.add(f,r1)
    this.acceleration.add(r2,r3)
    this.checkSpeed()
 }

 //changes in the object physics
 //is this where i want the boid rules to change the information? I think so
this.update = function()
{
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
    this.checkSpeed()
    this.acceleration.mult(0)
}

this.checkSpeed = function()
{
    // im sure theres a math way to do this, but ill figure that out later <3
    if(this.velocity.x > this.max_velocity.x)
    {
        this.velocity.x = this.max_velocity.x
    }
    //you have beautiful eyes
    if(this.velocity.y > this.max_velocity.y)
    {
        this.velocity.y = this.max_velocity.y
    }
    if(this.acceleration.x > this.max_acceleration.x)
    {
        this.acceleration.x = this.max_acceleration.x
    }
    if(this.acceleration.y > this.max_acceleration.y)
    {
        this.acceleration.y = this.max_acceleration.y
    }
    if(this.velocity.x < 0)
    {
        this.velocity.x = 0
    }
    //you have beautiful eyes
    if(this.velocity.y < 0)
    {
        this.velocity.y = 0 
    }
    if(this.acceleration.x < 0)
    {
        this.acceleration.x = 0
    }
    if(this.acceleration.y < 0)
    {
        this.acceleration.y = 0
    }
    // console.log("Bird Velocity: " + this.velocity)
    // console.log("Bird Acceleration: " + this.acceleration)
}
 //life is pain
 this.live = function()
 {
    this.life = this.life - 1
    this.displayHealth()    
 }
 //sometimes good things happen
this.health = function(heal)
{
    this.life = this.life + heal
    this.displayHealth()
}

//visually display the units health
this.displayHealth = function()
{
    if(this.life >= (.8 * this.maxLife))
    {
        this.colour = 'green'
        // console.log("Green")
    }
    else if((this.life < (.8 * this.maxLife)) && (this.life > (.4 * this.maxLife)))
    {
        this.colour = 'yellow'
        // console.log("Yellow")
    }
    else if(this.life <=(.4 * this.maxLife))
    {
        this.colour = 'red'
        // console.log("Red")
    }
    else
    {
        this.colour = 'blue'
        console.error("I'm blue da ba dee da ba daa")
        //should never be here
    }
}



 //checks to see if the spawn is correct. Probably dont need this.
 this.checkSpawn = function()
 {
    if(this.posX > width)//|| realX + X < 0)
    {
       this.posX = 0
    }
    else if(this.posY < 0)// || realY + Y > windowHeight)
    {
        this.posY = height
    }
    else if(this.posY > height)
    {
        this.posY = 0
    }
    else if(this.posX < 0)
    {
        this.posX = width
    }
 }

//Levels up the Boid...idk
this.levelUp = function(max)
{
    this.level ++
    if(this.level % 2 == 0)
    {
        this.min++
    }
    //things to level
    this.stamina = random(this.min,max)
}


//display the boid on the screen
this.display = function()
{
    //update health
    this.displayHealth()
    this.checkPos()
    stroke(0)
    strokeWeight(2)
    fill(this.colour)
    ellipse(this.position.x,this.position.y,this.mass* 16, this.mass * 16)
}

//check the position to see if it is off screen
this.checkPos = function()
{

    if(this.position.x > width)
    {
        this.position.x = 0
    }
    if(this.position.x < 0)
    {
        this.position.x = width
    }
    if(this.position.y > height)
    {
        this.position.y = 0
    }
    if(this.position.y < 0)
    {
        this.position.y = height
    }


}


}