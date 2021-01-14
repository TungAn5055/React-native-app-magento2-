export const magentoOptions = {
  url: 'https://vietship.de/', // make sure you have trail slash in the end
  home_cms_block_id: '15',
  media_base: 'media/catalog/product',
  store: 'default', // store code // Stores > All Stores > Store View > Code
  authentication: {
    integration: {
      access_token: '4kmdxwstu5562ykoz96nwa8ehroau1ms',
    },
  },
  reviewEnabled: false, // set true ONLY if you install https://github.com/troublediehard/mma-customapi on the magento backend
};
