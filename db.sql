CREATE TABLE Users (
  id    SERIAL,
  role VARCHAR(255),
  first_name VARCHAR(255),
  last_name  VARCHAR(255),
  email      VARCHAR(255),
  password   VARCHAR(255),
  UNIQUE (email),
  CONSTRAINT pk_user PRIMARY KEY (id,email)
);

CREATE TABLE Shop_items (
  id SERIAL,
  item_name VARCHAR(255),
  stock_ammount NUMERIC,
  CONSTRAINT pk_Shop_items PRIMARY KEY (id)
);