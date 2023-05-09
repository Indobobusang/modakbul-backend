-- migrate:up
CREATE TABLE posts (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  content VARCHAR(2000),
  user_id INT,
  post_category_id INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE posts;
