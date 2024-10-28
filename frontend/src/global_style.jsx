import { createGlobalStyle } from 'styled-components';

const reset = `
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
`;

export const GlobalStyle = createGlobalStyle`
    ${reset}

    :root {
        --bg-color: #1a1a1a;
        --text-color: #e0e0e0;
        --primary-color: #4CAF50;
        --secondary-color: #2196F3;
        --accent-color: #FF4081;
        --card-bg: #2c2c2c;
        --hover-color: #3c3c3c;
        --error-color: #f44336;
        --success-color: #4CAF50;
    }

    html {
        font-size: 10px;
        box-sizing: border-box;
    }

    *, *:before, *:after {
        box-sizing: inherit;
    }

    body {
        font-family: 'Roboto', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
        font-size: 1.6rem;
        line-height: 1.5;
        background-color: var(--bg-color);
        color: var(--text-color);
    }

    #root {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 1.6rem;
        padding: 2rem;
    }

    .Neighborhood {
        background-color: var(--card-bg);
        border-radius: 8px;
        padding: 1.6rem;
        transition: all 0.3s ease;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        aspect-ratio: 1;

        &:hover {
            background-color: var(--hover-color);
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
    }

    button {
        background-color: var(--primary-color);
        color: white;
        border: none;
        padding: 0.8rem 1.6rem;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: darken(var(--primary-color), 10%);
        }
    }
`;
