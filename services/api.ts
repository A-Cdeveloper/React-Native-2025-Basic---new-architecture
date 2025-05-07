export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  HEADERS: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

//const dalay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fetchMovies = async ({
  query,
}: {
  query: string;
}): Promise<Movie[]> => {
  // await dalay(4000);
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?&sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.HEADERS,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();

  return data.results;
};

///////////////////////////////////////////////////
export const fetchMovieDetails = async ({
  movie_id,
}: {
  movie_id: string;
}): Promise<Movie> => {
  try {
    const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movie_id}`, {
      method: "GET",
      headers: TMDB_CONFIG.HEADERS,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
