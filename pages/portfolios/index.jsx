import Layout from "../layout";
import fetch from "isomorphic-unfetch";
import Link from "next/link";

export default function indexBlogs({ portfolios }) {

  return (
    <Layout>
      <div className="container">
        <div className="pgcontent">
          <div className="pgheading">My Portfolios</div>
          <div className="grid grid-4columns grid-gap10">
            {portfolios.map((portfolio) => (
              <Link href={`/portfolios/${portfolio.ID}`} key={portfolio.ID}>
                <a>
                  <div className="gridcard" key={portfolio.ID}>
                    <img src={portfolio.imageUrl} />
                    <div className="gridbottomtitle">{portfolio.title}</div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/portfolios");
  //console.log("res", res);
  const portfolios = await res.json();

  return {
    props: {
      portfolios,
    },
  };
}
