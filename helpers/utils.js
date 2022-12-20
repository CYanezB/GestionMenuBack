const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const getAll = () => {
    return db.query('select * from plato');
}

const createToken = (usuario) => {
    const obj = {
        user_id: usuario.id,
        user_role: usuario.role,
        exp_at: dayjs().add(5, 'days').unix()
    }
    return jwt.sign(obj, 'en un lugar de la mancha')
}

const getDateOfISOWeek = (w, y) => {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
}
const selectWeek = (date) => {
    return Array(6).fill(new Date(date)).map((el, idx) =>
        new Date(el.setDate(el.getDate() - el.getDay() + idx))).slice(1, 6)
}


const sendMail = ({ user_mail, asunto, innerhtml }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'schoolmenuapp@gmail.com',
            pass: 'zadbprytvbxikzxm'
        }
    });

    const mailOptions = {
        from: 'schoolmenuapp@gmail.com',
        to: user_mail,
        subject: asunto,
        html: innerhtml
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            // do something useful
        }
    });
}

module.exports = {
    getAll,
    createToken,
    getDateOfISOWeek,
    selectWeek,
    sendMail
}