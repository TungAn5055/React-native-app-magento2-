export const magentoOptions = {
  url: 'http://magento233.com/', // make sure you have trail slash in the end
  home_cms_block_id: '15',
  store: 'default', // store code // Stores > All Stores > Store View > Code
  authentication: {
    integration: {
      access_token: 'iacftonhj6nbp33iccuewd17rdul0hfc',
    },
  },
  reviewEnabled: false, // set true ONLY if you install https://github.com/troublediehard/mma-customapi on the magento backend
};
