const { _200, _400 } = require('../common/api_responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {

  console.log("event.pathParameters", event.pathParameters);

  const { ID } = event.pathParameters || {};
  const user = JSON.parse(event.body);

  user.ID = ID

  const newUser = await Dynamo
    .write(user, tableName)
    .catch(e => {
      console.log("error creating user", e);
      return null;
    });
  
    if (!newUser) {
      return _400({ message: "Failed to write user" });
    }
  
    return _200({ newUser }); 
}

