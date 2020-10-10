import { handleURL } from "./lib/answers";

export default async (req, res) => {
  if (!req.body) {
    res.statusCode = 204;
    res.end("Error!");
    return;
  }
  const body = req.body;

  if (body.url < 10) {
    res.statusCode = 400;
    res.end("Link is not valid!");
    return;
  } 
  let data;
  await handleURL(body.url).then((questions) => {
    console.log(questions);
    data = questions;
  });
  res.statusCode = 200;
    res.json({
      status: "success!",
      data: data,
    });
};
