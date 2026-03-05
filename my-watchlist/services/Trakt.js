const traktURL = "https://api.trakt.tv";
const traktClientID = "1a18a93227edba2eb707b59757a8efa327927da81f4bbf7c0e7f2c4380d8efe4";
const traktAPIVersion = 2;

export async function getTrendingTitles(page) {
    if (!page) {
        page = 1;
    }
    try {
        const response = await fetch(`${traktURL}/movies/trending?page=${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "trakt-api-version": traktAPIVersion,
                "trakt-api-key": traktClientID
            }
        });

        const data = await response.json();
        const totalPages = parseInt(response.headers.get("X-Pagination-Page-Count"));
        let movies = [];
        for (const item of data) {
            movies.push({
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