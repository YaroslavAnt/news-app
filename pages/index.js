import ArticleList from "../components/ArticleList";
import { inject, observer } from "mobx-react";
import Layout from "../components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import "mobx-react-lite/batchingForReactDom";

const useStyles = makeStyles({
  title: {
    margin: 0,
    lineHeight: 1.15,
    fontSize: "4rem",
    textAlign: "center",
  },
  blue: {
    color: "#0070f3",
  },
  description: {
    textAlign: "center",
    lineHeight: 1.5,
    fontSize: "1.5rem",
  },
});

function Home({ articles }) {
  const classes = useStyles();
  return (
    <Layout>
      <h1 className={classes.title}>
        News to category <span className={classes.blue}>general</span>
      </h1>
      <p className={classes.description}>Choose category of news</p>
      <ArticleList articles={articles} />

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </Layout>
  );
}

Home.getInitialProps = async ({ mobxStore }) => {
  const { setArticles } = mobxStore;

  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=d8094731524b45a28cdcc11757b1b1c5`
  );
  const { articles } = await res.json();
  setArticles(articles);
  return { articles };
};

export default inject("store")(observer(Home));
