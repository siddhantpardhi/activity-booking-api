import jwt from "jsonwebtoken"

export const authenticate = (req, res, next) => {

  const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "")
  // console.log("🚀 ~ authenticate ~ token:", token)

  if(!token) return res.status(401).json( { status: 401, message: "Unauthorized: No token" } )

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userID = decoded.userID
    next()
  } catch (error) {
    console.error("Error while authenticating User ", error)
    return res.status(403).json({ message: 'Invalid token' })
  }
};
