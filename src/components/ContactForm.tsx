import React, { useState } from "react";
import emailjs from "emailjs-com";
import { FaStar } from "react-icons/fa";

function ContactForm() {
    const [result, showResult] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const labelStyle: React.CSSProperties = {
        display: "block",
        marginTop: "25px",
        marginBottom: "0px"
    };

    const ratingLabelStyle: React.CSSProperties = {
        ...labelStyle,
        textAlign: "center"
    };

    const inputStyle: React.CSSProperties = {
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc"
    };

    const textareaStyle: React.CSSProperties = {
        resize: "none",
        minHeight: "80px",
        width: "100%",
        padding: "10px",
        marginBottom: "20px",
        borderRadius: "5px",
        border: "1px solid #ccc"
    };

    const submitStyle: React.CSSProperties = {
        display: "inline-block",
        padding: "10px 20px",
        backgroundColor: "#1b8754",
        border: "none",
        borderRadius: "5px",
        color: "white",
        cursor: "pointer"
    };

    const ratingContainerStyle: React.CSSProperties = {
        marginTop: "-30px",
        marginBottom: "26px"
    };

    const starRatingStyle: React.CSSProperties = {
        marginTop: "6px",
        display: "flex",
        justifyContent: "center"
    };

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_vor8ak2",
                "template_toqm05u",
                e.currentTarget,
                "YgsYLJ3tm-bW5B7K6"
            )
            .then(
                () => {
                    showResult(true);
                    setRating(0);
                    setHover(0);
                },
                (error) => {
                    console.log(error.text);
                }
            );
        e.currentTarget.reset();
    };

    return (
        <div style={{ padding: "10px" }}>
            <form onSubmit={sendEmail}>
                <div style={ratingContainerStyle}>
                    <label style={ratingLabelStyle}>
                        Rate Your Experience on EZShop:
                    </label>
                    <div style={starRatingStyle}>
                        {[...Array(5)].map((star, index) => {
                            const ratingValue = index + 1;
                            return (
                                <FaStar
                                    key={index}
                                    className="star"
                                    color={
                                        ratingValue <= (hover || rating)
                                            ? "#ffc107"
                                            : "#e4e5e9"
                                    }
                                    size={20}
                                    onClick={() => setRating(ratingValue)}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(rating)}
                                />
                            );
                        })}
                    </div>
                </div>
                <input type="hidden" name="contact_number" />
                <input type="hidden" name="rating" value={rating} />
                <label style={labelStyle}>Name:</label>
                <input type="text" name="user_name" style={inputStyle} />
                <label style={labelStyle}>E-mail Address:</label>
                <input type="email" name="user_email" style={inputStyle} />
                <label style={labelStyle}>Message:</label>
                <textarea name="message" style={textareaStyle} />
                <input type="submit" value="Send" style={submitStyle} />
            </form>
            {result ? <p>Your message has been successfully sent.</p> : null}
        </div>
    );
}

export default ContactForm;
