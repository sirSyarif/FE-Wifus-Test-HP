const dataUser = [
  {
    email: "admin@admin.com",
    password: "123Admin@",
  },
];

export default function login(req, res) {
  if (req.method === "POST") {
    const filteredUser = dataUser.filter(
      (_user) =>
        _user.email === req.body.email && _user.password === req.body.password
    );
    if (filteredUser?.length > 0) {
      res.status(200).json({ data: filteredUser[0] });
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } else {
    res.status(405).json({ message: `${req.method} is not allowed` });
  }
}
