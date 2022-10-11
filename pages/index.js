import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import supabase from "../utils/supabase";

export async function getStaticProps() {
  const { data: posts, error } = await supabase.from("posts").select("*");

  if (error) {
    throw new Error(error);
  }

  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  console.log(supabase.auth.getUser());

  return (
    <div className={styles.container}>
      <section className={styles.main}>
        <h1>Hello world!</h1>
        <pre>{JSON.stringify(posts, null, 2)}</pre>
      </section>
    </div>
  );
}
