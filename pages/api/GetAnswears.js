// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { handleURL } from "./lib/answears";

export default (req, res) => {
  console.log("hello");
  let input =
    "https://quizizz.com/join/quiz/5ea82420680aa2001bce4dc5/start?studentShare=true";
  handleURL(input);
  res.statusCode = 200;
  res.json({ name: "John Doe" });
};
