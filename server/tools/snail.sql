create table books(
  id int not null auto_increment primary key,
  isbn varchar(20) not null,
  openid varchar(50) not null,
  title varchar(100) not null,
  image varchar(200),
  alt varchar(200) not null,
  publisher varchar(100) not null,
  summary varchar(1000) not null,
  price varchar(50),
  rate float,
  tags varchar(100),
  authors varchar(50)
);