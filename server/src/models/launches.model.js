const launches = new Map();

let latestFlightNumber = 100;
const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("May 12,2000"),
  target: "keppler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
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
module.exports = {
  getAllLaunches,
  addNewLaunch,
};
