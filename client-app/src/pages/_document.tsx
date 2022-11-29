import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    const title = 'METAIN - Co-investment Platform';
    const description =
        'Real Estate Investment Trust offer instant liquidity, are safe, offer diversification, and are affordable, too.';
    const keyword = 'METAIN, First REIT NFT, REIFT NFT on Blockchain';
    const image = 'https://i.ibb.co/Qk57GKw/metain-og-image-1.jpg';

    return (
        <Html>
            <Head>
                <title>METAIN - Co-investment Platform</title>
                <link rel="icon" href="/favicon/favicon.ico" />
                <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png" />
                <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png" />
                <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
                <link rel="manifest" href="/favicon/manifest.json" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />

                <meta name="title" content={title} />
                <meta name="description" content={description} />
                <meta name="keywords" content={keyword} />

                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image:url" content={image} />
                <meta property="og:type" content="website" />

                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={image} />
                <meta name="twitter:card" content="summary_large_image" />

                <link href="/font/autoload.css" rel="stylesheet"></link>
            </Head>
            <body>
                <Main />
                <NextScript />

                <span id="loading_backdrop"></span>
            </body>
        </Html>
    );
}
