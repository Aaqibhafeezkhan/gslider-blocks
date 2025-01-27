import { __ } from '@wordpress/i18n';
import {RichText, useBlockProps, BlockControls, } from '@wordpress/block-editor';
import { 
    Toolbar,
    ToolbarGroup,
    ToolbarButton
} from '@wordpress/components';
import { useState, useMemo, useEffect, useRef } from "@wordpress/element";
import Inspector from './inspector';
import { Swiper, SwiperSlide } from 'swiper/react';
import { 
    Navigation, 
    Pagination, 
    Autoplay, 
    Manipulation,
    Mousewheel,
    EffectFade,
    EffectCube,
    EffectCoverflow,
    EffectFlip,
    EffectCreative,
    EffectCards
} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-flip';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-cards';

export default function Edit({ attributes, setAttributes, clientId }) {
    const {
        blockId,
        sliderItems,
        sliderType,
        carouselPerColumn,
        carouselPerColumnGap,
        transitionSpeed,
        autoplay,
        autoplaySpeed,
        loop,
        allowTouchMove,
        pauseOnHover,
        stopOnLastSlide,
        reverseDirection,
        carouselEffect,
        sliderEffect,
        enableMouseWheel,
        displayArrows,
        displayDots,
    } = attributes;

    const blockProps = useBlockProps({
        className: `guten-slider-container ${blockId}`,
    });

    const swiperRef = useRef();
	const sliderPaginationRef = useRef();
	const sliderNavPrevRef = useRef();
	const sliderNavNextRef = useRef();
    const [swiperInstance, setSwiperInstance] = useState(null);

    const setSwiperNavigationPagination = (swiperInst) => {
        if (swiperInst?.params?.navigation && displayArrows) {
            swiperInst.params.navigation.prevEl = sliderNavPrevRef.current;
            swiperInst.params.navigation.nextEl = sliderNavNextRef.current;
    
            // Re-init navigation
            swiperInst.navigation.destroy();
            swiperInst.navigation.init();
            swiperInst.navigation.update();
        }
    
        if (swiperInst?.params?.pagination && displayDots) {
            swiperInst.params.pagination.el = sliderPaginationRef.current;
            swiperInst.params.pagination.clickable = true;
    
            // Re-init pagination
            swiperInst.pagination.init();
            swiperInst.pagination.render();
            swiperInst.pagination.update();
        }
    };

    // Get effect-specific settings
    const getEffectSettings = () => {
        const effect = sliderType === 'carousel' ? carouselEffect : sliderEffect;
        switch (effect) {
            case 'fade':
                return {
                    fadeEffect: {
                        crossFade: true
                    }
                };
            case 'coverflow':
                return {
                    coverflowEffect: {
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true
                    }
                };
            case 'flip':
                return {
                    flipEffect: {
                        slideShadows: true,
                        limitRotation: true
                    }
                };
            case 'creative':
                return {
                    creativeEffect: {
                        prev: {
                            translate: [0, 0, -400],
                        },
                        next: {
                            translate: ['100%', 0, 0],
                        },
                    }
                };
            default:
                return {
                    effect: 'slide'
                };
        }
    };

    // Enhanced settings for Swiper
    const settings = useMemo(() => ({
        // Update slidesPerView logic
        slidesPerView: sliderType === 'carousel' ? parseInt(carouselPerColumn) : 1,
        spaceBetween: sliderType === 'carousel' ? parseInt(carouselPerColumnGap) : 0,
        autoplay: autoplay ? {
            delay: autoplaySpeed || 900, // Fallback to 3 seconds
            disableOnInteraction: false,
            pauseOnMouseEnter: pauseOnHover,
            stopOnLastSlide: stopOnLastSlide,
            reverseDirection: reverseDirection,
        } : false,
        speed: transitionSpeed,
        loop: loop,
        ...(sliderType === 'carousel' ? {
            effect: carouselEffect
        } : {
            effect: sliderEffect
        }),
        ...getEffectSettings(),
        allowTouchMove: allowTouchMove,
        mousewheel: enableMouseWheel ? {
            forceToAxis: true,
            sensitivity: 1,
            releaseOnEdges: true,
        } : false,
        navigation: displayArrows ? {
            nextEl: sliderNavNextRef.current,
            prevEl: sliderNavPrevRef.current,
        } : false,
        pagination: displayDots ? {
            el: sliderPaginationRef.current,
            clickable: true,
        } : false,
        onBeforeInit(swiperInst) {
            swiperRef.current = swiperInst;
            setSwiperInstance(swiperInst);
        },
        onAfterInit(swiperInst) {
            setTimeout(() => {
                setSwiperNavigationPagination(swiperInst);
            });
        },
    }), [
        sliderType,
        carouselPerColumn,
        carouselPerColumnGap,
        autoplay,
        autoplaySpeed,
        stopOnLastSlide,
        reverseDirection,
        pauseOnHover,
        transitionSpeed,
        loop,
        allowTouchMove,
        sliderEffect,
        carouselEffect,
        enableMouseWheel,
        displayArrows,
        displayDots,
    ]);

    // Add useEffect to update Swiper when settings change
    useEffect(() => {
        if (swiperInstance) {

            // Immediately update slidesPerView when slider type changes
            swiperInstance.params.slidesPerView = sliderType === 'carousel' ? parseInt(carouselPerColumn) : 1;
            swiperInstance.params.spaceBetween = sliderType === 'carousel' ? parseInt(carouselPerColumnGap) : 0;

            swiperInstance.params.speed = transitionSpeed;
            swiperInstance.params.loop = loop;

            // Explicitly update allowTouchMove
            swiperInstance.params.allowTouchMove = allowTouchMove;
            swiperInstance.allowTouchMove = allowTouchMove;
        
            // Comprehensive autoplay management
            if (autoplay) {
                // Explicit autoplay configuration
                swiperInstance.params.autoplay = {
                    delay: autoplaySpeed || 900,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: pauseOnHover,
                    stopOnLastSlide: stopOnLastSlide,
                    reverseDirection: reverseDirection,
                };

                // Conditional autoplay start
                if (!stopOnLastSlide || swiperInstance.activeIndex < swiperInstance.slides.length - 1) {
                    swiperInstance.autoplay.start();
                }
            } else {
                swiperInstance.autoplay.stop();
            }

            // Additional check to ensure touch interaction is updated
            if (swiperInstance.touch) {
                swiperInstance.touch.enabled = allowTouchMove;
            }
    
            // If loop setting changed, need to re-initialize
            if (swiperInstance.params.loop !== loop) {
                swiperInstance.loopDestroy();
                if (loop) {
                    swiperInstance.loopCreate();
                }
            }
    
            // Reset event listeners
            swiperInstance.off('reachEnd');
            if (stopOnLastSlide && !loop && autoplay) {
                swiperInstance.on('reachEnd', () => {
                    swiperInstance.autoplay.stop();
                });
            }
            // Force update and re-render
            swiperInstance.update();
            swiperInstance.updateSlides();
            swiperInstance.updateProgress();
            swiperInstance.updateSlidesClasses();
            
            // If necessary, go to first slide
            swiperInstance.slideTo(0, 0, false);
        }
    }, [
        swiperInstance,
        sliderType,
        carouselPerColumn,
        carouselPerColumnGap,
        autoplay,
        autoplaySpeed,
        stopOnLastSlide,
        reverseDirection,
        transitionSpeed,
        loop,
        allowTouchMove,
    ]);

    // Existing hover pause effect (keep this)
    useEffect(() => {
        if (swiperInstance && autoplay && pauseOnHover) {
            const swiperEl = swiperInstance.el;
            
            const handleMouseEnter = () => {
                if (swiperInstance.autoplay.running) {
                    swiperInstance.autoplay.stop();
                }
            };

            const handleMouseLeave = () => {
                if (autoplay && !stopOnLastSlide) {
                    swiperInstance.autoplay.start();
                }
            };

            swiperEl.addEventListener('mouseenter', handleMouseEnter);
            swiperEl.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                swiperEl.removeEventListener('mouseenter', handleMouseEnter);
                swiperEl.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, [swiperInstance, autoplay, pauseOnHover, stopOnLastSlide]);

    // Add useEffect to handle mousewheel updates
    useEffect(() => {
        if (swiperInstance) {
            // Update mousewheel settings
            if (enableMouseWheel) {
                swiperInstance.mousewheel.enable();
            } else {
                swiperInstance.mousewheel.disable();
            }
            swiperInstance.update();
        }
    }, [swiperInstance, enableMouseWheel]);
    

    useEffect( () => {
		if ( swiperInstance ) {
			swiperInstance.update();
		}
	}, [ attributes ] );

    useEffect(() => {
        if (swiperInstance) {
            setSwiperNavigationPagination(swiperInstance);
        }
    }, [displayArrows, displayDots]);

    // console.log(carouselPerColumn);
    // console.log(carouselPerColumnGap);
    // console.log(transitionSpeed);
    // console.log(autoplay);
    // console.log(autoplaySpeed);
    // console.log(loop);
    // console.log(allowTouchMove);
    // console.log(pauseOnHover);
    // console.log(stopOnLastSlide);
    // console.log(reverseDirection);
    // console.log(effect);
    // console.log(enableMouseWheel);
    console.log(displayArrows);
    console.log(displayDots);




    const handleAddItem = () => {
        const newItem = {
            id: `item-${sliderItems.length + 1}`, // Fixed ID format
            title: `Slider Item ${sliderItems.length + 1}`,
            sliderItemBgColorSwitcher: 'normal',
            normalItemBackgroundType: 'classic',
            normalItemClassicColor: '#399CFF',
            normalItemGradientColor: null,
            normalItemCustomGradientSwitcher: false,
            normalItemCustomGradientInputValue: '',
            hoverItemBackgroundType: 'classic',
            hoverItemClassicColor: '',
            hoverItemGradientColor: null,
            hoverItemCustomGradientSwitcher: false,
            hoverItemCustomGradientInputValue: ''
        };
        setAttributes({ sliderItems: [...sliderItems, newItem] });
    };

    const renderSliderToolbarControls = () => {
        return (
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon="plus"
                        label={ __( 'Add New Slide', 'gutenslider-blocks' ) }
                        onClick={ () => {
                            // Add new item
                            handleAddItem();
    
                            // Ensure swiperInstance exists
                            if (swiperInstance && swiperInstance.slides) {
                                const slidesCount = swiperInstance.slides.length;
    
                                // Slide to an index beyond current slides to reset UI
                                swiperInstance.slideTo(slidesCount + 1, transitionSpeed, false);
    
                                // Reset to avoid potential UI breaks
                                setTimeout(() => {
                                    swiperInstance.slideTo(slidesCount, 0, false);
                                }, 100);
                            }
                        } }
                    />
                </ToolbarGroup>
            </BlockControls>
        );
    };

    return (
        <>
            <Inspector 
                attributes={attributes}
                setAttributes={setAttributes}
                clientId={clientId}
            />

            { renderSliderToolbarControls () }

            <div {...blockProps}>
                <Swiper
                    ref={swiperRef}
                    className='guten-slider-wrapper'
                    {...settings}
                    modules={[
                        Navigation,
                        Pagination,
                        Autoplay,
                        Manipulation,
                        Mousewheel,
                        EffectFade,
                        EffectCube,
                        EffectCoverflow,
                        EffectFlip,
                        EffectCreative,
                        EffectCards
                    ]}
                    navigation={
                        displayArrows
                            ? {
                                nextEl: sliderNavNextRef.current,
                                prevEl: sliderNavPrevRef.current,
                            }
                            : false
                    }
                    pagination={
                        displayDots
                            ? {
                                el: sliderPaginationRef.current,
                                clickable: true,
                            }
                            : false
                    }
                    onSwiper={(swiper) => {
                        setSwiperInstance(swiper);

                        // Ensure autoplay starts correctly on initialization
                        if (autoplay) {
                            swiper.autoplay.start();
                        }

                        swiper.on('slideChange', () => {
                            setAttributes({ currentSlideIndex: swiper.activeIndex });
                        });
                        
                        // Add reach end handler for stopOnLastSlide
                        swiper.on('reachEnd', () => {
                            if (stopOnLastSlide && !loop && autoplay) {
                                swiper.autoplay.stop();
                            }
                        });
                    }}
                >
                    {sliderItems.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className={`${blockId} guten-slider-content-wrapper ${item.id}`}>
                                <div className='guten-slider-content-inner-wrapper'>
                                    <div className={`guten-slider-list-item`}>
                                        <div className="guten-slider-list-content">
                                            <RichText
                                                tagName="h3"
                                                className="guten-slider-title"
                                                value={item.title}
                                                onChange={(value) =>
                                                    setAttributes({
                                                        sliderItems: sliderItems.map((sliderItem) =>
                                                            sliderItem.id === item.id
                                                                ? { ...sliderItem, title: value }
                                                                : sliderItem
                                                        ),
                                                    })
                                                }
                                                placeholder={__('Slider Title', 'gutenslider-blocks')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                { displayDots && <div className="guten-slider swiper-pagination" ref={ sliderPaginationRef }></div> }
                { displayArrows && (
                    <>
                        <div className="guten-slider swiper-button-prev" ref={ sliderNavPrevRef }></div>
                        <div className="guten-slider swiper-button-next" ref={ sliderNavNextRef }></div>
                    </>
                ) }
            </div>
        </>
    );
}
