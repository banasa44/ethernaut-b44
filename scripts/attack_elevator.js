const Building = artifacts.require("Building");

module.exports = async function (callback) {
  try {
    // Get the deployed instance of the Building contract
    const buildingInstance = await Building.deployed();

    // Attack
    const attack = await buildingInstance.attack();
    console.log("Attack transaction sent:", attack.tx);

    callback();
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
