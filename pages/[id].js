import { useEffect } from "react";
import supabase from "../utils/supabase";

export async function getServerSideProps({ params }) {
  const { data: post, error } = await supabase
    .from("posts")
    .select("*, comments(*)")
    .eq("id", params.id)
    .single();

  if (error) {
    throw new Error(error);
  }

  return {
    props: {
      post,
    },
  };
}

export default function PostPage({ post }) {
  useEffect(() => {
    const subscription = supabase
      .channel("public:comments")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments" },
        (payload) => {
          console.log("Change received!", payload);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(subscription);
  }, []);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </div>
  );
}
