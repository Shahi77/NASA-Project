const launchesDatabase = require("./launches.mongo");
const launches = new Map();

let latestFlightNumber = 100;
const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("May 12,2000"),
  target: "keppler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

async function getAllLaunches() {
  return await launchesDatabase.find({}, { _id: 0, __v: 0 });
}
async function saveLaunch(launch) {
  await launchesDatabase.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}
function addNewLaunch(launch) {
  latestFlightNumber += 1;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customers: ["ISRO", "NASA"],
      success: true,
      upcoming: true,
    })
  );
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
};
