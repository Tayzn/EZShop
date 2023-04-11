import React, { useState } from "react";
import { Container, Image } from "react-bootstrap";

export const ImageBanner = (): JSX.Element => {
    const imgList = [
        "https://i.ibb.co/BKgX1tt/bannergrad.png",
        "https://i.ibb.co/XLNVbHW/secondbanner.png"
    ];

    const [bannerUrl, setUrl] = useState<string>(
        "https://i.ibb.co/BKgX1tt/bannergrad.png"
    );
    const [imgIndex, setIndex] = useState<number>(0);

    function changeImage() {
        if (imgIndex == 0) {
            setUrl(imgList[1]);
            setIndex(1);
        } else {
            setUrl(imgList[0]);
            setIndex(0);
        }
    }

    setInterval(() => {
        changeImage();
    }, 7 * 1000);

    const bannerStyle = {
        transition: "opacity 0.5s ease-in-out"
    };

    return (
        <Container fluid className="p-0 m-0">
            <Image style={bannerStyle} fluid src={bannerUrl} />
        </Container>
    );
};
