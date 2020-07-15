import ArticleList from "../../components/ArticleList";
import Layout from "../../components/Layout";
import { inject, observer } from "mobx-react";
import "mobx-react-lite/batchingForReactDom";
import { useRouter } from "next/router";

function Category({ store }) {
  const { articles } = store;
  const router = useRouter();
  const { category } = router.query;
  return (
    <Layout>
      <h1 className="title">
        News to category <span>{category}</span>
      </h1>
      <p className="description">Choose category of news</p>
      <ArticleList articles={articles} />

      <style jsx>{`
        .title span {
          color: #0070f3;
          text-decoration: none;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }
      `}</style>

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
