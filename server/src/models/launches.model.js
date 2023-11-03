const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("May 12,2000"),
  target: "Kepler-62 f",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

async function existsLaunchWithId(launchId) {
  return await launchesDatabase.findOne({
    flightNumber: launchId,
  });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  } else {
    return latestLaunch.flightNumber;
  }
}

async function getAllLaunches() {
  const result = await launchesDatabase.find({}, { _id: 0, __v: 0 });
  console.log(`db result: ${result}`);
  return result;
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error(`No planet with name: ${launch.target} found`);
  }

  try {
    await launchesDatabase.findOneAndUpdate(
      {
        flightNumber: launch.flightNumber, // check if there exists an entry in DB with the same flightNumber
      },
      launch,
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`Error in saving launch: ${err}`);
  }
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["ISRO", "NASA"],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
  const aborted = await launchesDatabase.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );
  return aborted.ok === 1 && aborted.nModified === 1;
}

module.exports = {
  existsLaunchWithId,

  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
};
