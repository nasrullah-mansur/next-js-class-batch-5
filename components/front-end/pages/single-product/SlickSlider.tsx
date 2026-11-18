'use client';

import { ProductImageType } from '@/types/product_image';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export default function SlickSlider({ productImages }: { productImages: ProductImageType[] }): React.JSX.Element {
    const [nav1, setNav1] = useState<Slider | null>(null);
    const [nav2, setNav2] = useState<Slider | null>(null);

    const sliderRef1 = useRef<Slider | null>(null);
    const sliderRef2 = useRef<Slider | null>(null);

    useEffect(() => {
        if (sliderRef1.current) setNav1(sliderRef1.current);
        if (sliderRef2.current) setNav2(sliderRef2.current);
    }, []);

    // Main Slider Settings (removed `ref`)
    const mainSettings: React.ComponentProps<typeof Slider> = {
        asNavFor: nav2 ?? undefined,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        fade: true,
    };

    // Thumbnail Slider Settings (removed `ref`)
    const thumbSettings: React.ComponentProps<typeof Slider> = {
        asNavFor: nav1 ?? undefined,
        slidesToShow: 4,
        swipeToSlide: true,
        focusOnSelect: true,
        arrows: false,
        centerMode: false,
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            {/* Main Image Carousel - ref passed here */}
            <div className="main-slider" style={{ marginBottom: '15px' }}>
                <Slider ref={sliderRef1} {...mainSettings}>
                    {productImages.map((img) => (
                        <div key={img.id}>
                            <Image
                                src={img.src}
                                alt={img.alt}
                                width={640}
                                height={800}
                            // sizes="(max-width: 600px) 100vw, 600px"
                            // style={{ objectFit: 'cover', borderRadius: '8px' }}
                            />
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Thumbnail Carousel - ref passed here */}
            <div className="thumb-slider">
                <Slider ref={sliderRef2} {...thumbSettings}>
                    {productImages.map((img) => (
                        <div key={img.id} style={{ padding: '0 5px' }}>
                            <Image
                                src={img.src}
                                alt={img.alt}
                                width={100}
                                height={180}
                                className="w-full cursor-pointer px-2"
                            // style={{
                            //     width: '100%',
                            //     height: 'auto',
                            //     cursor: 'pointer',
                            //     borderRadius: '4px',
                            // }}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}


// Custom Previous Arrow Component
function PrevArrow(props: { onClick?: React.MouseEventHandler }) {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                zIndex: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
            }}
            aria-label="Previous Slide"
        >
            ‹
        </button>
    );
}

// Custom Next Arrow Component
function NextArrow(props: { onClick?: React.MouseEventHandler }) {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                transform: 'translateY(-50%)',
                zIndex: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
            }}
            aria-label="Next Slide"
        >
            ›
        </button>
    );
}