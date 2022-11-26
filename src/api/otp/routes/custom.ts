export default {
  routes: [
    {
      method: "POST",
      path: "/otp/send",
      handler: "otp.sendOtp",
      config: {
        description: "Send OTP",
        tags: ["api", "otp"],
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/otp/verify",
      handler: "otp.verifyOtp",
      config: {
        description: "Verify OTP",
        tags: ["api", "otp"],
        auth: false,
      },
    },
  ],
};
