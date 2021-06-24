const user = require("./controllers/user");
const User = require("./models/User");

const mockResponse = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res;
};

afterEach(() => {
  jest.resetAllMocks();
});

test("user mail is null", async () => {
  User.findOne = jest.fn().mockResolvedValue({ _id: "123", password: "pass" });

  const tReq = { body: { email: "email@email.fr", password: "pass" } };
  const tRes = mockResponse();
  const tNext = jest.fn();

  await user.login(tReq, tRes, tNext);
  expect(tReq).toEqual({
    body: { email: "email@email.fr", password: "pass" },
  });
  expect(tNext).toHaveBeenCalledTimes(0);
  expect(tRes.status).toHaveBeenNthCalledWith(1, 401);
  expect(tRes.json).toHaveBeenNthCalledWith(1, {
    error: "Mot de passe non valide !",
  });
});
