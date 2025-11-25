# ✨ Donghuaku

![Astro](https://img.shields.io/badge/Astro-B36BFE?style=for-the-badge&logo=astro&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

> A modern web application built with Astro and Tailwind CSS, designed to provide comprehensive information, browsing, and video playback for Donghua (Chinese animation), leveraging an external API.

## ✨ Key Features

*   **Dynamic Donghua Listing & Details:** Explore detailed information for individual Donghua, including episode lists and related content, powered by dynamic routing (`anime/[animeId]`, `episode/[episodeId]`).
*   **Comprehensive Search Functionality:** Easily find specific Donghua titles using an integrated search interface and dedicated search services.
*   **Categorized Browsing & Navigation:** Navigate through Donghua by genre, A-Z lists, ongoing series, completed series, recently added, and scheduled releases, providing multiple ways to discover content.
*   **Integrated Video Player:** Watch Donghua episodes directly within the application using a dedicated video player component.
*   **External API Integration:** Seamlessly fetches Donghua data, episode information, and more from an external API, ensuring up-to-date content.
*   **Pagination Support:** Efficiently browse through large lists of Donghua or episodes with built-in pagination controls.
*   **Responsive User Interface:** Crafted with Tailwind CSS, the application offers a visually appealing and adaptive experience across various devices and screen sizes.
*   **Server-Side Rendering (SSR) & API Routes:** Leverages Astro's server-side capabilities with Node.js and includes custom API endpoints for flexible data handling and optimized performance.
*   **Customizable Configurations:** Manages application-wide settings and data structures through a dedicated configuration file (`animeConfig.ts`).
*   **Download Links:** Provides functionality for users to access download links for episodes.

## 🛠️ Technology Stack

| Category         | Technology               | Notes                                                                                                                                              |
| :--------------- | :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework**    | Astro                    | The primary web framework for building fast, content-focused websites, supporting hybrid rendering.                                                |
| **Styling**      | Tailwind CSS             | A utility-first CSS framework for rapidly building custom designs without leaving your HTML.                                                       |
| **Language**     | TypeScript               | A strongly typed superset of JavaScript, used for enhanced code quality and developer experience.                                                  |
| **Runtime**      | Node.js                  | Used as the server adapter for Astro, enabling server-side rendering and API routes.                                                               |
| **Dependencies** | `@astrojs/node`          | Astro adapter for deploying to Node.js environments.                                                                                               |
|                  | `@astrojs/tailwind`      | Astro integration for seamless Tailwind CSS setup.                                                                                                 |
|                  | `@astrojs/vercel`        | Astro adapter for deploying to Vercel, providing deployment flexibility.                                                                           |
|                  | `astro-seo`              | An Astro integration to help manage SEO-related metadata.                                                                                          |
| **Package Mgr.** | NPM                      | Used for managing project dependencies and scripts.                                                                                                |

## 🏛️ Architecture Overview

The `Donghuaku` project follows a modern component-based architecture leveraging Astro's capabilities for high performance and flexibility.

*   **Component-Driven UI:** The frontend is built using reusable Astro components (`src/components`), organized for specific functionalities like `AnimeDetails`, `VideoPlayer`, `Navbar`, and `Pagination`.
*   **API-Driven Data Fetching:** A dedicated `src/services` layer handles all interactions with external APIs, abstracting data fetching logic and ensuring a clean separation of concerns. This allows components to focus solely on rendering data.
*   **Hybrid Rendering with Astro:** The application utilizes Astro's ability to combine static site generation (SSG) with server-side rendering (SSR). The presence of `@astrojs/node` and dynamic routes in `src/pages` (e.g., `[animeId]`, `[episodeId]`) indicates a dynamic, server-rendered approach for specific content, while static assets are served efficiently.
*   **Routing & Pages:** `src/pages` defines the application's routes, including dynamic routes for individual Donghua, episodes, genres, and an internal `api/server` endpoint for potential server-side logic.
*   **Styling with Tailwind CSS:** A utility-first approach with Tailwind CSS ensures consistent and responsive styling across the application.

## 🚀 Getting Started

Follow these steps to get the project up and running on your local machine.

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Lannnnnzzzzzzzzzzz/donghuaku.git
    cd donghuaku
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev
    ```

    The application should now be accessible at `http://localhost:4321`.

## 📂 File Structure

```
/
├── README.md
├── astro.config.mjs
├── package-lock.json
├── package.json
├── public
│   ├── favicon.png
│   └── images
│       ├── logo.png
│       └── sankadonghub.jpg
├── src
│   ├── components
│   │   ├── AnimeDetails.astro
│   │   ├── AnimeList0.astro
│   │   ├── AnimeList1.astro
│   │   ├── AnimeList2.astro
│   │   ├── AnimeList3.astro
│   │   ├── AnimeList4.astro
│   │   ├── Breadcrumb.astro
│   │   ├── Carousel.astro
│   │   ├── Content.astro
│   │   ├── DownloadLink.astro
│   │   ├── Error.astro
│   │   ├── Footer.astro
│   │   ├── GenreList.astro
│   │   ├── Navbar.astro
│   │   ├── Pagination.astro
│   │   ├── Search.astro
│   │   ├── Sesepuh.astro
│   │   ├── Sidebar.astro
│   │   ├── VideoPlayer.astro
│   │   ├── WidgetTitle.astro
│   │   └── icons
│   │       ├── CoffeIcon.astro
│   │       ├── GithubIcon.astro
│   │       ├── MoonIcon.astro
│   │       ├── PlayIcon.astro
│   │       ├── SearchIcon.astro
│   │       ├── StarIcon.astro
│   │       └── SunIcon.astro
│   ├── configs
│   │   └── animeConfig.ts
│   ├── env.d.ts
│   ├── global.d.ts
│   ├── layouts
│   │   └── Layout.astro
│   ├── pages
│   │   ├── 404.astro
│   │   ├── anime
│   │   │   ├── [animeId]
│   │   │   │   └── index.astro
│   │   │   └── index.astro
│   │   ├── api
│   │   │   └── server
│   │   │       └── [serverId]
│   │   │           └── index.ts
│   │   ├── az-list
│   │   │   └── [letter]
│   │   │       └── index.astro
│   │   ├── batch
│   │   │   ├── [batchId]
│   │   │   │   └── index.astro
│   │   │   └── index.astro
│   │   ├── completed
│   │   │   └── index.astro
│   │   ├── disclaimers
│   │   │   └── index.astro
│   │   ├── episode
│   │   │   ├── [episodeId]
│   │   │   │   └── index.astro
│   │   │   └── index.astro
│   │   ├── genres
│   │   │   ├── [genreId]
│   │   │   │   └── index.astro
│   │   │   └── index.astro
│   │   ├── history
│   │   │   └── index.astro
│   │   ├── index.astro
│   │   ├── ongoing
│   │   │   └── index.astro
│   │   ├── recent
│   │   │   └── index.astro
│   │   ├── schedule
│   │   │   └── index.astro
│   │   └── search
│   │       └── index.astro
│   ├── services
│   │   ├── animeByGenreService.ts
│   │   ├── animeInfoService.ts
│   │   ├── animeService.ts
│   │   ├── azAnimeService.ts
│   │   ├── azListService.ts
│   │   ├── batchInfoService.ts
│   │   ├── batchService.ts
│   │   ├── completedService.ts
│   │   ├── episodeService.ts
│   │   ├── genreService.ts
│   │   ├── homeService.ts
│   │   ├── ongoingService.ts
│   │   ├── recentService.ts
│   │   ├── scheduleService.ts
│   │   └── searchService.ts
│   ├── styles
│   │   └── global.css
│   └── utils
│       ├── convertIdToTitle.ts
│       ├── generateUrlPath.ts
│       └── sanka.ts
├── tailwind.config.mjs
└── tsconfig.json
```

*   **/public:** Contains static assets like images and favicons that are served directly.
*   **/src:** The core source directory for the Astro project.
    *   **/src/components:** Reusable Astro components that form the building blocks of the UI.
    *   **/src/configs:** Holds configuration files, such as `animeConfig.ts`, for application-wide settings.
    *   **/src/layouts:** Defines shared page layouts (`Layout.astro`) to maintain a consistent structure across different pages.
    *   **/src/pages:** Astro pages and routes, including dynamic routes (e.g., `[animeId]`, `[episodeId]`) and API endpoints (`api/server`).
    *   **/src/services:** Contains TypeScript files responsible for data fetching logic and interactions with external APIs.
    *   **/src/styles:** Global CSS files, including the main `global.css` for overall styling.
    *   **/src/utils:** Utility functions and helper modules used throughout the application.
