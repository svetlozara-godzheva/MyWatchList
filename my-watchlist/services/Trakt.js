const traktURL = "https://api.trakt.tv";
const traktClientID = "1a18a93227edba2eb707b59757a8efa327927da81f4bbf7c0e7f2c4380d8efe4";
const traktAPIVersion = 2;

export async function getTrendingTitles() {
    try {
        const response = await fetch(`${traktURL}/movies/trending`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "trakt-api-version": traktAPIVersion,
                "trakt-api-key": traktClientID
            }
        });

        const data = await response.json();
        let result = [];
        for (const item of data) {
            result.push({
                ids: item.movie.ids,
                title: item.movie.title,
                year: item.movie.year,
                poster: item.movie.images.poster[0]
            });
        }
        return result;
    } catch (error) {
        console.error("Error:", error);
    }
}