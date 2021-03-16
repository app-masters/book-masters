export default async (req, res, next) => {
  if (req.isAdmin) {
    return next();
  }
  return res.status(401).json({ error: 'You must be an admin to access this route.' });
};
