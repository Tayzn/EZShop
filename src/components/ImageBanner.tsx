import React from "react";
import { Image } from "react-bootstrap";

export const ImageBanner = (): JSX.Element => {
    return (
        <div className="w-100" style={{ height: "30%" }}>
            <Image
                className="w-100 h-100"
                src="https://i.ibb.co/JkWtVwm/phbanner.png"
            />
        </div>
    );
};
