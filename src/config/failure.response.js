export const failure = async (res, code) => {
  if (!STATUSCODE[code]) {
    return res.status(500).json({
      code: 0,
      error: STATUSCODE[0],
    });
  }

  return res.status(202).json({
    code: code,
    error: STATUSCODE[code],
  });
};

export const STATUSCODE = {
  0: "Unexpect error ocurred.",
  1: "Registration failed.",
  2: "Authentication failed. Please check your credentials.",
  3: "User already exist.",
  4: "Failure to create a new user.",
  5: "User not found.",
  6: "Failed to update user.",
  7: "Failed to delete user.",
  8: "User with status 'deleted'.",
};
