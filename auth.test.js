const user = require("./controllers/user");

test("user mail is null", async () => {
  const tReq = { email: "email@email.fr" };
  const tRes = {};
  const tNext = jest.fn();

  await user.login(tReq, tRes, tNext);
  expect(tNext).toBe(true);
});
