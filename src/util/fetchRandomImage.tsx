export const fetchRandomImage = async (): Promise<string> => {
    try {
        const response = await fetch('https://picsum.photos/200');
        // Lorem Picsum redirects to a random image, so we get the final URL
        return response.url;
    } catch (error) {
        console.error('Failed to fetch random image:', error);
        return ''; // Return an empty string or a default image URL if there's an error
    }
};
