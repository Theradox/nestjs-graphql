import axios from 'axios';

(async () => {
  const sampleApiGatewayUrl = 'https://api.sampleapis.com/coffee/hot';

  const result = await axios.get(sampleApiGatewayUrl);
  console.log(result);

  return result;
})();
