CREATE DATABASE schittscreek;

CREATE USER 'mayor'@'localhost' IDENTIFIED
WITH mysql_native_password BY 'AL3XI5!';

GRANT ALL ON schittscreek.* TO 'mayor'@'localhost';

USE schittscreek;

CREATE TABLE character
(
  id INT
  auto_increment,
  name VARCHAR
  (255),
  occupation VARCHAR
  (255),
  quote VARCHAR
  (255),
  playedBy VARCHAR
  (255),
  createdAt DATETIME DEFAULT NOW
  (),
  updatedAt DATETIME DEFAULT NOW
  () ONUPDATE NOW
  (),
  deletedAt DATETIME,
  PRIMARY KEY
  (id)
);


  INSERT INTO characters
    (name, occupation, quote, playedBy)
  VALUES
    ('Johhny Rose', 'Co-owner Rosebud Motel', 'Tweet us on Facebook!', 'Eugene Levy');
  INSERT INTO characters
    (name, occupation, quote, playedBy)
  VALUES
    ('Moira Rose', 'Actress', 'One must champion oneself and say I am ready for this!', 'Catherine OHara');
  INSERT INTO characters
    (name, occupation, quote, playedBy)
  VALUES
    ('David Rose', 'Owner of Rose Apothecary', 'It\'
  s my turn to take a selfish!', 'Dan Levy');
  INSERT INTO characters (name, occupation, quote, playedBy) VALUES ('Alexis Rose', 'PR for Moira Rose', 'Hide your diamonds, hide your exes...I\'m a little bit Alexis.', 'Annie Murphy');
  INSERT INTO characters
    (name, occupation, quote, playedBy)
  VALUES
    ('Stevie Budd', 'Co-owner of Rosebud Motel', 'I\'
  m only doing this because you called me rude and I take that as a compliment.', 'Emily Hampshire');
  INSERT INTO characters (name, occupation, quote, playedBy) VALUES ('Roland Schitt', 'Mayor of Schitt\'s Creek', 'If you\’re looking for an ass to kiss, it’s mine.', 'Chris Elliott');
  INSERT INTO characters
    (name, occupation, quote, playedBy)
  VALUES
    ('Jocelyn Schitt', 'History Teacher', 'That was...different.', 'Jennifer Robertson');
  INSERT INTO characters
    (name, occupation, quote, playedBy)
  VALUES
    ('Mutt Schitt', 'Unemployed', '.', 'Tim Rozon');