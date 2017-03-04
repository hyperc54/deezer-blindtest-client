const utils = require("shipit-utils");

module.exports = function(shipit) {
  require("shipit-deploy")(shipit);
  require("shipit-yarn")(shipit);

  shipit.initConfig({
    default: {
      workspace: "/tmp/deezer-blindtest-client",
      deployTo: "/home/pierre/deezer-blindtest-client",
      repositoryUrl: "https://github.com/hyperc54/deezer-blindtest-client.git",
      ignores: [".git"],
      keepReleases: 2,
      shallowClone: true,
      yarn: {
        remote: true,
        yarnOrNpm: "npm"
      }
    },
    staging: {
      servers: "pierre@imperialcoloc.ovh"
    }
  });

  utils.registerTask(shipit, "build-assets", () => {
    shipit.log("Reload gracefully the blindtest server app.");

    return shipit.remote("cd /home/pierre/deezer-blindtest-client/current && npm run build");
  });

   shipit.on("published", () => {
     // FIXME: TACHE A EFFECTUER AAAAAAVVVVVVVVANT LE PUBLISHED
     utils.runTask(shipit, "build-assets");
   });
};
