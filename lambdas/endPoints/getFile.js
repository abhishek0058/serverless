const { _200, _400 } = require('../common/api_responses');
const S3  = require('../common/S3');

const bucketName = process.env.bucketName;

exports.handler = async event => {

  console.log("event.pathParameters", event.pathParameters);

  const { fileName } = event.pathParameters || {};

  if (!fileName) {
    return _400({ message: "Missing filename" });
  }

  const file = await S3
    .get(fileName, bucketName)
    .catch(e => {
      console.log("error while reading file from S3", e);
      return null;
    });
  
    if (!file) {
      return _400({ message: "Failed to read file from S3" });
    }
  
    return _200({ file }); 
}

