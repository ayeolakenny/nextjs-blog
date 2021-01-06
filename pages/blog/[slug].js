import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import mark from "marked";

const Post = ({ htmlString, data }) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta title="description" content={data.desctription} />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: htmlString }} />
      <div>
        <div>Contents Below</div>
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync("posts");
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMetadata = fs
    .readFileSync(path.join("posts", slug + ".md"))
    .toString();

  const parsedMarkdown = matter(markdownWithMetadata);
  const htmlString = mark(parsedMarkdown.content);
  return {
    props: {
      htmlString,
      data: parsedMarkdown.data,
    },
  };
};

export default Post;
