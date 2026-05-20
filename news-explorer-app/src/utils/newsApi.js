const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const newsApiBaseUrl =
  import.meta.env.MODE === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

/**
 * Fetches articles from the NewsAPI
 * @param {string} query - The search query
 * @returns {Promise<Object>} The API response with articles
 */
export const fetchArticles = async (query) => {
  // Calculate dates: from (7 days ago) and to (today)
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  // Format dates as YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const toDate = formatDate(today);
  const fromDate = formatDate(sevenDaysAgo);

  const params = new URLSearchParams({
    q: query,
    apiKey: API_KEY,
    from: fromDate,
    to: toDate,
    pageSize: 100,
    sortBy: "publishedAt",
  });

  try {
    const response = await fetch(`${newsApiBaseUrl}?${params}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === "error") {
      throw new Error(data.message || "Failed to fetch articles");
    }

    return data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};
