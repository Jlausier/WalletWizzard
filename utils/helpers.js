export default {
  json: function (context) {
    return JSON.stringify(context);
  },

  cleanId: function (id) {
    return id.split("-").join("");
  },
};
