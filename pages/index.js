import ArticleList from "../components/ArticleList";
import { inject, observer } from "mobx-react";
import Layout from "../components/Layout";

function Home({ store }) {
  const { articles } = store;
  return (
    <Layout>
      <h1 className="title">
        News to category <span>general</span>
      </h1>
      <p className="description">Choose category of news</p>
      <ArticleList articles={articles} />
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
