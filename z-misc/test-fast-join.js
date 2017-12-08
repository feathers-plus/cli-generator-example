
const { fastJoin } = require('feathers-hooks-common');
const fastJoinResolvers = require('./hooks/fast-join-resolvers');

module.exports = async function testFastJoin(app) {
  const fastJoinSchemas = fastJoinResolvers(app);
  //inspector('\n.testFastJoin: schemas', Object.keys(fastJoinSchemas));

  //await runFastJoin(fastJoinSchemas.user, 'user', { uuid: 1 });
  await runFastJoin(fastJoinSchemas.post, 'post', { uuid: 90 }, { author: { fullName: true }});

  async function runFastJoin(schema, name, query = {}, shape) {
    inspector('\n=============================\n.runFastJoin: schema', schema);
    inspector('.shape', shape);

    const context = {
      method: 'find', params: {},
      result: await app.service(name).find({ query })
    };
    inspector('.starting result', context.result);

    try {
      const newContext = await fastJoin(schema, shape)(context);
      inspector('\n.runFastJoin: ending result', (newContext || {}).result)
    } catch(err) {
      console.log(err);
    }
  }
};

const { inspect } = require('util');
function inspector(desc, obj, depth = 5) {
  console.log(desc);
  console.log(inspect(obj, { depth, colors: true }));
}
