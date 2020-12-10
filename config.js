module.exports = {
    database: {
        name: process.env.DB_NAME,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS
    },
    oidc: {
        publicKey: "pubkey.pem",
        audience: 'http://localhost:3000',
        issuer: 'https://alexmoras.eu.auth0.com/',
        algorithms: ['RS256']
    }
}