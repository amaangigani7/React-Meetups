import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const username = encodeURIComponent("amaan35");
    const password = encodeURIComponent("amaan35");

    const client = await MongoClient.connect(
      `mongodb+srv://${username}:${password}@cluster0.yvbdkks.mongodb.net/meetups?retryWrites=true&w=majority`
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);
    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup Inserted" });
  }
  //   return {};
}

export default handler;
