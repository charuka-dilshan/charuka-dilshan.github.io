# Creating and Using Databases & Tables in MySQL (SQL Part 04)


<!--more-->

> **Academic Note:** This master study guide covers Lecture 04 notes, detailing how to create databases, structure tables with correct data types, inspect schemas, delete relations, and insert records manually or via bulk text files.

---

## Module 1: Managing Databases

Before creating tables or storing records, you must create and select a working database on your MySQL server.

### 1.1 Viewing Existing Databases

To check which databases currently exist on the server, use the `SHOW DATABASES` statement:

```sql
mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.00 sec)
```

### 1.2 Creating a New Database (`CREATE DATABASE`)

To create a new database named `tceusl`, execute:

```sql
mysql> CREATE DATABASE tceusl;
```

### 1.3 Selecting a Database (`USE`)

To activate and switch your working context to the newly created database, use the `USE` command:

```sql
mysql> USE tceusl;
Database changed
```

---

## Module 2: Creating Tables

Once a database is selected, you can view existing tables using `SHOW TABLES;`. If the result is `Empty set`, no tables have been created yet.

### 2.1 Designing the `students` Table Schema

We will create a table named `students` with the following attributes and data types:

- `index_no`: `VARCHAR(20)`
- `fname`: `VARCHAR(20)`
- `lname`: `VARCHAR(20)`
- `address`: `VARCHAR(30)`
- `sex`: `CHAR(1)`
- `birth_date`: `DATE`
- `dept`: `VARCHAR(5)`
- `campus`: `VARCHAR(5)`
- `tp_no`: `VARCHAR(15)`

> **Data Type Note:** `VARCHAR` is used for variable-length character strings, `CHAR(1)` is fixed-length and suitable for single characters such as `'m'` or `'f'`, and `DATE` is used for date values in the format `YYYY-MM-DD`.

### 2.2 Executing `CREATE TABLE`

```sql
mysql> CREATE TABLE students (
    -> index_no VARCHAR(20),
    -> fname VARCHAR(20),
    -> lname VARCHAR(20),
    -> address VARCHAR(30),
    -> sex CHAR(1),
    -> birth_date DATE,
    -> dept VARCHAR(5),
    -> campus VARCHAR(5),
    -> tp_no VARCHAR(15)
    -> );
Query OK, 0 rows affected (0.17 sec)
```

### 2.3 Verifying Table Creation (`SHOW TABLES`)

```sql
mysql> SHOW TABLES;
+------------------+
| Tables_in_tceusl |
+------------------+
| students         |
+------------------+
1 row in set (0.02 sec)
```

### 2.4 Inspecting Table Structure (`DESCRIBE`)

To view the field types, nullability, keys, default values, and extra information of your table, use the `DESCRIBE` command:

```sql
mysql> DESCRIBE students;
+------------+-------------+------+-----+---------+-------+
| Field      | Type        | Null | Key | Default | Extra |
+------------+-------------+------+-----+---------+-------+
| index_no   | varchar(20) | YES  |     | NULL    |       |
| fname      | varchar(20) | YES  |     | NULL    |       |
| lname      | varchar(20) | YES  |     | NULL    |       |
| address    | varchar(30) | YES  |     | NULL    |       |
| sex        | char(1)     | YES  |     | NULL    |       |
| birth_date | date        | YES  |     | NULL    |       |
| dept       | varchar(5)  | YES  |     | NULL    |       |
| campus     | varchar(5)  | YES  |     | NULL    |       |
| tp_no      | varchar(15) | YES  |     | NULL    |       |
+------------+-------------+------+-----+---------+-------+
9 rows in set (0.50 sec)
```

---

## Module 3: Deleting Tables (`DROP TABLE`)

To completely delete an entire table and all its stored records, use the `DROP TABLE` statement:

```sql
mysql> DROP TABLE students;
Query OK, 0 rows affected (0.01 sec)
```

If you run `SHOW TABLES;` after dropping the table, MySQL will return:

```text
Empty set
```

> **Warning:** `DROP TABLE` removes the table structure and its stored data. Use this command carefully.

---

## Module 4: Loading Data into Tables

There are two primary methods for populating tables with data:

1. Manual insertion using the `INSERT` statement.
2. Bulk loading using `LOAD DATA LOCAL INFILE`.

---

### Method 1: Using the `INSERT` Statement

To insert a single record manually:

```sql
INSERT INTO students
VALUES (
    '12/BMS/01',
    'Samantha',
    'Bandara',
    '12, Main Street, Kurunagela',
    'm',
    '1999-03-05',
    'BMS',
    'TCEUSL',
    NULL
);
```

### Understanding the INSERT Statement

The values are inserted according to the order in which the columns were defined in the `students` table.

The example contains:

| Column       | Value                         |
| ------------ | ----------------------------- |
| `index_no`   | `12/BMS/01`                   |
| `fname`      | `Samantha`                    |
| `lname`      | `Bandara`                     |
| `address`    | `12, Main Street, Kurunagela` |
| `sex`        | `m`                           |
| `birth_date` | `1999-03-05`                  |
| `dept`       | `BMS`                         |
| `campus`     | `TCEUSL`                      |
| `tp_no`      | `NULL`                        |

---

### Method 2: Loading Data from a Text File (`LOAD DATA LOCAL INFILE`)

For bulk insertion, you can create a text file such as `students.txt`.

Each line represents one record, and values are separated by tabs in the order of the table columns.

Example:

```text
12/BMS/01	Samantha	Bandara	12, Main Street, Kurunagela	m	1999-03-05	BMS	TCEUSL	NULL
12/BMS/02	Kamal	Perera	25, Lake Road, Colombo	m	1998-07-12	BMS	TCEUSL	0712345678
```

The general command for loading the data is:

```sql
mysql> LOAD DATA LOCAL INFILE "C:/wamp64/bin/mysql/mysql5.7.14/data/students.txt"
    -> INTO TABLE students;
```

> **Important:** The exact file path depends on where your text file is stored. Windows paths can be written using forward slashes in MySQL commands, such as `C:/folder/file.txt`.

---

## Module 5: Understanding Common Data Types

The `students` table uses several important MySQL data types.

### `VARCHAR`

`VARCHAR(n)` stores variable-length character strings.

Example:

```sql
fname VARCHAR(20)
```

This allows a name with up to 20 characters.

### `CHAR`

`CHAR(n)` stores fixed-length character strings.

Example:

```sql
sex CHAR(1)
```

This is suitable for a single character such as:

```text
m
```

or:

```text
f
```

### `DATE`

`DATE` stores date values.

Example:

```sql
birth_date DATE
```

A typical value is:

```text
1999-03-05
```

The standard MySQL date format is:

```text
YYYY-MM-DD
```

---

## Module 6: Understanding `SHOW TABLES`

After selecting a database, use:

```sql
SHOW TABLES;
```

This command displays all tables available in the currently selected database.

Example:

```sql
mysql> USE tceusl;
Database changed

mysql> SHOW TABLES;
+------------------+
| Tables_in_tceusl |
+------------------+
| students         |
+------------------+
1 row in set (0.02 sec)
```

If there are no tables:

```text
Empty set
```

---

## Module 7: Understanding `DESCRIBE`

The `DESCRIBE` command is used to inspect the structure of a table.

Syntax:

```sql
DESCRIBE table_name;
```

Example:

```sql
DESCRIBE students;
```

It provides information such as:

- Field name
- Data type
- Whether `NULL` is allowed
- Key information
- Default value
- Extra attributes

Example:

```text
+------------+-------------+------+-----+---------+-------+
| Field      | Type        | Null | Key | Default | Extra |
+------------+-------------+------+-----+---------+-------+
| index_no   | varchar(20) | YES  |     | NULL    |       |
| fname      | varchar(20) | YES  |     | NULL    |       |
| lname      | varchar(20) | YES  |     | NULL    |       |
| address    | varchar(30) | YES  |     | NULL    |       |
| sex        | char(1)     | YES  |     | NULL    |       |
| birth_date | date        | YES  |     | NULL    |       |
| dept       | varchar(5)  | YES  |     | NULL    |       |
| campus     | varchar(5)  | YES  |     | NULL    |       |
| tp_no      | varchar(15) | YES  |     | NULL    |       |
+------------+-------------+------+-----+---------+-------+
```

---

## Module 8: Understanding `DROP TABLE`

The `DROP TABLE` statement permanently removes a table from the selected database.

Syntax:

```sql
DROP TABLE table_name;
```

Example:

```sql
DROP TABLE students;
```

After executing the command:

```sql
SHOW TABLES;
```

may produce:

```text
Empty set
```

> **Important:** `DROP TABLE` removes both the table structure and its data. Always confirm that the table is no longer required before executing this command.

---

## Module 9: Complete Practical Workflow

The complete process for creating and populating the `students` table is:

```text
1. Start WAMP/XAMPP
2. Start MySQL
3. Open the MySQL Console
4. Login using the configured credentials
5. View available databases
6. Create a new database
7. Select the database
8. Check existing tables
9. Create the students table
10. Verify the table using SHOW TABLES
11. Inspect the structure using DESCRIBE
12. Insert records using INSERT
13. Load bulk records using LOAD DATA LOCAL INFILE
14. Verify the stored data
15. Drop the table only when it is no longer required
```

Example:

```sql
SHOW DATABASES;

CREATE DATABASE tceusl;

USE tceusl;

SHOW TABLES;

CREATE TABLE students (
    index_no VARCHAR(20),
    fname VARCHAR(20),
    lname VARCHAR(20),
    address VARCHAR(30),
    sex CHAR(1),
    birth_date DATE,
    dept VARCHAR(5),
    campus VARCHAR(5),
    tp_no VARCHAR(15)
);

SHOW TABLES;

DESCRIBE students;

INSERT INTO students
VALUES (
    '12/BMS/01',
    'Samantha',
    'Bandara',
    '12, Main Street, Kurunagela',
    'm',
    '1999-03-05',
    'BMS',
    'TCEUSL',
    NULL
);
```

---

## Module 10: Important SQL Commands

### Display Databases

```sql
SHOW DATABASES;
```

### Create Database

```sql
CREATE DATABASE tceusl;
```

### Select Database

```sql
USE tceusl;
```

### Display Tables

```sql
SHOW TABLES;
```

### Create Table

```sql
CREATE TABLE students (
    index_no VARCHAR(20),
    fname VARCHAR(20),
    lname VARCHAR(20),
    address VARCHAR(30),
    sex CHAR(1),
    birth_date DATE,
    dept VARCHAR(5),
    campus VARCHAR(5),
    tp_no VARCHAR(15)
);
```

### Describe Table

```sql
DESCRIBE students;
```

### Insert Record

```sql
INSERT INTO students
VALUES (
    '12/BMS/01',
    'Samantha',
    'Bandara',
    '12, Main Street, Kurunagela',
    'm',
    '1999-03-05',
    'BMS',
    'TCEUSL',
    NULL
);
```

### Load Bulk Data

```sql
LOAD DATA LOCAL INFILE "C:/path/students.txt"
INTO TABLE students;
```

### Drop Table

```sql
DROP TABLE students;
```

---

## Module 11: Common Errors and Troubleshooting

### Problem 1: No Database Selected

If you try to create or access tables without selecting a database, MySQL may report that no database has been selected.

Use:

```sql
USE tceusl;
```

Then retry the command.

### Problem 2: Table Already Exists

If you try to create a table that already exists, MySQL may return an error.

Check existing tables:

```sql
SHOW TABLES;
```

If the table is no longer required, it can be removed using:

```sql
DROP TABLE students;
```

> **Warning:** Dropping a table permanently removes its data.

### Problem 3: Incorrect Data Type or Value

Make sure inserted values match the intended column data types.

For example:

```sql
birth_date DATE
```

should receive a valid date such as:

```text
1999-03-05
```

### Problem 4: Incorrect Number of Values

When using:

```sql
INSERT INTO students VALUES (...);
```

the number of supplied values must match the number of table columns.

The `students` table contains 9 columns, so the example INSERT statement supplies 9 values.

### Problem 5: `LOAD DATA LOCAL INFILE` Fails

Check:

- The file exists.
- The path is correct.
- The MySQL client/server configuration permits local file loading.
- The file format matches the expected column order.
- The values are separated correctly.
- The selected database and table are correct.

---

## Module 12: Exam-Focused Key Concepts

### `SHOW DATABASES`

Displays the databases available on the MySQL server.

```sql
SHOW DATABASES;
```

### `CREATE DATABASE`

Creates a new database.

```sql
CREATE DATABASE tceusl;
```

### `USE`

Selects a database for subsequent operations.

```sql
USE tceusl;
```

### `SHOW TABLES`

Displays tables in the currently selected database.

```sql
SHOW TABLES;
```

### `CREATE TABLE`

Creates a new table with specified columns and data types.

```sql
CREATE TABLE students (
    index_no VARCHAR(20),
    fname VARCHAR(20),
    lname VARCHAR(20),
    address VARCHAR(30),
    sex CHAR(1),
    birth_date DATE,
    dept VARCHAR(5),
    campus VARCHAR(5),
    tp_no VARCHAR(15)
);
```

### `DESCRIBE`

Displays the structure and metadata of a table.

```sql
DESCRIBE students;
```

### `DROP TABLE`

Deletes a table and its stored data.

```sql
DROP TABLE students;
```

### `INSERT`

Adds records manually to a table.

```sql
INSERT INTO students VALUES (...);
```

### `LOAD DATA LOCAL INFILE`

Loads records from a local text file into a table.

```sql
LOAD DATA LOCAL INFILE "C:/path/students.txt"
INTO TABLE students;
```

---

## Quick Study Summary Checklist

- [ ] Know how to display existing databases:

```sql
SHOW DATABASES;
```

- [ ] Know how to create a database:

```sql
CREATE DATABASE tceusl;
```

- [ ] Know how to select a database:

```sql
USE tceusl;
```

- [ ] Know how to display tables:

```sql
SHOW TABLES;
```

- [ ] Understand how to create a table using `CREATE TABLE`.
- [ ] Understand the purpose of `VARCHAR`.
- [ ] Understand the purpose of `CHAR`.
- [ ] Understand the purpose of `DATE`.
- [ ] Know how to inspect a table using:

```sql
DESCRIBE students;
```

- [ ] Understand that `DROP TABLE` removes the table and its data.
- [ ] Know how to insert a single record using `INSERT`.
- [ ] Know how to load multiple records using `LOAD DATA LOCAL INFILE`.
- [ ] Understand that the number and order of values in an `INSERT` statement must match the table definition when no column list is specified.
- [ ] Understand the importance of selecting the correct database before creating or accessing tables.

---

## Final Exam Revision

Remember these commands:

> **`SHOW DATABASES;` = Display all databases**

> **`CREATE DATABASE tceusl;` = Create a database**

> **`USE tceusl;` = Select a database**

> **`SHOW TABLES;` = Display tables in the selected database**

> **`CREATE TABLE` = Create a table**

> **`DESCRIBE students;` = Display table structure**

> **`INSERT INTO` = Insert records manually**

> **`LOAD DATA LOCAL INFILE` = Load bulk data from a local text file**

> **`DROP TABLE` = Delete a table and its stored data**

### Core Data Types

> **`VARCHAR(n)` = Variable-length character string**

> **`CHAR(n)` = Fixed-length character string**

> **`DATE` = Date value**

### Complete Database-to-Table Workflow

```text
SHOW DATABASES
        ↓
CREATE DATABASE
        ↓
USE DATABASE
        ↓
SHOW TABLES
        ↓
CREATE TABLE
        ↓
DESCRIBE TABLE
        ↓
INSERT DATA / LOAD DATA
        ↓
VERIFY DATA
        ↓
DROP TABLE (when required)
```

If these commands, data types, and workflow are understood, you have the fundamental knowledge required to create MySQL databases, design tables, inspect table structures, insert records, and load bulk data.

