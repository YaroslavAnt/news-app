import { ButtonGroup, Button } from "@material-ui/core";
import Link from "next/link";

const Navigation = ({ categories, category }) => {
  return (
    <nav>
      <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="large vertical contained primary button group"
        variant="text"
      >
        <Button variant={!category && "contained"} size="large">
          <Link href="/">
            <a>general</a>
          </Link>
        </Button>
        {categories.map((categoryName) => (
          <Button
            size="large"
            variant={categoryName === category && "contained"}
            key={categoryName}
          >
            <Link href="/[category]" as={`/${categoryName}`}>
              <a>{categoryName}</a>
            </Link>
          </Button>
        ))}
      </ButtonGroup>

      <style jsx>{`
        nav {
          position: fixed;
          top: 25%;
        }

        a {
          color: inherit;
          text-decoration: none;
          width: 100%;
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
