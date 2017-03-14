const utils = require("shipit-utils");

module.exports = function(shipit) {
  require("shipit-deploy")(shipit);
  require("shipit-yarn")(shipit);

  shipit.initConfig({
    default: {
      workspace: "/tmp/deezer-blindtest-client",
      deployTo: "/home/pierre/deezer-blindtest-client",
      repositoryUrl: "https://github.com/hyperc54/deezer-blindtest-client.git",
      ignores: [".git", "node_modules"],
      keepReleases: 2,
      shallowClone: true,
      yarn: {
        remote: false,
        yarnOrNpm: "npm"
      }
    },
    staging: {
      servers: "pierre@imperialcoloc.ovh"
    }
  });

  utils.registerTask(shipit, "build-assets", () => {
    shipit.log("Build final assets.");

    return shipit.local("cd /tmp/deezer-blindtest-client && npm run build");
  });

   shipit.on("yarn_installed", () => {
     utils.runTask(shipit, "build-assets");
   });
};
