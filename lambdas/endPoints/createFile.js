const { _200, _400 } = require('../common/api_responses');
const S3  = require('../common/S3');

const bucketName = process.env.bucketName;

exports.handler = async event => {

  console.log("event.pathParameters", event.pathParameters);

  const { fileName } = event.pathParameters || {};

  if (!fileName) {
    return _400({ message: "Missing filename" });
  }

  const data = JSON.parse(event.body);

  const newData = await S3
    .write(data, fileName, bucketName)
    .catch(e => {
      console.log("error while writing data in S3", e);
      return null;
    });
  
    if (!newData) {
      return _400({ message: "Failed to write data in S3" });
    }
  
    return _200({ newData }); 
}

