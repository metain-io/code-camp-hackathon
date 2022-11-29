import React from 'react';
import styles from './styles.module.scss';
import { useSlider } from './use-slider';

const Slider = () => {
    const { sliderImages, sateliteIcons, currentSliderImageIndex, currentSateliteIconsIndex, changeSliderImageIndex } =
        useSlider();

    return (
        <div id={styles.banner_container}>
            <div id={styles.logo_wrapper}>
                <img className={styles.image_1} src="/images/app/logo/horizontal-blue.png" />
            </div>

            <div
                key={`Sattelite-Wrapper-${currentSateliteIconsIndex}`}
                id={styles.animation_wrapper}
                data-index={currentSateliteIconsIndex}
            >
                <div className={styles.div_2}>
                    <img src={`${sliderImages[currentSliderImageIndex]}`} className={styles.image_3} />
                    <div className={styles.div_1}>
                        {sateliteIcons[currentSateliteIconsIndex].map((name, index) => (
                            <div
                                key={`Sattelite-${currentSateliteIconsIndex}-${name}-${index}`}
                                className={styles.item_1}
                            >
                                <img src={`${name}`} className={styles.image_2} />
                            </div>
                        ))}
                        <img src="/images/app/auth-layout/slider/background.svg" className={styles.image_1} />
                    </div>
                </div>

                <div id={styles.pagination_wrapper}>
                    {sliderImages.map((value, index) => {
                        return (
                            <div
                                key={index}
                                className={[styles.item_2, currentSliderImageIndex === index ? styles.active : ''].join(
                                    ' ',
                                )}
                                onClick={() => changeSliderImageIndex(index)}
                            ></div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export { Slider };
