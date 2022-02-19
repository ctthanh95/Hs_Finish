import axios from 'axios';
const API_KEY = 'IWYZLPnN0IUYRqwx52kYmFYWdvKMnzCgcOYNl3w45Q4';
const getAddress = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${API_KEY}&mode=retrieveAddresses&prox=${latitude},${longitude}`,
    );
    let rs = response?.data?.Response?.View[0]?.Result[0]?.Location?.Address;
    return rs;
  } catch (error) {
    // console.error(error);
  }
};

export {getAddress};
