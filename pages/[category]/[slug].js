import { inject, observer } from "mobx-react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { Typography, Button } from "@material-ui/core";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  image: {
    maxWidth: "100%",
  },
  media: {
    height: 180,
  },
});

const ArticleItem = ({ store }) => {
  const { articles } = store;
  const classes = useStyles();
  const router = useRouter();
  const { slug, category } = router.query;
  const article = articles.find((article) => article.url.includes(slug)) || {};
  const { urlToImage, url, title, content, author, publishedAt } = article;
  // const [date] = publishedAt.split("T");

  return (
    <Layout>
      <Typography variant="h3" component="h1">
        {title}
      </Typography>
      <img src={urlToImage} alt={title} className={classes.image} />
      <Typography variant="subtitle2" component="p" gutterBottom>
        {publishedAt && publishedAt.split("T")[0]}
      </Typography>
      <Typography gutterBottom>{content}</Typography>
      <Typography align="right" gutterBottom color="primary">
        {author}
      </Typography>
      <a href={url} target="_blank">
        Original text
      </a>
      <Button size="small" color="primary">
        <Link
          href={category === "general" ? "/" : "/[category]"}
          as={category === "general" ? "/" : `/${category}`}
        >
          <a>Back to list</a>
        </Link>
      </Button>

      {/* <pre>{JSON.stringify(article, null, 2)}</pre> */}
    </Layout>
  );
};

export default inject("store")(observer(ArticleItem));
