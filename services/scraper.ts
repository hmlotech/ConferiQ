
/**
 * Service to handle fetching of external content, bypassing CORS restrictions
 * using a public proxy.
 */
export const ScraperService = {
    /**
     * Fetches the HTML content of a given URL using allorigins.win proxy.
     * @param url The target URL to scrape
     * @returns The raw HTML string
     */
    async fetchUrl(url: string, useFallback = true): Promise<string> {
        try {
            // Using allorigins.win as a free CORS proxy
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
            const response = await fetch(proxyUrl);

            if (!response.ok) {
                console.warn(`Primary proxy failed with status: ${response.status}. Trying fallback...`);
                if (useFallback) return this.fetchUrlFallback(url);
                throw new Error(`Failed to fetch content: ${response.statusText}`);
            }

            const data = await response.json();
            if (!data.contents) {
                if (useFallback) return this.fetchUrlFallback(url);
                throw new Error('No content returned from proxy');
            }

            return this.cleanHtml(data.contents);
        } catch (error) {
            console.error('Primary Scraper Error:', error);
            if (useFallback) return this.fetchUrlFallback(url);
            throw error;
        }
    },

    async fetchUrlFallback(url: string): Promise<string> {
        try {
            console.log(`Using fallback proxy for: ${url}`);
            const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
            const response = await fetch(proxyUrl);

            if (!response.ok) {
                throw new Error(`Fallback scraper failed: ${response.status}`);
            }

            const html = await response.text();
            return this.cleanHtml(html);
        } catch (error) {
            console.error('Fallback Scraper Error:', error);
            throw new Error("Extraction failed. Please try 'Paste Agenda' fallback.");
        }
    },

    /**
     * Basic cleanup of HTML to reduce token usage for AI processing.
     * Removes scripts, styles, and comments.
     */
    cleanHtml(html: string): string {
        // Remove script tags and their content
        let clean = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gmi, "");
        // Remove style tags and their content
        clean = clean.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gmi, "");
        // Remove surplus whitespace
        clean = clean.replace(/\s+/g, " ").trim();
        return clean;
    }
};
