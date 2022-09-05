import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetup</title>
        <meta name="description" content="Browse highly active React Meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

// Server side code, not accessible to users
export async function getStaticProps() {
  // fetch('/api/meetups/')
  const username = encodeURIComponent("amaan35");
  const password = encodeURIComponent("amaan35");

  const client = await MongoClient.connect(
    `mongodb+srv://${username}:${password}@cluster0.yvbdkks.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
