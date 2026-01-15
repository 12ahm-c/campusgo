export const register = async (req, res) => {
  try {
    const { username, password, age } = req.body;

    if (!username || !password || !age) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // مؤقت: بدون DB
    return res.status(201).json({
      message: "User registered successfully",
      user: { username, age }
    });

  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // مؤقت: بدون DB
    return res.json({
      message: "Login OK",
      token: "fake-token"
    });

  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};