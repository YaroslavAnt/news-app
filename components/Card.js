import Link from "next/link";
import { getSlug } from "../utils";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 180,
  },
});

const MyCard = ({ article }) => {
  const { urlToImage, title, description, source, url } = article;
  const classes = useStyles();
  const router = useRouter();
  const { category } = router.query;

  return (
    <Card className={classes.root}>
      <Link
        href="/[category]/[slug]"
        as={`/${category ?? "general"}/${getSlug(url)}`}
      >
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={urlToImage ?? ""}
            title={title}
            component="div"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {description}
            </Typography>
            <Typography variant="body2" color="textPrimary" component="p">
              {source.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default MyCard;
