import { Twilio } from "twilio";

export default {
  async sendsms(mobileNo: string, text: string) {
    const client = new Twilio(
      "ACa657f25b3b42a6c9928df50c6b1b2895",
      "dc6fac77070559b61c5bae3161c2df5a"
    );
    try {
      const message = await client.messages.create({
        from: "+13395005974",
        to: mobileNo,
        body: text,
      });
      return message;
    } catch (error) {
      console.log(error);
    }
  },
};
