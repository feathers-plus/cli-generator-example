
// Feathers
const socket = io(serverUrl);
const feathersClient = feathers()
  .configure(feathers.socketio(socket))
  .configure(feathers.authentication({
    storage: window.localStorage
  }));

const login = async () => {
  try {
    await feathersClient.authenticate({
      strategy: 'local',
      email: 'john@gmail.com',
      password: 'john'
    });

    console.log('Authenticated.');
    runEl.value = 'Run query';
    runEl.disabled = false;
  } catch(err) {
    throw err;
  }
};

login(); // do not wait for it to finish

// GraphQL
const graphql = feathersClient.service('/graphql'); // eslint-disable-line

const queries = {
  findUser: `{
  findUser(${qlParams({ query: { uuid: { __lt: 100000 } } })}) {
    uuid
    firstName
    lastName
    fullName
    email
    posts(${qlParams({ query: { draft: 0 } })}) {
      uuid
      authorUuid
      body
      draft
    }
    comments {
      uuid
      authorUuid
      postUuid
      body
      archived
    }
    followed_by {
      follower {
        uuid
        fullName
      }
    }
    following {
      followee {
        uuid
        fullName
      }
    }
    likes {
      uuid
      authorUuid
      commentUuid
      author {
        uuid
        firstName
        lastName
        fullName
        email
      }
      comment {
        uuid
        authorUuid
        postUuid
        body
        archived
      }
    }
  }
}`,

  getUser: `{
  getUser(${qlParams({ key: 1 })}) {
    uuid
    firstName
    lastName
    fullName
    email
    posts(${qlParams({ query: { draft: 0 } })}) {
      uuid
      authorUuid
      body
      draft
    }
    comments {
      uuid
      authorUuid
      postUuid
      body
      archived
    }
    followed_by {
      follower {
        uuid
        fullName
      }
    }
    following {
      followee {
        uuid
        fullName
      }
    }
    likes {
      uuid
      authorUuid
      commentUuid
      author {
        uuid
        firstName
        lastName
        fullName
        email
      }
      comment {
        uuid
        authorUuid
        postUuid
        body
        archived
      }
    }
  }
}`,

  findComment: `{
  findComment(${qlParams({ query: { uuid: { __lt: 100000 } } })}) {
    uuid
    authorUuid
    postUuid
    body
    archived
    author {
      uuid
      firstName
      lastName
      fullName
      email
    }
    likes {
      author {
        uuid
        firstName
        lastName
        fullName
        email
      }
      comment {
        uuid
        authorUuid
        postUuid
        body
        archived
      }
    }
  }
}`,

  getComment: `{
  getComment(${qlParams({ key: 10 })}) {
    uuid
    authorUuid
    postUuid
    body
    archived
    author {
      uuid
      firstName
      lastName
      fullName
      email
    }
    likes {
      author {
        uuid
        firstName
        lastName
        fullName
        email
      }
      comment {
        uuid
        authorUuid
        postUuid
        body
        archived
      }
    }
  }
}`,

  findPost: `{
  findPost(${qlParams({ query: { uuid: { __lt: 100000 } } })}) {
    uuid
    authorUuid
    body
    author {
      uuid
      firstName
      lastName
      fullName
      email
    }
    comments {
      uuid
      authorUuid
      postUuid
      body
      archived
    }
  }
}`,

  getPost: `{
  getPost(${qlParams({ key: 90 })}) {
    uuid
    authorUuid
    body
    author {
      uuid
      firstName
      lastName
      fullName
      email
    }
    comments {
      uuid
      authorUuid
      postUuid
      body
      archived
    }
  }
}`,

  findLike: `{
  findLike(${qlParams({ query: { uuid: { __lt: 100000 } } })}) {
    uuid
    authorUuid
    commentUuid
    author {
      uuid
      firstName
      lastName
      fullName
      email
    }
    comment {
      uuid
      authorUuid
      postUuid
      body
      archived
    }
  }
}`,

  getLike: `{
  getLike(${qlParams({ key: 100 })}) {
    uuid
    authorUuid
    commentUuid
    author {
      uuid
      firstName
      lastName
      fullName
      email
    }
    comment {
      uuid
      authorUuid
      postUuid
      body
      archived
    }
  }
}`,

  findRelationship: `{
  findRelationship(${qlParams({ query: { uuid: { __lt: 100000 } } })}) {
    uuid
    followerUuid
    followeeUuid
    follower {
      uuid
      email
      firstName
      lastName
      fullName
    }
    followee {
      uuid
      email
      firstName
      lastName
      fullName
    }
  }
}`,

  getRelationship: `{
  getRelationship(${qlParams({ key: 80 })}) {
    uuid
    followerUuid
    followeeUuid
    follower {
      uuid
      email
      firstName
      lastName
      fullName
    }
    followee {
      uuid
      email
      firstName
      lastName
      fullName
    }
  }
}`
};

// DOM
const serverIp = document.getElementById('server-ip');
const queryEl = document.getElementById('query');
const runEl = document.getElementById('run');
const resultsEl = document.getElementById('results');
var resultsCheckEl = document.getElementById('results-check');

setOnclickHandlers('queries', function (ev) {
  selectedQuery = ev.target.value;
  queryEl.value = queries[selectedQuery];
});

setOnclickHandlers('run', function () {
  resultsEl.innerHTML = 'Waiting for response.';

  console.log('========== query:\n', queryEl.value);

  graphql.find({ query: { query: queryEl.value } })
    .catch(err => err)
    .then(response => {
      console.log('========== response:\n', response);
      var str = JSON.stringify(response, null, '  ');
      var nullLoc = str.indexOf('null');

      resultsEl.innerHTML = str;
      resultsCheckEl.innerHTML = nullLoc !== -1
        ? `"null" found at char ${nullLoc} near: ${str.substring(nullLoc - 20, nullLoc + 20)}` : '';
    })
    .catch(err => console.log('Error occurred:', err));
});

// Initialize

serverIp.innerHTML = 'Server is at ' + serverUrl;
var selectedQuery = 'findUser';
queryEl.innerHTML = queries[selectedQuery];
resultsCheckEl.innerHTML = '';

// Helpers

function setOnclickHandlers (name, func) {
  var els = document.getElementsByName(name);
  for (var i = 0, len = els.length; i < len; i += 1) {
    els[i].onclick = func;
  }
}

function stringify (obj, spacer = ' ', separator = ', ', leader = '{', trailer = '}') {
  if (typeof obj !== 'object' || Array.isArray(obj)) {
    return JSON.stringify(obj);
  }

  const str = Object
    .keys(obj)
    .map(key => `${key}:${spacer}${stringify(obj[key], spacer, separator)}`)
    .join(', ');

  return `${leader}${str}${trailer}`;
}

function qlParams (obj) {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Expected object. (qlParams)');
  }

  return stringify(obj, undefined, undefined, '', '');
}
