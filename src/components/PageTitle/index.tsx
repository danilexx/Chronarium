import Head from "next/head";

const PageTitle: React.FC<{ message: string }> = ({ message }) => {
  return (
    <Head>
      <title>{message}</title>
    </Head>
  );
};

export default PageTitle;
