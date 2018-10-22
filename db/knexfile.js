module.exports = {
  development: {
    client: `pg`,
    connection: `postgres://localhost/blogs`
  },
  production: {
    client: `pg`,
    connection: `postgres://tyrpcaamiymtoh:c62ebd8d2d832c79a808e8629e3dc7886cae9fa82de705101ea8755b1bce7544@ec2-184-72-234-230.compute-1.amazonaws.com:5432/d5pqt0csrlasm1`
  }
}