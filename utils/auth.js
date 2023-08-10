/**
 * Authentication middleware that redirects if not logged in
 *
 * @method withAuth
 */
export default (req, res, next) => {
  req.session.logged_in ? next() : res.redirect("/login");
};
