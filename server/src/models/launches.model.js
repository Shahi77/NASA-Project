const launches = new Map();

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("May 12,2000"),
  destination: "keppler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: false,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}
module.exports = {
  getAllLaunches,
};
