import ArticleList from "../../components/ArticleList";
import Layout from "../../components/Layout";
import { inject, observer } from "mobx-react";
import "mobx-react-lite/batchingForReactDom";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";

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

function Category({ articles }) {
  const router = useRouter();
  const { category } = router.query;
  const classes = useStyles();
  return (
    <Layout>
      <h1 className={classes.title}>
        News to category <span className={classes.blue}>{category}</span>
      </h1>
      <p className={classes.description}>Choose category of news</p>
      <ArticleList articles={articles} />
    </Layout>
  );
}

Category.getInitialProps = async ({ query, mobxStore }) => {
  const { category } = query;
  const { setArticles } = mobxStore;
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=d8094731524b45a28cdcc11757b1b1c5`
  );
  const { articles } = await res.json();
  setArticles(articles);
  return { articles };
};

export default inject("store")(observer(Category));
