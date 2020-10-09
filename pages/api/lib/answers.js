// I FOUND THAT CODE ON GITHUB AND MODIFIED IT FOR THIS PROJCET.

let axios = require("axios");

async function handleURL(url) {
  let code = /quiz\/([a-z0-9]+)/g.exec(url)[1];
  let payload = {
    "quizId": code,
    "player": {
      "id": "me",
      "origin": "web",
      "isGoogleAuth": false,
      "avatarId": null,
      "startSource": "preGameScreen",
      "userAgent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
      "uid": "f0bebfbc-1e8b-472f-8831-279f45ad7968",
      "expName": "searchQSExp_exp",
      "expSlot": "5",
    },
    "userId": null,
    "gameOptions": {
      "jumble": false,
      "jumbleAnswers": false,
      "showAnswers": true,
      "showAnswers_2": "always",
      "studentQuizReview": true,
      "studentQuizReview_2": "yes",
      "studentLeaderboard": true,
      "memes": true,
      "timer": true,
      "memeset": "5cca21214674ff001de7a6e5",
      "studentMusic": true,
      "loginRequired": false,
      "limitAttempts": 0,
      "redemption": "yes",
      "nicknameGenerator": false,
      "powerups": "yes",
    },
    "powerupInternalVersion": "10",
    "slot": 5,
    "experiment": "searchQSExp_exp",
    "locale": "en",
  };
  let answers = [];
  return axios.post("https://game.quizizz.com/play-api/v2/solo-join", payload)
    .then((res) => res.data.data.room.hash)
    .then((id) => {
      return answers = extractAnswers(id, "solo").then((data) => {
        answers = data;
        return answers;
      });
    });
}
async function extractAnswers(hash, type) {
  let json = [];
  return axios.post("https://game.quizizz.com/play-api/v3/getQuestions", {
    roomHash: hash,
    type: type,
  })
    .then((res) => res.data.questions)
    .then((questions) => {
      Object.values(questions).forEach((q) => {
        let answer = decode(q.structure.answer);
        json.push(
          {
            "question": q.structure.query.text,
            "answer": q.structure.options[answer].text,
          },
        );
      });
      console.log(json);
      return json;
    }).catch((err) => {
      console.log("There was an error.");
      console.log(err);
    });
}

const handlePIN = (pin) => {
  axios.post(
    "https://game.quizizz.com/play-api/v3/checkRoom",
    { mongoId: null, roomCode: pin },
  )
    .then((res) => JSON.parse(decode(res.data.odata)).hash)
    .then((hash) => extractAnswers(hash, "live"));
};
const decode = function (e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
  if (t) {
    var o = extractHeader(e);
    return decodeRaw(o, !0);
  }
  var n = decode(extractHeader(e), !0),
    a = extractData(e);
  return decodeRaw(a, !1, n);
};

const decodeRaw = function (e, t) {
  if (t) {
  }
  var o = arguments.length > 2 && void 0 !== arguments[2]
      ? arguments[2]
      : "quizizz.com",
    n = extractVersion(e),
    a = 0;
  a = t ? o.charCodeAt(0) : o.charCodeAt(0) + o.charCodeAt(o.length - 1),
    a = -a;
  for (var i = [], r = 0; r < e.length; r++) {
    var s = e[r],
      c = s.charCodeAt(0),
      l = t ? safeAdd(c, a) : addOffset(c, a, r, n);
    i.push(String.fromCharCode(l));
  }
  return i.join("");
};
const safeAdd = function (e, t) {
  var o = 0,
    n = 65535,
    a = e + t;
  return a > n ? o + (a - n) - 1 : a < o ? n - (o - a) + 1 : a;
};
const extractHeader = function (e) {
  var t = e.charCodeAt(e.length - 2) - 33;
  return e.slice(0, t);
};
const addOffset = function (e, t, o, n) {
  return 2 === n
    ? verifyCharCode(e) ? safeAdd(e, o % 2 === 0 ? t : -t) : e
    : safeAdd(e, o % 2 === 0 ? t : -t);
};
const verifyCharCode = function (e) {
  if ("number" === typeof e) {
    return !(e >= 55296 && e <= 56319) && !(e >= 56320 && e <= 57343);
  }
};
const extractData = function (e) {
  var t = e.charCodeAt(e.length - 2) - 33;
  return e.slice(t, -2);
};
const extractVersion = function (e) {
  if ("string" === typeof e && e[e.length - 1]) {
    var t = parseInt(e[e.length - 1], 10);
    if (!isNaN(t)) {
      return t;
    }
  }
  return null;
};
module.exports = { handlePIN, handleURL };
