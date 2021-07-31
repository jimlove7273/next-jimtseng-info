-- Up
CREATE TABLE Blogs (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	title: TEXT,
	imgUrl: TEXT,
	category: TEXT,
	document: TEXT,
	documentdate: TEXT
);

CREATE TABLE Portfolios (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	title: TEXT,
	imgUrl: TEXT,
	webUrl: TEXT,
	siteowner: TEXT,
	content: TEXT,
	completed: TEXT,
	technology: TEXT
);

-- INSERT INTO Autorec (servicedate, services, mileage, notes) VALUES ('2020-03-15', 'Scheduled Service', '51077', '');
-- INSERT INTO Userlist (name, username, password) VALUES ('Jim Tseng', 'jtseng', '123456');


-- Down
DROP TABLE Blogs;
DROP TABLE Portfolios;