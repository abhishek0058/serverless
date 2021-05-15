const { _200, _400 } = require('../common/api_responses');

exports.handler = async event => {

  console.log("event.pathParameters", event.pathParameters);

  const { ID } = event.pathParameters || {};

  console.log("ID", ID);

  if (!ID) {
    console.log("1");
    return _400({ message: "Missing ID" });
  }

  if (!data[ID]) {
    console.log("2");
    return _400({ message: "Invalid ID" });
  }

  console.log("3");

  return _200(data[ID]);
}

const data = {
  "123": { name: 'abhishek', age: 25, job: 'engineer' }
};