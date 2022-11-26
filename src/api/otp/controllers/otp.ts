/**
 * otp controller
 */

import { factories } from "@strapi/strapi";
import OTP from "otp-generator";

export default factories.createCoreController("api::otp.otp", ({ strapi }) => ({
  async sendOtp(ctx) {
    const { mobileNo } = ctx.request.body;
    const otp = await OTP.generate(4, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const otpMessage = `speedyFood ~ Your OTP is ${otp}`;
    if (
      await strapi.db.query("api::otp.otp").findOne({
        where: {
          mobileNo: mobileNo,
        },
      })
    ) {
      await strapi.db.query("api::otp.otp").update({
        where: {
          mobileNo: mobileNo,
        },
        data: {
          otp: otp,
        },
      });
    } else {
      await strapi.db.query("api::otp.otp").create({
        data: {
          mobileNo: mobileNo,
          otp: otp,
        },
      });
    }
    strapi.service("api::otp.sms").sendsms(mobileNo, otpMessage);
    ctx.send({ message: "OTP sent successfully" });
  },

  async verifyOtp(ctx) {
    const { mobileNo, otp } = ctx.request.body;
    if (
      await strapi.db.query("api::otp.otp").findOne({
        where: {
          mobileNo: mobileNo,
          otp: otp,
        },
      })
    ) {
      await strapi.db
        .query("api::otp.otp")
        .delete({ where: { mobileNo: mobileNo } });
      ctx.send({ message: "OTP verified successfully" });
    } else {
      ctx.send({ message: "Invalid OTP" });
    }
  },
}));
