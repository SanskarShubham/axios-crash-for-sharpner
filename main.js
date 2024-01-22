// GET REQUEST
//
axios.defaults.headers.common['X-Auth-Token'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
const baseUrl = "https://jsonplaceholder.typicode.com/todos";

function getTodos() {
  axios
    .get(baseUrl, { params: { _limit: 5,timeout:5000 } })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// POST REQUEST
function addTodo() {
  axios
    .post(baseUrl, {
      title: "comelete crash course ",
      completed: false,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  axios
    .patch(`${baseUrl}/1`, {
      title: "comeleted crash course ",
      completed: true,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// DELETE REQUEST
function removeTodo() {
  axios
    .delete(`${baseUrl}/1`, {
      title: "comeleted crash course ",
      completed: true,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// SIMULTANEOUS DATA
function getData() {
  axios
    .all([
      axios.get(baseUrl, { params: { _limit: 5 } }),
      axios.get("https://jsonplaceholder.typicode.com/posts", {
        params: { _limit: 5 },
      }),
    ])
    .then(
      axios.spread((todos, posts) => {
        // console.log(res[0]);
        // console.log(res[1]);
        showOutput(posts);
      })
    )
    .catch((err) => console.log(err));
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers:{
      'content-type':'application/json',
      Authorization: 'khufiyaToken'
    }
  }

  axios
    .post(baseUrl, {
      title: "comelete crash course ",
      completed: false,
    },config)
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method :'post',
    url :baseUrl,
    data:{
      title:"hello world"
    },
    transformResponse : axios.defaults.transformResponse.concat(data =>{
      data.title =data.title.toUpperCase();
      return data;
    })
  }
  axios(options).then((res) => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  axios
    .get(baseUrl, { params: { _limit: 5 } })
    .then((res) => showOutput(res))
    .catch((err) => {
      if (err.response.status === 404) {
        console.log('page not found');
      }else if (err.request) {
        console.log(err.request);
      }else{
        console.log(err.message);
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source(); 
  axios
    .get(baseUrl, { params: { _limit: 5 ,cancelToken: source.token} })
    .then((res) => showOutput(res))
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log('err ',err.message);
      }
    });
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${config.url
      } at ${new Date().getTime()}`
    );
    return config;
  },
  (err) => {
    return new Promise.reject(err);
  }
);
// AXIOS INSTANCES
axios.create({
  baseURL:'https://jsonplaceholder.typicode.com/'
});
// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
