import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function verifyJWT(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    return decoded;
  } catch (err) {
    console.log("==>Verify Token Exception");

    console.log(err);

    return null;
  }
}

export function isAdmin(req) {
  const payload = verifyJWT(req);

  if (!payload) {
    return false;
  }

  return Number(payload.userId) === -1;
}
