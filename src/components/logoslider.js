import React, { useState, useEffect, useRef, useCallback } from 'react';
import slider1 from "./images/slider1.jpg";
import slider2 from "./images/slider2.jpg";
// import slider3 from "./images/slider3.jpg";
// import slider5 from "./images/slider5.jpg";
import ThemeCardsContainer from './theamcardcontainer';

const Logo = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidePosition, setSlidePosition] = useState(0);
    const sliderWrapperRef = useRef(null);
     const images = [slider1, slider2,];
    const totalSlides = images.length;


    const nextSlide = useCallback(() => {
      setCurrentIndex((prevIndex) => (prevIndex === totalSlides - 1 ? 0 : prevIndex + 1));
    }, [totalSlides]);

     const prevSlide = useCallback(() => {
            setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1));
    }, [totalSlides]);


   const goToSlide = useCallback((index) => {
     setCurrentIndex(index);
      }, []);
     useEffect(() => {

     const handleAnimation = ()=>{

           const newPosition = - currentIndex * 100;
                if(sliderWrapperRef.current){
                      setSlidePosition(newPosition)
                  }
           }
         handleAnimation()

 }, [currentIndex]);

   useEffect(() => {
      const timer = setInterval(() => {
      nextSlide();
   }, 5000);

   return () => clearInterval(timer);

   }, [nextSlide]);

  return (
    <div>
   <div className="flex justify-center mt-2">
          <img
           src="https://www.ipsacademy.org/assets/images/IPSALogo.svg"
           alt="IPS logo"/>

    </div>

    <div  className="mt-4 w-full overflow-hidden relative h-[400px]  flex items-center justify-center"> {/*container*/}

   <div  ref={sliderWrapperRef}  className="flex  transition-transform duration-500 ease-in-out "   style={{ transform: `translateX(${slidePosition}%)`}}>  {/*Wrapper */}
             {images.map((image, index) => (
                 <div className="min-w-full box-border "   key={index}>  {/*slide */}

            <img src={image}  alt={`Slide ${index + 1}`}
                      className ="w-full  h-full  object-cover "/>  {/*image style here*/}
              </div>
          ))}
    </div>
  <button    onClick={prevSlide}  className="cursor-pointer absolute  top-1/2 transform -translate-y-1/2 bg-gray-800 text-white  text-lg p-2 left-1 border-none  z-20    hover:bg-gray-700 ">❮</button>
  <button   onClick={nextSlide} className ="cursor-pointer absolute  top-1/2 transform -translate-y-1/2 bg-gray-800 text-white  text-lg p-2 right-1 border-none   z-20 hover:bg-gray-700" >❯</button>

     <div  className="absolute bottom-3 w-full flex justify-center items-center space-x-2 p-2 "> {/*Controller bar */}
         {images.map((_image, index) => (
            <button key={index}
               onClick={()=>goToSlide(index)}

              className={`rounded-full border border-white bg-gray-400 h-[10px] w-[10px] cursor-pointer ${ currentIndex===index ? 'bg-white' : ''}` }/>

      ))}
    </div>

     </div>
    <ThemeCardsContainer />

  </div>
      );
  };
  export default Logo;