module.exports = {
  title: "GeneDocs",
  tagline: 'Documentation website of Genemator\'s Ecosystem: "Genestatic"',
  url: "https://doc.genemator.me",
  baseUrl: "/",
  onBrokenLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "genestatic", // Usually your GitHub org/user name.
  projectName: "serverland", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "GeneDocs",
      logo: {
        alt: "GeneDocs Logo",
        src: "img/logo.svg",
      },
      items: [
        { to: "https://genemator.me", label: "Home", position: "left" },
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
        { to: "blog", label: "Changelog", position: "left" },
        {
          href: "https://github.com/genestatic",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Style Guide",
              to: "docs/",
            },
            {
              label: "Second Doc",
              to: "docs/doc2/",
            },
          ],
        },
        {
          title: "Socials",
          items: [
            {
              label: "Telegram",
              href: "https://t.me/genemator",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/docusaurus",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/genemator",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/genestatic",
            },
          ],
        },
      ],
      copyright: `Copyright © 2017-${new Date().getFullYear()} Genemator, Inc. Genestatic's Ecosystem.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/genemator/serverland/edit/master/docs/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/genemator/serverland/edit/master/docs/blog/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
