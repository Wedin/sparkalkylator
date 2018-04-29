const withOffline = require("next-offline");

module.exports = withOffline({
  exportPathMap() {
    return {
      "/": { page: "/" },
      "/om": { page: "/om" },
    };
  },
});
