const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
      res.redirect('/');
      alert("please log in to proceed!");
    } else {
      next();
    }
  };
  
  module.exports = withAuth;