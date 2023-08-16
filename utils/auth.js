/**
 * Authentication middleware that redirects if not logged in
 *
 * @method withAuth
 */
export default (req, res, next) => {
  if (req.session.logged_in) {
    next();
  } else {
    console.log("----------------- Logging out -----------------");
    res.redirect("/");
  }
};
