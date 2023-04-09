import React from "react";
import { Image } from "react-bootstrap";

const bannerUrl = "https://i.ibb.co/Kxstm1M/phbg.png";

export const ImageBanner = (): JSX.Element => {
    return (
        <div className="w-100" style={{ height: "30%" }}>
            <Image className="w-100 h-100" src={bannerUrl} />
        </div>
    );
};
