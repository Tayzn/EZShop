import React, { useState, useEffect } from "react";
import { Container, Image } from "react-bootstrap";

export const ImageBanner = (): JSX.Element => {
    const imgList = [
        "https://i.ibb.co/BKgX1tt/bannergrad.png",
        "https://i.ibb.co/rZnWCXV/Untitled-1.png",
        "https://i.ibb.co/kgLCHp3/thirdbanner.png",
        "https://i.ibb.co/wRfrX4R/fourthbanner.png"
    ];

    const [bannerUrl, setUrl] = useState<string>(
        "https://i.ibb.co/N67dhCz/Untitled-2.png"
    );
    const [imgIndex, setIndex] = useState<number>(0);

    function changeImage() {
        if (imgIndex == imgList.length - 1) {
            setUrl(imgList[0]);
            setIndex(0);
        } else {
            setUrl(imgList[imgIndex + 1]);
            setIndex(imgIndex + 1);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            changeImage();
        }, 10500);

        return () => clearInterval(interval);
    });

    const bannerStyle = {
        top: "1000px",
        transition: "opacity 0.5s ease-in-out",
        opacity: "1"
    };

    const fadedBannerStyle = {
        top: "300px",
        transition: "opacity 0.5s ease-in-out",
        opacity: "1"
    };

    return (
        <Container fluid className="p-0 m-0">
            <Image
                style={imgIndex === 0 ? bannerStyle : fadedBannerStyle}
                fluid
                src={bannerUrl}
            />
        </Container>
    );
};
