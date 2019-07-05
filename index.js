//P5js environment
//setup the canvas
function setup()
{
    createCanvas(800,900)
    // frameRate(30)
    // background('red')


    BOIDS = createBoids(20)


}

//draw the boids
function draw()
{
    // moveBoids(BOIDS)
    background('black')
    velocityMovement(BOIDS)
    // background('black')
    // drawBoids(BOIDS)
    // console.log(BOIDS.length)
}

//creates and fills an array with boid objects
function createBoids(numberOfBoids)
{
    BoidArray = []
    for(i = 0; i < numberOfBoids;i++)
    {
        newBoid = new Boid(i)
        BoidArray.push(newBoid)
    }

    return BoidArray
}

//draw the boids on the canvas
function drawBoids(arrayOfBoids)
{
    for(i=0;i<arrayOfBoids.length;i++)
    {
        fill(arrayOfBoids[i].colour)
        // checkPos(arrayOfBoids[i].posX,arrayOfBoids[i].posY)
        arrayOfBoids[i].checkSpawn()
        circle(arrayOfBoids[i].posX,arrayOfBoids[i].posY,20)
    }
}

//generates a random number
function randomMovement(biodSpeed = .01)
{
    maxMovement = biodSpeed //* 2
    minMovement = biodSpeed * -1// 3
    return random(minMovement,maxMovement) 
}

//make the boid move with velocity
function velocityMovement(arrayOfBoids)
{

    for( let i = 0; i < arrayOfBoids.length;i++)
    {
        r1 = rule1(arrayOfBoids)
        r2 = rule2(arrayOfBoids[i],arrayOfBoids)
        r3 = rule3(arrayOfBoids[i],arrayOfBoids)
        // console.log(C)
        if(arrayOfBoids[i].moves >= (50 + arrayOfBoids[i].stamina))
        {
            arrayOfBoids[i].live()
            arrayOfBoids[i].moves = 0
        }
        arrayOfBoids[i].applyForce(createVector(randomMovement(),randomMovement()),r1,r2,r3) //????
        arrayOfBoids[i].update()
        arrayOfBoids[i].display()
    }
}

//get the centter of mass
function rule1(arrayOfBoids)
{
    c = createVector(0,0)

    for(i =0; i < arrayOfBoids.length;i++)
    {
        c.add(arrayOfBoids[i].position)
    }

}


//check the distance between each boid
function rule2(boid,boidArray)
{
    c = createVector(0,0)

    for(i = 0; i<boidArray.length;i++)
    {
        if(boid.idNumber != boidArray[i].idNumber)
        {
            if(abs(boid.position.dist(boidArray[i].position)) < 100)
            {
                c = p5.Vector.sub(c,(p5.Vector.sub(boid.position,boidArray[i].position))) 
            }
        }
    }
    return c
}

function rule3(boid,boidArray)
{
    c = createVector(0,0)

    for(i = 0; i < boidArray.length;i++)
    {
        if(boid.idNumber != boidArray[i].idNumber)
        {
            c = c.add(boidArray[i].velocity)

        }

    }

    c = c.div(boidArray.length-1)
    c = c.sub(boid.velocity)
    c = c.div(8) //why 8?
    return c
}