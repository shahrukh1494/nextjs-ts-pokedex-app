import Head from "next/head";

export default function Layout({ children, title }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="header">
        <h1>Pokedex App</h1>
      </div>

      <main className="container">{children}</main>
    </div>
  );
}
