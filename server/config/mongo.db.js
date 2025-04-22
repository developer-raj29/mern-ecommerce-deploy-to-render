const mongoose = require("mongoose");

require("dotenv").config();

const connect_DB = async (req, res) => {
  try {
    const mongoUri = process.env.MONGODB_URL; // ✅ should be defined
    if (!mongoUri) throw new Error("MONGO_URI not defined");

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected Successfully.....");
  } catch (err) {
    console.log("❌ Connection Failed while connecting to DB.....");
    console.error(err);
    process.exit(1);
  }
};

module.exports = connect_DB;

// const mongoose = require("mongoose");

// const connect_DB = async () => {
//   try {
//     const mongoUri = process.env.MONGO_URI; // ✅ should be defined
//     if (!mongoUri) throw new Error("MONGO_URI not defined");

//     await mongoose.connect(mongoUri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log("✅ MongoDB Connected Successfully.....");
//   } catch (err) {
//     console.log("❌ Connection Failed while connecting to DB.....");
//     console.error(err);
//     process.exit(1);
//   }
// };

// module.exports = connect_DB;
