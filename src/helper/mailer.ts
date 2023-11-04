import  nodemailer from 'nodemailer';
import User from '@/models/userModels';
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({email,emailType,userId}:any) => {
    try {
        // Create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(),10);

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken : hashedToken,
                    verifyTokenExpiry: Date.now()+36000000
                }
                )
        }
        else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken : hashedToken,
                    forgotPasswordTokenExpiry: Date.now()+36000000
                }
                )
        }


        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "8b0fc7d76696a3",
              pass: "5ddb18eb4cc796"
            }
          });

          const mailOptions = {
            from : 'ankit21654@gmail.com',
            to:email,
            subject: emailType === 'VERIFY' ? "Verify Your Email" : "Reset Your Password",
            html: `<p>Copy paste the link below to ${emailType === 'VERIFY' ? "Verify Your Email" : "Reset Your Password"}
            <br />
            ${process.env.DOMAIN}/resetPassword?token=${hashedToken}
            </p>`
          }

          const mailResponse = await transport.sendMail(mailOptions);
          return mailResponse;
    } catch (error:any) {
        throw new Error(error.message)
    }
}