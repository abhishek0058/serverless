const { _200, _400 } = require('../common/api_responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {

  console.log("event.pathParameters", event.pathParameters);

  const { ID } = event.pathParameters || {};

  if (!ID) {
    return _400({ message: "Missing ID" });
  }

  const user = await Dynamo
    .get(ID, tableName)
    .catch(e => {
      console.log("error in Dynamo.get", e);
      return null;
    });

  if (!user) {
    return _400({ message: "User not found" });
  }

  return _200({ user }); 
}

