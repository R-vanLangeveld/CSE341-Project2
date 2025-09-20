const swaggerAutogen = require("swagger-autogen")();

const port = process.env.PORT || 3000;

const doc = {
  info: {
    title: "Contacts API",
    description: "Contacts API"
  },
  host:
    process.env.NODE_ENV === "production"
      ? "cse341project1-0a6p.onrender.com"
      : "localhost:" + port,
  schemes: process.env.NODE_ENV === "production" ? ["https"] : ["http"]
};

const outputFile = "./swagger.json";
const routes = ["./routes/index.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
