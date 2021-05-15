const AWS = require('aws-sdk');

const s3Client = new AWS.S3();

const S3 = {
  async get(fileName, bucketName) {
    try {

      if (!fileName) {
        throw Error(`fileName is missing: ${fileName}`);
      }

      const params = {
        Bucket: bucketName, 
        Key: fileName
      };

      let data = await s3Client.getObject(params).promise();

      console.log("data", data);

      if (!data) {
        throw Error(`Error while reading data from S3, fileName: ${fileName}, bucketName: ${bucketName}`);
      }

      if (fileName.slice(fileName.length - 4, fileName.length) === "json") {
        data = data.Body.toString();
      }

      return data;

    }
    catch (error) {
      console.log("S3.get", error);
      throw error;
    }
  },
  async write(data, fileName, bucketName) {
    try {

      if (!fileName) {
        throw Error(`fileName is missing: ${fileName}`);
      }

      const params = {
        Bucket: bucketName, 
        Body: JSON.stringify(data),
        Key: fileName
      };

      const newData = await s3Client.putObject(params).promise();

      console.log("newData", newData);

      if (!newData) {
        throw Error(`Error while putting data in S3, fileName: ${fileName}, bucketName: ${bucketName}`);
      }

      return newData;

    }
    catch (error) {
      console.log("S3.write", error);
      throw error;
    }
  }
}


module.exports = S3;