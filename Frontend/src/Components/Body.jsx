import { useState } from "react";
import axios from "axios";

function Body() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("shorten");
  const [analyticsShortUrl, setAnalyticsShortUrl] = useState("");
  const [analyticsData, setAnalyticsData] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsError, setAnalyticsError] = useState("");

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  console.log("API BASE:", import.meta.env.VITE_API_BASE_URL);
  const handleShorten = async () => {
    if (!longUrl.trim()) {
      setError("Please enter a valid URL");
      setShortUrl("");
      return;
    }

    try {
      setError("");
      setLoading(true);
      const res = await axios.post(`${apiUrl}/url`, {
        url: longUrl,
      });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Try again!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGetAnalytics = async () => {
    if (!analyticsShortUrl.trim()) {
      setAnalyticsError("Please enter a short URL");
      setAnalyticsData(null);
      return;
    }

    try {
      setAnalyticsError("");
      setAnalyticsLoading(true);
      
      const shortId = analyticsShortUrl.split("/").pop();
      console.log(shortId)
      
      const res = await axios.get(`${apiUrl}/${shortId}/analytics`);
      setAnalyticsData(res.data.data);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setAnalyticsError(err.response.data.message);
      } else {
        setAnalyticsError("Failed to fetch analytics. Please check the URL and try again!");
      }
      setAnalyticsData(null);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-8">
      <div className="bg-white shadow-xl p-8 rounded-2xl w-96">
        <h1 className="text-2xl font-bold mb-6 text-blue-600 text-center">
          🔗 URL Shortener
        </h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("shorten")}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
              activeTab === "shorten"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Shorten
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
              activeTab === "analytics"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Analytics
          </button>
        </div>

        {/* Shorten Tab */}
        {activeTab === "shorten" && (
          <div>
            <input
              type="text"
              placeholder="Enter long URL..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
            />

            <button
              onClick={handleShorten}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-400"
            >
              {loading ? "Shortening..." : "Shorten URL"}
            </button>

            {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}

            {shortUrl && (
              <div className="mt-4">
                <p className="text-gray-700 font-medium">Your short link:</p>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline break-all text-sm"
                >
                  {shortUrl}
                </a>
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div>
            <input
              type="text"
              placeholder="Enter short URL..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={analyticsShortUrl}
              onChange={(e) => setAnalyticsShortUrl(e.target.value)}
            />

            <button
              onClick={handleGetAnalytics}
              disabled={analyticsLoading}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-green-400"
            >
              {analyticsLoading ? "Loading..." : "Get Analytics"}
            </button>

            {analyticsError && (
              <p className="text-red-500 mt-3 text-sm">{analyticsError}</p>
            )}

            {analyticsData && (
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 font-semibold mb-3">Analytics Data:</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Original URL:</span>
                    <a
                      href={analyticsData.full_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline break-all max-w-xs text-right"
                    >
                      {analyticsData.full_url}
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Short ID:</span>
                    <span className="font-medium">{analyticsData.short_url}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Clicks:</span>
                    <span className="font-bold text-lg text-blue-600">
                      {analyticsData.clicks}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span className="text-sm">
                      {new Date(analyticsData.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="text-sm">
                      {new Date(analyticsData.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Body;
