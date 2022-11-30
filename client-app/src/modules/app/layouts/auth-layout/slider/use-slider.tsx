import React from 'react';

const sliderImages = [
    '/images/app/auth-layout/slider/images/1.png',
    '/images/app/auth-layout/slider/images/2.png',
    '/images/app/auth-layout/slider/images/3.png',
    '/images/app/auth-layout/slider/images/4.png',
];

const sateliteIcons = [
    [
        '/images/app/auth-layout/slider/satelite-icons/icon-sattelite-chart.svg',
        '/images/app/auth-layout/slider/satelite-icons/icon-sattelite-mei.svg',
        '/images/app/auth-layout/slider/satelite-icons/icon-sattelite-usdt.svg',
        '/images/app/auth-layout/slider/satelite-icons/icon-sattelite-dollar.svg',
        '/images/app/auth-layout/slider/satelite-icons/icon-sattelite-busd.svg',
    ],
    [
        '/images/app/auth-layout/slider/satelite-icons/icon-sattelite-kpmg.svg',
        '/images/app/auth-layout/slider/satelite-icons/icon-sattelite-ey.svg',
        '/images/app/auth-layout/slider/satelite-icons/icon-sattelite-d.svg',
        '/images/app/auth-layout/slider/satelite-icons/icon-sattelite-w.svg',
    ],
];

const useSlider = () => {
    const [currentSliderImageIndex, setCurrentSliderImageIndex] = React.useState(0);
    const [currentSateliteIconsIndex, setCurrentSateliteIconsIndex] = React.useState(0);

    const changeToNextSliderImage = () => {
        const nextSliderImageIndex = (currentSliderImageIndex + 1) % sliderImages.length;
        setCurrentSliderImageIndex(() => nextSliderImageIndex);
    };

    const changeSliderImageIndex = (index: number) => {
        if (index < 0 || index >= sliderImages.length) {
            return;
        }

        setCurrentSliderImageIndex(() => index);
    };

    React.useEffect(() => {
        const chosenSateliteIconsIndex = currentSliderImageIndex == 3 ? 1 : 0;
        setCurrentSateliteIconsIndex(() => chosenSateliteIconsIndex);

        const interval = setTimeout(() => {
            changeToNextSliderImage();
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [currentSliderImageIndex]);

    return {
        sliderImages,
        sateliteIcons,
        currentSliderImageIndex,
        currentSateliteIconsIndex,
        changeToNextSliderImage,
        changeSliderImageIndex,
    };
};

export { useSlider };
