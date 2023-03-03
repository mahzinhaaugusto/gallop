import { Carousel } from "react-responsive-carousel";
// import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import image1 from "../Assets/Images/helena-lopes-lIeqGEdvex0-unsplash.jpg";
import image2 from "../Assets/Images/luisa-peter-Olt577JtPM0-unsplash.jpg";
import image3 from "../Assets/Images/mikayla-storms-9h_bJdGqzCk-unsplash.jpg";
import image4 from "../Assets/Images/pieter-van-noorden-cjSUZMA2iW8-unsplash.jpg";


export function CarouselMain() {
    return (

        <p>Testing</p>
        // <Carousel showThumbs={false} autoplay showIndicators={true} showArrows={true} axis={"horizontal"} dynamicHeight={false} >
        //     <div className="carouselMain">
        //         <div className="carouselMain_cont_image1">
        //             <img src={image1} alt="" />
        //             <p className="legend">Image 1</p>
        //         </div>
        //         <div className="carouselMain_cont_image2">
        //             <img src={image2} alt="" />
        //             <p className="legend">Image 2</p>
        //         </div>
        //         <div className="carouselMain_cont_image3">
        //             <img src={image3} alt="" />
        //             <p className="legend">Image 3</p>
        //         </div>
        //         <div className="carouselMain_cont_image4">
        //             <img src={image4} alt="" />
        //             <p className="legend">Image 4</p>
        //         </div>
        //     </div>
        // </Carousel>

        // <CarouselProvider
        //     naturalSlideWidth={100}
        //     naturalSlideHeight={120}
        //     totalSlides={3}
        // >
        //     <Slider className='carouselMain'>
        //         <Slide index={0}>I am the first Slide.
        //             <img src={image1} alt="" />
        //         </Slide>
        //         <Slide index={1}>I am the second Slide.
        //             <img src={image2} alt="" />
        //         </Slide>
        //         <Slide index={2}>I am the third Slide.
        //             <img src={image3} alt="" />
        //         </Slide>
        //     </Slider>
        //     <ButtonBack>Back</ButtonBack>
        //     <ButtonNext>Next</ButtonNext>
        // </CarouselProvider >

    )
}

// onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}