import jwt from "jsonwebtoken";

const generateToken = (id) => {
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    return token;
  } catch (error) {
    throw new Error("Error in generateToken", error);
  }
};

export default generateToken;
