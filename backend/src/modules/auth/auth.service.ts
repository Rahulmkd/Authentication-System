import { prisma } from "../../lib/prisma";
import { ApiError } from "../../utils/ApiError";
import { comparePassword, hashPassword } from "../../utils/hash";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";

const REFRESH_TOKEN_EXPIRY_DAYS = 7;
const RESET_TOKEN_EXPIRY_MINUTES = 10;

const createRefreshToken = async (userId: string) => {
  const token = generateRefreshToken(userId);
  const expiresAt = new Date();

  expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRY_DAYS);

  await prisma.refreshToken.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  return token;
};

const buildAuthResponse = (user: {
  id: string;
  name: string;
  email: string;
}) => ({
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
  },
  accessToken: generateAccessToken(user.id),
});

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashedPassword,
    },
  });

  const refreshToken = await createRefreshToken(user.id);

  return { ...buildAuthResponse(user), refreshToken };
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordCorrect = await comparePassword(password, user.passwordHash);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  const refreshToken = await createRefreshToken(user.id);

  return { ...buildAuthResponse(user), refreshToken };
};
