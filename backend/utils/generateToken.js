import  jwt  from "jsonwebtoken";

const generateTokenAndSetCookie = async (userId, res) => {
    const token = await jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // millisec
        httpOnly: true, // prevent XSS attacks - cross site scripting attacks
        sameSite: "strict", // prevent CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    })

}

export default generateTokenAndSetCookie