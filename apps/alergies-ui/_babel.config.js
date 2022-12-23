module.exports = function (api, options) {
  api.assertVersion(7);
  return {
    presets: [['@nrwl/next/babel', options]],
    plugins: [
      [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      ['istanbul'],
    ],
  };
};
