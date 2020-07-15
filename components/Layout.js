import { inject, observer } from "mobx-react";
import Link from "next/link";
import Head from "next/head";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { ButtonGroup, Button } from "@material-ui/core";

const Layout = ({ children, store }) => {
  const { categories } = store;
  const router = useRouter();
  const { category } = router.query;

  return (
    <div className="container">
      <Head>
        <title>{category ?? "general"} news</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <aside>
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
        </nav>
      </aside>

      <main>{children}</main>

      <span></span>

      <Footer />

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          position: relative;
          max-width: 1440px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 260px 1fr;
          background: #f9f9f0;
          overflow: hidden;
        }

        aside {
          display: flex;
          justify-content: center;
        }

        nav {
          position: fixed;
          top: 25%;
        }

        main {
          padding: 5rem 0;
          flex: 1;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title span {
          color: #0070f3;
          text-decoration: none;
          text-transform: uppercase;
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
    </div>
  );
};

export default inject("store")(observer(Layout));
