"use client";

import { useCallback, useEffect, useState } from "react";
import { Post } from "@/app/types/type";
import PostView from "@/app/components/post";
import { getStory, getTopStories } from "@/app/services/api";

const LIMIT = 10;

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [topStoryIds, setTopStoryIds] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  /** Fetch Top Stories Functions */
  const fetchTopStories = async () => {
    try {
      const ids = await getTopStories();
      setTopStoryIds(ids);
    } catch (error) {
      console.error("Failed to fetch top stories", error);
    }
  };

  /** Fetch Stories Functions */
  const fetchStories = useCallback(async () => {
    if (topStoryIds.length === 0) return;
    setLoading(true);

    const start = (page - 1) * LIMIT;
    const newPosts = await Promise.all(
      topStoryIds.slice(start, start + LIMIT).map(getStory)
    );

    setPosts((prev) => [...prev, ...newPosts]);
    setLoading(false);
  }, [page, topStoryIds]);

  useEffect(() => {
    fetchTopStories();
  }, []);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  /** load More Posts */
  const loadMorePosts = () => setPage((prev) => prev + 1);

  return (
    <div className="container">
      {loading && posts.length === 0 && (
        <div className="loading">Loading...</div>
      )}

      {posts.map((post, index) => (
        <PostView key={post.id || index} data={post} />
      ))}

      {topStoryIds.length > posts.length && !loading && (
        <button onClick={loadMorePosts} className="load-more">
          Load More
        </button>
      )}

      {!loading && posts.length === 0 && <div>No posts available</div>}
    </div>
  );
}

export default Home;
