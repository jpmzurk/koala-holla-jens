CREATE TABLE bears(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (250) NOT NULL,
	"gender" VARCHAR (10) NOT NULL,
	"age" INT,
	"ready_to_transfer" VARCHAR (10) DEFAULT 'No',
	"notes" VARCHAR (250) NOT NULL
);

INSERT INTO "bears" ("name", "gender", "age", "notes") VALUES ('Scotty', 'Male', '4', 'Born in Guatemala');
INSERT INTO "bears" ("name", "gender", "age", "ready_to_transfer","notes") VALUES ('Jean', 'Female', '5', 'Yes', 'Allergic to lots of lava');
INSERT INTO "bears" ("name", "gender", "age", "notes") VALUES ('Ororo', 'Female', '7', 'Loves listening to Nina Simone');
INSERT INTO "bears" ("name", "gender", "age", "notes") VALUES ('Logan', 'Male', '15', 'Loves the sauna');
INSERT INTO "bears" ("name", "gender", "age", "notes") VALUES ('Charlie', 'Male', '9', 'Favorite band is Radiohead');
INSERT INTO "bears" ("name", "gender", "age", "notes") VALUES ('Betsy', 'Female', '4', 'Has iguana farm');
