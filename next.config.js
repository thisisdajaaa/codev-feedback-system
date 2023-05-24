/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["src"],
  },

  reactStrictMode: true,

  images: {
    domains: ["lh3.googleusercontent.com"],
  },

  swcMinify: true,

  pageExtensions: ["page.ts", "page.tsx", "api.ts"],

  // SVGR
  webpack(config, { webpack }) {
    config.plugins.push(
      new webpack.IgnorePlugin({ resourceRegExp: /\/__test__\// })
    );

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
