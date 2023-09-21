import React from 'react'
import Image from "next/image";
import { Carousel } from 'react-responsive-carousel';
import sliderImg_1 from "../../images/sliderImg_1.jpg"
import sliderImg_2 from "../../images/sliderImg_2.jpg"
import sliderImg_3 from "../../images/sliderImg_3.jpg"
import sliderImg_4 from "../../images/sliderImg_4.jpg"


const Banner = () => {
  return (
    <div className='relative'>
      <Carousel className="" autoPlay infiniteLoop showStatus={false} showIndicators={false} showThumbs={false} interval={3000} showArrows={false} >
        <div>
          <Image src={sliderImg_1}  alt="banner img" />
        </div>
        <div>
          <Image src={sliderImg_2} alt="banner img" />
        </div>
        <div>
          <Image src={sliderImg_3} alt="banner img" />
        </div>
        <div>
          <Image src={sliderImg_4} alt="banner img" />
        </div>
      </Carousel>
      <div className='w-full h-40 bg-gradient-to-t from-gray-100 to-transparent absolute bottom-0'>

      </div>
    </div>
  )
}

export default Banner