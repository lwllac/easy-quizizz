// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { handleURL } from "./lib/answers";

export default (req, res) => {
  if (!req.body) {
    res.statusCode = 204;
    res.end("Error!");
    return;
  }

  const body = req.body;
  //console.log(body.url);

  if (body.url < 10) {
    res.statusCode = 400;
    res.end("Link is not valid!");
    return;
  }

  handleURL(body.url).then((answers) => console.log(answers));
  res.statusCode = 200;
  res.json({ status: "success!" });
};
