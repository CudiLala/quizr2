import mongoose from "mongoose";

const UserDraftSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    index: {
      unique: true,
      collation: { locale: "en", strength: 2 },
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    index: {
      unique: true,
      collation: { locale: "en", strength: 2 },
    },
  },
  password: String,
  confirmPassword: String,
  profilePicture: { type: String, default: generateFace },
  createdAt: { type: Date, default: () => Date.now() },
});

UserDraftSchema.index({ createdAt: 1 }, { expireAfterSeconds: 24 * 60 * 60 });

function generateFace() {
  function chooseEyes() {
    const random = Math.floor(Math.random() * 10 + 1);
    if (random < 3) return "wink";
    else if (random < 4) return "hearts";
    else if (random < 8) return "happy";
    return "default";
  }

  function chooseEyeBrow() {
    const random = Math.floor(Math.random() * 10 + 1);
    if (random < 2) return "raisedExcited";
    else if (random < 3) return "up";
    return "default";
  }

  function chooseMouth() {
    const random = Math.floor(Math.random() * 10 + 1);
    if (random < 4) return "twinkle";
    else if (random < 6) return "tongue";
    return "smile";
  }

  function chooseTop() {
    const random = Math.floor(Math.random() * 10 + 1);
    if (random < 2) return "longHair";
    else if (random < 4) return "shortHair";
    else if (random < 4) return "straight02";
    else if (random < 5) return "curly";
    else if (random < 6) return "dreads01";
    else if (random < 7) return "dreads02";
    else if (random < 8) return "shortCurly";
    else if (random < 9) return "shortFlat";
    else if (random < 10) return "frizzle";
    return "straight01";
  }

  const seed = Math.floor(Math.random() * 1000);
  const query = `eyes[]=${chooseEyes()}&eyebrow[]=${chooseEyeBrow()}&mouth[]=${chooseMouth()}&top[]=${chooseTop()}&facialHairChance=0`;

  return `https://avatars.dicebear.com/api/avataaars/${seed}.svg?${query}`;
}

export default mongoose.models.UserDraft ||
  mongoose.model("UserDraft", UserDraftSchema, "userDrafts");
