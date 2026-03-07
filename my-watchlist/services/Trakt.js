import { TRAKT_URL, TRAKT_DEFAULT_HEADERS } from "./TraktConfig";

export async function searchMovies(searchTerm, page) {

    if (!page) {
        page = 1;
    }

    try {
        const response = await fetch(`${TRAKT_URL}/search/movie?query=${searchTerm}&extended=full&page=${page}`, {
            method: "GET",
            headers: TRAKT_DEFAULT_HEADERS
        });

        const data = await response.json();
        const totalPages = parseInt(response.headers.get("X-Pagination-Page-Count"));
        let movies = [];
        for (const item of data) {
            movies.push({
                id: item.movie.ids.trakt,
                ids: item.movie.ids,
                title: item.movie.title,
                year: item.movie.year,
                poster: item.movie.images.poster[0],
                thumb: item.movie.images.thumb[0],
                overview: item.movie.overview
            });
        }

        return {
            page: page,
            movies: movies,
            totalPages: totalPages
        };

    } catch (error) {
        console.error("Error:", error);
    }
}

export async function getTrendingTitles(page) {

    if (!page) {
        page = 1;
    }

    try {
        const response = await fetch(`${TRAKT_URL}/movies/trending?page=${page}`, {
            method: "GET",
            headers: TRAKT_DEFAULT_HEADERS
        });

        const data = await response.json();
        const totalPages = parseInt(response.headers.get("X-Pagination-Page-Count"));
        let movies = [];
        for (const item of data) {
            movies.push({
                id: item.movie.ids.trakt,
                ids: item.movie.ids,
                title: item.movie.title,
                year: item.movie.year,
                poster: item.movie.images.poster[0],
                thumb: item.movie.images.thumb[0],
                overview: item.movie.overview
            });
        }

        return {
            page: page,
            movies: movies,
            totalPages: totalPages
        };

    } catch (error) {
        console.error("Error:", error);
    }
}

export async function getUpcomingTitles(page) {

    if (!page) {
        page = 1;
    }

    try {
        const response = await fetch(`${TRAKT_URL}/movies/anticipated?extended=full&page=${page}`, {
            method: "GET",
            headers: TRAKT_DEFAULT_HEADERS
        });

        const data = await response.json();
        const totalPages = parseInt(response.headers.get("X-Pagination-Page-Count"));
        let movies = [];
        console.log(data);
        for (const item of data) {
            if (item.movie.images?.poster[0]) {
                movies.push({
                    id: item.movie.ids.trakt,
                    ids: item.movie.ids,
                    title: item.movie.title,
                    year: item.movie.year,
                    poster: item.movie.images.poster[0],
                    thumb: item.movie.images.thumb[0],
                    overview: item.movie.overview
                });
            }
        }

        return {
            page: page,
            movies: movies,
            totalPages: totalPages
        };

    } catch (error) {
        console.error("Error:", error);
    }
}

export async function getCollection(collectionName, page) {

    if (collectionName === Collections.TRENDING) {
        return await getTrendingTitles(page);
    }
    if (collectionName === Collections.UPCOMING) {
        return await getUpcomingTitles();
    }
}

const Collections = Object.freeze({
    UPCOMING: "upcoming",
    TRENDING: "trending",
});

export default Collections;