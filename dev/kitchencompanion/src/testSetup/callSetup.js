const { setup } = require("./setup");

/**
 * This function is an asynchronous function that initializes the application for jest-test.
 * It calls the setup function to perform the necessary setup tasks.
 *
 * @param app - The application object that contains the necessary configurations and dependencies.
 */
module.exports = async function (app) {
  console.log("\n-- Entering setup --");
  await setup(app);
};
