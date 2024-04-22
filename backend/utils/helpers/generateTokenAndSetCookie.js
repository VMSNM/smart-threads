import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.cookie('jwt', token, {
        maxAge: 604800000, //one week(1000*60*60*24*7)
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        secure: true,
        // sameSite: 'strict', // CSRF attacks cross-site request forgery attacks
    });

    return token;
}

export default generateTokenAndSetCookie;