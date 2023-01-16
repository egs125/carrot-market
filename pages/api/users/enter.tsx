import mail from "@sendgrid/mail";
import twilio from "twilio";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

mail.setApiKey(process.env.SENDGRID_KEY!);
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    /*  const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.MY_PHONE!,
      body: `Your login token is ${payload}.`,
    });
    console.log(message); */
  } else if (email) {
    /* const email = await mail.send({
      from: 'egs125@gmail.com',
      to: 'egs125@gmail.com',
      subject: "Your Carrot Market Verification Email",
      text: `Your token is ${payload}`,
      html: `<strong>Your token is ${payload}</strong>`,
    });
    console.log(email); */
  }

  /* 클래식한 방식으로 구현 시 아래와 같음
  if (email) {
    user = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (user) console.log("found it.");
    if (!user) {
      console.log("Did not find. Will create.");
      user = await client.user.create({
        data: {
          name: "Anonymous",
          email,
        },
      });
    }
    console.log(user);
  }
  if (phone) {
    user = await client.user.findUnique({
      where: {
        phone: +phone,
      },
    });
    if (user) console.log("found it.");
    if (!user) {
      console.log("Did not find. Will create.");
      user = await client.user.create({
        data: {
          name: "Anonymous",
          phone: +phone,
        },
      });
    }
    console.log(user);
  }
  */
  return res.json({
    ok: true,
  });
}

export default withHandler({ method: ["POST"], handler, isPrivate: false });