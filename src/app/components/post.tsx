import React from "react";
import { Post } from "@/app/types/type";

/** Post List */
export default function PostList({ data }: { data: Post }) {
  return (
    <a href={data.url} target="_blank">
      <p>{data.title}</p>
      {/* <p>
        <span>Created By: {data.by}</span>
        <span>At: {new Date(data.time).toISOString()}</span>
      </p> */}
    </a>
  );
}
