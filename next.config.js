const path = require("path");

module.exports = {
  webpack5: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: {
    BASE_URL: "http://localhost:3000",
    MONGODB_URL:
      "mongodb+srv://vsard123:0918815218@cluster0.5pvah.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    ACCESS_TOKEN_SECRET: "mctgear1238494903795732933",
    REFRESH_TOKEN_SECRET: "mctgear1231105092rere6248078133",
    PAYPAL_CLIENT_ID:
      "AQ-FzHB3k4PaWIbacQjFvAkbrvDVg3yMJWkW7YFb0WgIht4kTDsIRZGRohmfcefgr5Pz08dThPbkXdUQ",
    CLOUD_UPDATE_PRESET: "mctgear_store",
    CLOUD_NAME: "mctgear",
    CLOUD_API: "https://api.cloudinary.com/v1_1/mctgear/image/upload",
  },
};
