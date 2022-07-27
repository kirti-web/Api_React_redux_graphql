const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const mysql = require('mysql');
const cors = require('cors')

const app = express();
app.use(cors())

const schema = buildSchema(`
  type Post {
    id: String
    title: String
    description: String
    status: String
  }
  type Query {
    getPosts: [Post],
    getPostInfo(id: Int) : Post
  }
  type Mutation {
    updatePostInfo(id: Int, title: String, status: String, description: String) : Boolean
    createPost(title: String, status: String, description: String) : Boolean
    deletePost(id: Int) : Boolean
  }
`);

const queryDB = (req, sql, args) => new Promise((resolve, reject) => {
    req.mysqlDb.query(sql, args, (err, rows) => {
        if (err)
            return reject(err);
        rows.changedRows || rows.affectedRows || rows.insertId ? resolve(true) : resolve(rows);
    });
});

const root = {
  getPosts: (args, req) => queryDB(req, "select * from posts").then(data => data),
  getPostInfo: (args, req) => queryDB(req, "select * from posts where id = ?", [args.id]).then(data => data[0]),
  updatePostInfo: (args, req) => queryDB(req, "update posts SET ? where id = ?", [args, args.id]).then(data => data),
  createPost: (args, req) => queryDB(req, "insert into posts SET ?", args).then(data => data),
  deletePost: (args, req) => queryDB(req, "delete from posts where id = ?", [args.id]).then(data => data)
};

app.use((req, res, next) => {
  req.mysqlDb = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'postdb'
  });
  req.mysqlDb.connect();
  next();
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');
