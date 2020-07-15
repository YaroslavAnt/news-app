import Card from "./Card";
import { Grid } from "@material-ui/core";

const ArticleList = ({ articles }) => {
  return (
    <Grid container spacing={3}>
      {articles.map((article, idx) => (
        <Grid item key={idx}>
          <Card article={article} />
        </Grid>
      ))}

      <style jsx>{`
        .grid {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </Grid>
  );
};

export default ArticleList;
