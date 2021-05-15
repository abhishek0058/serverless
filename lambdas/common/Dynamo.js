const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
  async get(ID, tableName) {
    try {
      const params = {
        TableName: tableName,
        Key: {
          ID
        }
      };

      const data = await documentClient.get(params).promise();

      console.log("data", data);

      if (!data || !data.Item) {
        throw Error(`Player not found, ID: ${ID}, ${tableName}`);
      }

      return data.Item;

    } catch (error) {
      console.log("Dynamo.get", error);
      throw error;
    }
  },
  async write(data, tableName) {
    try {

      if (!data.ID) {
        throw Error(`New user dont have, ID: ${data.ID}, ${tableName}`);
      }

      const params = {
        TableName: tableName, 
        Item: data
      };

      const res = await documentClient.put(params).promise();

      console.log("res", res);

      if (!res) {
        throw Error(`Error while creating user, ID: ${data.ID}, ${tableName}`);
      }

      return data;

    }
    catch (error) {
      console.log("Dynamo.put", error);
      throw error;
    }
  }
}


module.exports = Dynamo;