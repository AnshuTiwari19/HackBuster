function redirectToSpotify() {
    const clientId = 'f06ef14af96649cc9b018c2a79c44caf';
    const redirectUri = 'http://localhost:5500/callback.html';
    
    // Generate a random code verifier
    const generateRandomString = (length) => {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    };

    const codeVerifier = generateRandomString(64);
    localStorage.setItem('code_verifier', codeVerifier);

    // Generate code challenge
    const sha256 = async (plain) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest('SHA-256', data);
    };

    const base64encode = (input) => {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    };

    // Redirect to Spotify authorization page
    sha256(codeVerifier)
        .then(hashed => {
            const codeChallenge = base64encode(hashed);
            const scope = 'user-read-private user-read-email';
            const authUrl = new URL("https://accounts.spotify.com/authorize");
            
            const params = {
                response_type: 'code',
                client_id: clientId,
                scope: scope,
                code_challenge_method: 'S256',
                code_challenge: codeChallenge,
                redirect_uri: redirectUri,
            };
            
            authUrl.search = new URLSearchParams(params).toString();
            window.location = authUrl.toString();
        });
}

// Get user profile data
const token = localStorage.getItem('access_token');

fetch('https://api.spotify.com/v1/me', {
    headers: { Authorization: 'Bearer ' + token }
})
.then(res => res.json())
.then(data => console.log(data));