import { Post } from "../types/type";

const BASE_URL = "https://hacker-news.firebaseio.com/v0/";

/** Get Top Stories */
export const getTopStories = async (): Promise<Array<number>> => {
  const req = await fetch(`${BASE_URL}/topstories.json?print=pretty`);

  const res = await req.json();

  return res;
};

/** Get Story */
export const getStory = async (id: number): Promise<Post> => {
  const req = await fetch(`${BASE_URL}/item/${id}.json?print=pretty`);

  const res = await req.json();

  return res;
};
