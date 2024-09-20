const nodemailer = require("nodemailer");

const mailSender = async ({ email, title, data, msg, name }) => {
    console.log("In the transpoter");

    try {
        var transpoter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });
    } catch (e) {
        console.log("Error in mail sender...");
        console.log(e);
    }
    console.log("Running the transpoter ->", email, data, title, msg, name);

    let info = await transpoter.sendMail({
        from: "StudyNotion - by Rebel",
        to: `${email}`,
        subject: `${title}`,
        html: `
        <div style="background-color: ; padding: 1rem; border-radius: 0.5rem; font-size: 1.125rem;">
        <p>Hi, ${name}</p>
     
        <p style="margin-top: 1rem; display: flex; ">
            <span>${msg} </span>
            <div style="background-color: #FFED4A; padding: 0.25rem 0.5rem; border-radius: 0.25rem; animation: bounce 1s infinite;  display: flex; flex: flex-row justify-content: center; align-items: center; margin-top: 1.25rem;">    ${data && (`<p>${data}</p>`)}
            </div>
        </p>
    </div>
   </div>
   
    `,
    });
    console.log("Done with transpoter");
    console.log("Returning info -> ", info);
    return info;

}

module.exports = mailSender;


