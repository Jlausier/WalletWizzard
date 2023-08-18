export default {
  json: function (context) {
    return JSON.stringify(context);
  },

  cleanId: function (id) {
    return id.split("-").join("");
  },

  formatDate: function (dateString) {
    const date = new Date(dateString);
    const isValid = date.getTime() === date.getTime();
    return isValid ? date.toLocaleDateString("en-US") : "";
  },
};
