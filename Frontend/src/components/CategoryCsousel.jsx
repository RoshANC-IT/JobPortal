// import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
// import { Badge } from './ui/badge'
import "./index.css"
const category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Web Developer",
  "JavaScript Developer",
  "Java Developer",
  "Python",
  "Data Science",
  "AI Development",
  "Block Chain"

]

function CategoryCarousel() {
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20"> 
        <CarouselContent>
          {
            category.map((cate, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:base-1/3">
                <Button className=" rounded-md hover:bg-[#6A38C2]">{cate}</Button>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
