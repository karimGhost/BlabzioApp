/**
 * @type {import('gatsby').GatsbyConfig}
 */

module.exports = {

  pathPrefix: '/BlabzioApp',




  siteMetadata: {

    title: `BLAB`,

    siteUrl: `https://www.yourdomain.tld`,

  },

  plugins: [




     'gatsby-plugin-sass', 










  ],

  flags: {

    DEV_SSR: false,

  }

}










/*



 {

      resolve: 'gatsby-plugin-sass', 

    },

    {

     // resolve: 'gatsby-plugin-manifest',

     

      options: {

        icon: 'src/images/icon.png',

      },

   /*

    },

    'gatsby-plugin-mdx',

    {

      resolve: 'gatsby-source-filesystem',

      options: {

        name: 'pages', 

        path: './src/pages/',

      },

      __key: 'pages',

   */

  /*  },



    

  ],

  flags: {

   DEV_SSR: true,

     FAST_DEV: true,

  PRESERVE_FILE_DOWNLOAD_CACHE: true,

   PRESERVE_WEBPACK_CACHE: true,

   PARALLEL_SOURCING: true,

    ECT_NODE_MUTATIONS: true,

  PARTIAL_HYDRATION: true,

   DETECT_NODE_MUTATIONS: true

 },

*/
