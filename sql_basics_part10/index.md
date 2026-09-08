# The Ultimate Master Summary Guide: MySQL & SQL Fundamentals (Lectures 03–09)


<!--more-->

> **Academic Note:** This master summary consolidates the entire course series (Lectures 03 through 09), serving as the definitive review guide for mastering relational databases and MySQL queries.

---

## Part 1: Console Operations & Basic Queries (Lecture 03)

### MySQL Identity & Pronunciation

MySQL is pronounced **"my Ess Que Ell"**.

MySQL is an **open-source Relational Database Management System (RDBMS)**.

### Authentication

For a default local MySQL root-user installation, login may require no password. If the prompt asks for a password and your installation has none configured, simply press **Enter**.

### Syntax Rules

- Every SQL command must end with a semicolon (`;`) or `\g`.
- SQL keywords are **case-insensitive**. For example, `SELECT` and `select` are equivalent.
- Multi-line commands use the `->` continuation prompt.
- Abort an ongoing command using `\c`.

### Essential Diagnostic Commands

```sql
SELECT VERSION(), CURRENT_DATE;
SELECT SIN(PI()/4), (4+1)*5;
QUIT;
```

`SELECT VERSION(), CURRENT_DATE;` displays the MySQL version and current date.

`SELECT SIN(PI()/4), (4+1)*5;` demonstrates that MySQL can also perform mathematical calculations.

`QUIT;` exits the MySQL client. You can also use:

```sql
exit;
```

---

## Part 2: Databases & Table Schemas (Lecture 04)

### Database Management

List all available databases:

```sql
SHOW DATABASES;
```

Create a database:

```sql
CREATE DATABASE tceusl;
```

Select the database you want to work with:

```sql
USE tceusl;
```

List the tables inside the current database:

```sql
SHOW TABLES;
```

### Table Creation & Data Types

Create a `students` table:

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

### Schema Inspection

Use `DESCRIBE` to inspect the structure of a table:

```sql
DESCRIBE students;
```

You can also use:

```sql
DESC students;
```

### Table Deletion

To permanently delete a table:

```sql
DROP TABLE students;
```

> **Warning:** `DROP TABLE` removes the table structure and its data.

### Data Insertion

Insert a single row using:

```sql
INSERT INTO students
VALUES (
    '001',
    'Barath',
    'Perera',
    'Colombo',
    'm',
    '1995-05-10',
    'COM',
    'CMB',
    '0712345678'
);
```

You can also explicitly specify the columns:

```sql
INSERT INTO students
(index_no, fname, lname, address, sex, birth_date, dept, campus, tp_no)
VALUES
('001', 'Barath', 'Perera', 'Colombo', 'm', '1995-05-10', 'COM', 'CMB', '0712345678');
```

For bulk data import, MySQL can use:

```sql
LOAD DATA LOCAL INFILE 'students.csv'
INTO TABLE students
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n';
```

---

## Part 3: Data Retrieval & Filtering (Lecture 05)

### The Core `SELECT` Format

The basic structure of a query is:

```sql
SELECT what_to_select
FROM which_table
WHERE conditions;
```

### Selecting All Columns

To retrieve every column and every row:

```sql
SELECT * FROM students;
```

### Exact Matching

Find students whose first name is exactly `Barath`:

```sql
SELECT *
FROM students
WHERE fname = 'Barath';
```

### Comparison Operators

SQL supports common comparison operators:

| Operator | Meaning                  |
| -------- | ------------------------ |
| `=`      | Equal to                 |
| `<>`     | Not equal to             |
| `!=`     | Not equal to             |
| `>`      | Greater than             |
| `<`      | Less than                |
| `>=`     | Greater than or equal to |
| `<=`     | Less than or equal to    |

Example:

```sql
SELECT *
FROM students
WHERE birth_date >= '1991-01-01';
```

### Logical `AND`

Both conditions must be true:

```sql
SELECT *
FROM students
WHERE dept = 'PHY'
  AND sex = 'f';
```

### Logical `OR`

At least one condition must be true:

```sql
SELECT *
FROM students
WHERE sex = 'f'
   OR dept = 'COM';
```

### Column Projection

You do not need to retrieve every column. Specify only the columns you need:

```sql
SELECT fname, birth_date
FROM students;
```

This is called **projection**.

---

## Part 4: Sorting & NULL Handling (Lecture 06)

### Result Ordering with `ORDER BY`

Sort students by birth date in ascending order:

```sql
SELECT *
FROM students
ORDER BY birth_date;
```

Ascending order is the default.

You can also write:

```sql
SELECT *
FROM students
ORDER BY birth_date ASC;
```

### Descending Order

To sort from newest to oldest:

```sql
SELECT *
FROM students
ORDER BY birth_date DESC;
```

### Sorting by Multiple Columns

You can sort using more than one column:

```sql
SELECT *
FROM students
ORDER BY dept ASC, birth_date DESC;
```

### Handling `NULL`

`NULL` represents a missing, unknown, or unavailable value.

**Never use `=` to test for `NULL`.**

Incorrect:

```sql
WHERE tp_no = NULL;
```

Correct:

```sql
SELECT fname
FROM students
WHERE tp_no IS NULL;
```

To find rows where the phone number is available:

```sql
SELECT fname
FROM students
WHERE tp_no IS NOT NULL;
```

Remember:

- `IS NULL` → value is missing/unknown.
- `IS NOT NULL` → value exists/is not `NULL`.

---

## Part 5: Pattern Matching & Regular Expressions (Lecture 07)

### `LIKE` Pattern Matching

The `LIKE` operator is used for standard SQL pattern matching.

### `%` Wildcard

`%` matches zero or more arbitrary characters.

Find names beginning with `M`:

```sql
SELECT *
FROM students
WHERE fname LIKE 'M%';
```

Find names ending with `na`:

```sql
SELECT *
FROM students
WHERE fname LIKE '%na';
```

Find names containing `ar`:

```sql
SELECT *
FROM students
WHERE fname LIKE '%ar%';
```

### `_` Wildcard

`_` matches exactly one character.

For example:

```sql
SELECT *
FROM students
WHERE fname LIKE '______';
```

This matches names containing exactly six characters.

### Regular Expressions with `REGEXP`

MySQL also supports regular-expression pattern matching through `REGEXP`.

Find names beginning with `M`:

```sql
SELECT *
FROM students
WHERE fname REGEXP '^M';
```

Find names ending with `a`:

```sql
SELECT *
FROM students
WHERE fname REGEXP 'a$';
```

Find names containing exactly six characters:

```sql
SELECT *
FROM students
WHERE fname REGEXP '^.{6}$';
```

### Important Regular Expression Symbols

| Symbol | Meaning                  |
| ------ | ------------------------ |
| `^`    | Start of string          |
| `$`    | End of string            |
| `.`    | Any single character     |
| `*`    | Zero or more occurrences |
| `+`    | One or more occurrences  |

---

## Part 6: Multiple Tables & Relational Design (Lecture 08)

### Primary Keys

A **primary key** uniquely identifies each record in a table.

Example:

```sql
CREATE TABLE students (
    index_no VARCHAR(20) PRIMARY KEY,
    fname VARCHAR(20),
    lname VARCHAR(20)
);
```

A primary key:

- Must uniquely identify each row.
- Cannot contain duplicate values.
- Cannot contain `NULL` values.

### Foreign Keys

A **foreign key** creates a relationship between tables.

Example:

```sql
CREATE TABLE departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50)
);
```

A student table can reference the department:

```sql
CREATE TABLE students (
    index_no VARCHAR(20) PRIMARY KEY,
    fname VARCHAR(20),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);
```

### Composite Primary Keys

A **composite primary key** consists of two or more columns.

Example:

```sql
CREATE TABLE enrollment (
    student_id INT,
    course_id INT,
    PRIMARY KEY (student_id, course_id)
);
```

Together, `student_id` and `course_id` uniquely identify a record.

### Aggregate Functions

Aggregate functions perform calculations over multiple rows.

#### `COUNT()`

```sql
SELECT COUNT(*)
FROM students;
```

#### `AVG()`

```sql
SELECT AVG(price)
FROM products;
```

#### `SUM()`

```sql
SELECT SUM(price)
FROM products;
```

Common aggregate functions include:

- `COUNT()` — counts rows/values.
- `AVG()` — calculates an average.
- `SUM()` — calculates a total.
- `MIN()` — finds the smallest value.
- `MAX()` — finds the largest value.

---

## Part 7: SQL Joins (Lecture 09)

Joins allow data from multiple related tables to be retrieved in a single query.

### Equi-Join vs Non-Equi-Join

An **equi-join** uses the equality operator (`=`) to match rows.

```sql
SELECT *
FROM students s
JOIN departments d
    ON s.dept_id = d.dept_id;
```

A **non-equi-join** uses comparison operators such as `>`, `<`, `>=`, or `<=`.

```sql
SELECT *
FROM employees e
JOIN salary_grades g
    ON e.salary >= g.min_salary
   AND e.salary <= g.max_salary;
```

### `INNER JOIN`

An `INNER JOIN` returns only rows that have matching values in both tables.

```sql
SELECT *
FROM students s
INNER JOIN departments d
    ON s.dept_id = d.dept_id;
```

> **INNER JOIN = Only matching rows from both tables.**

### `LEFT JOIN`

A `LEFT JOIN` returns every row from the left table and matching rows from the right table.

```sql
SELECT *
FROM students s
LEFT JOIN departments d
    ON s.dept_id = d.dept_id;
```

If no match exists, the right-side columns contain `NULL`.

> **LEFT JOIN = Keep all rows from the left table.**

### `RIGHT JOIN`

A `RIGHT JOIN` returns every row from the right table and matching rows from the left table.

```sql
SELECT *
FROM students s
RIGHT JOIN departments d
    ON s.dept_id = d.dept_id;
```

> **RIGHT JOIN = Keep all rows from the right table.**

### `FULL OUTER JOIN`

A `FULL OUTER JOIN` returns all matching and non-matching rows from both tables.

Standard SQL syntax:

```sql
SELECT *
FROM table_A
FULL OUTER JOIN table_B
ON table_A.A = table_B.A;
```

> **MySQL Note:** MySQL does not directly support `FULL OUTER JOIN`. It can be simulated using `LEFT JOIN`, `RIGHT JOIN`, and `UNION`.

```sql
SELECT *
FROM table_A
LEFT JOIN table_B
ON table_A.A = table_B.A

UNION

SELECT *
FROM table_A
RIGHT JOIN table_B
ON table_A.A = table_B.A;
```

> **FULL OUTER JOIN = Keep all rows from both tables.**

### `NATURAL JOIN`

A `NATURAL JOIN` automatically joins tables using compatible columns with the same names.

```sql
SELECT *
FROM students
NATURAL JOIN departments;
```

No explicit `ON` clause is required.

> **Caution:** `NATURAL JOIN` can produce unexpected results if tables contain multiple identically named columns. Explicit `JOIN ... ON ...` syntax is usually clearer and safer.

### `CROSS JOIN`

A `CROSS JOIN` generates a Cartesian product.

If Table A has 5 rows and Table B has 3 rows:

```text
5 × 3 = 15 rows
```

Example:

```sql
SELECT *
FROM students
CROSS JOIN courses;
```

> **CROSS JOIN = Every possible combination of rows.**

### `SELF JOIN`

A self join joins a table with itself.

Example:

```sql
SELECT
    e.employee_name AS employee,
    m.employee_name AS manager
FROM employees e
JOIN employees m
    ON e.manager_id = m.employee_id;
```

Here:

```text
e = employee
m = manager
```

> **SELF JOIN = A table joined with itself.**

---

## Quick Study Reference Checklist

- [ ] Understand MySQL console connection and command terminators (`;` and `\g`)
- [ ] Know basic console commands such as `QUIT`, `exit`, and `\c`
- [ ] Understand `CREATE DATABASE`, `USE`, and `SHOW DATABASES`
- [ ] Understand `CREATE TABLE`, `DESCRIBE`, and `DROP TABLE`
- [ ] Know common SQL data types such as `VARCHAR`, `CHAR`, and `DATE`
- [ ] Understand `INSERT INTO` and bulk data loading
- [ ] Master `SELECT` and column projections
- [ ] Understand `WHERE` filtering
- [ ] Know comparison operators such as `=`, `<>`, `>`, `<`, `>=`, and `<=`
- [ ] Understand logical operators `AND` and `OR`
- [ ] Master `ORDER BY`, `ASC`, and `DESC`
- [ ] Understand `NULL`, `IS NULL`, and `IS NOT NULL`
- [ ] Know `LIKE` with `%` and `_`
- [ ] Understand `REGEXP`, `^`, `$`, and `.`
- [ ] Understand primary keys and foreign keys
- [ ] Understand composite primary keys
- [ ] Know aggregate functions such as `COUNT()`, `AVG()`, and `SUM()`
- [ ] Understand equi-joins and non-equi-joins
- [ ] Master `INNER JOIN`
- [ ] Master `LEFT JOIN`
- [ ] Master `RIGHT JOIN`
- [ ] Understand the concept of `FULL OUTER JOIN`
- [ ] Know how MySQL can simulate a full outer join
- [ ] Understand `NATURAL JOIN`
- [ ] Understand `CROSS JOIN` and Cartesian products
- [ ] Understand `SELF JOIN` and table aliases

---

## Final Exam Revision Summary

The most important SQL concepts to remember are:

```text
DATABASE
   ↓
TABLE
   ↓
ROWS + COLUMNS
   ↓
PRIMARY KEY
   ↓
FOREIGN KEY
   ↓
RELATIONSHIPS
   ↓
SELECT + WHERE
   ↓
ORDER BY
   ↓
LIKE / REGEXP
   ↓
AGGREGATE FUNCTIONS
   ↓
JOINS
```

### Essential SQL Command Pattern

```sql
SELECT columns
FROM table
WHERE conditions
ORDER BY column ASC;
```

### Essential Join Pattern

```sql
SELECT columns
FROM table1
JOIN table2
    ON table1.key = table2.key;
```

### Remember These Exam Rules

- Use `=` for normal value comparison.
- Use `IS NULL` or `IS NOT NULL` for `NULL`.
- Use `%` for zero or more characters with `LIKE`.
- Use `_` for exactly one character with `LIKE`.
- Use `^` for the beginning of a regular expression.
- Use `$` for the end of a regular expression.
- `INNER JOIN` keeps only matching rows.
- `LEFT JOIN` keeps every row from the left table.
- `RIGHT JOIN` keeps every row from the right table.
- `CROSS JOIN` produces every possible combination of rows.
- A primary key uniquely identifies a row.
- A foreign key establishes a relationship between tables.
- Aggregate functions operate on groups or sets of rows.
- `ORDER BY ... DESC` sorts results in descending order.
- SQL keywords are generally case-insensitive.

> **Academic Note:** Use this guide as a consolidated revision sheet for Lectures 03–09. For practical mastery, reproduce each example in a MySQL environment and experiment by changing the conditions, columns, and join relationships.

