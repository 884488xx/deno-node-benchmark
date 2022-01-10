const axios = require('axios');

module.exports = async (flowConfig, url) => {
  try {
    // SELECT ALL TO START
    await axios({
      method: flowConfig.get.method.toLowerCase(),
      url: `${url}${flowConfig.get.path}`,
    });
    // ADD NEW RECORD
    const { data: { uid } } = await axios({
      method: flowConfig.create.method.toLowerCase(),
      url: `${url}${flowConfig.create.path}`,
      data: flowConfig.create.body,
    });;
    // SELECT ALL
    await axios({
      method: flowConfig.get.method.toLowerCase(),
      url: `${url}${flowConfig.get.path}`,
    });
    // DELETE INSERTED RECORD
    await axios({
      method: flowConfig.delete.method.toLowerCase(),
      url: `${url}${flowConfig.delete.path}/${uid}`,
    });
  } catch (error) {
    console.error('Failed to exec flow', error);
    throw error;
  }
};