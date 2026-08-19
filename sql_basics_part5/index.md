# Mastering SQL SELECT Statements & Filtering (SQL Part 05)


<!--more-->

> **Academic Note:** This master study guide covers Lecture 05 notes, focusing on data retrieval, row filtering, logical conditions, comparison operators, and column projection using the SQL `SELECT` statement in MySQL.

---

## Module 1: The Anatomy of the `SELECT` Statement

The `SELECT` statement is the primary SQL command used to retrieve information from a database table.

### 1.1 General Query Syntax

The basic structure of a `SELECT` statement is:

```sql
SELECT what_to_select
FROM which_table
WHERE conditions_to_satisfy;
```

A basic `SELECT` statement consists of three main parts:

| Clause   | Purpose                                          |
| -------- | ------------------------------------------------ |
| `SELECT` | Specifies which columns should be retrieved      |
| `FROM`   | Specifies the table from which data is retrieved |
| `WHERE`  | Specifies conditions used to filter rows         |

> **Important:** The `WHERE` clause is optional. If it is omitted, all rows from the selected table are returned.

---

## Module 2: Selecting All Data (`*`)

To retrieve every column and every row from a table, use the asterisk (`*`) wildcard.

### 2.1 Basic `SELECT *` Query

```sql
mysql> SELECT * FROM students;
```

This query retrieves the complete dataset stored in the `students` table.

The `*` symbol means:

> **All columns**

For example:

```sql
SELECT *
FROM students;
```

returns every column for every row in the `students` table.

---

## Module 3: Selecting Particular Rows (`WHERE` Clause)

Instead of retrieving every row, you can filter records using the `WHERE` clause.

The general syntax is:

```sql
SELECT columns
FROM table
WHERE condition;
```

The condition determines which rows are included in the result.

### 3.1 Filtering by Exact Match (`=`)

To find a specific student whose first name is `Barath`:

```sql
mysql> SELECT * FROM students WHERE fname = "Barath";
```

Equivalent formatted query:

```sql
SELECT *
FROM students
WHERE fname = "Barath";
```

The `=` operator checks whether the value stored in the `fname` column is equal to `"Barath"`.

---

### 3.2 Using Comparison Operators (`>=`)

To find students born on or after January 1, 1991:

```sql
mysql> SELECT * FROM students WHERE birth_date >= "1991-01-01";
```

Equivalent formatted query:

```sql
SELECT *
FROM students
WHERE birth_date >= "1991-01-01";
```

The `>=` operator means:

> **Greater than or equal to**

### Common Comparison Operators

| Operator | Meaning                  |
| -------- | ------------------------ |
| `=`      | Equal to                 |
| `>`      | Greater than             |
| `<`      | Less than                |
| `>=`     | Greater than or equal to |
| `<=`     | Less than or equal to    |
| `<>`     | Not equal to             |

---

## Module 4: Combining Conditions with Logical Operators

SQL allows multiple conditions to be combined using logical operators.

The two fundamental logical operators covered in this lecture are:

1. `AND`
2. `OR`

### 4.1 Combining Conditions with `AND`

The `AND` operator is used when **all specified conditions must be true**.

For example, to find female students belonging to the `PHY` department:

```sql
mysql> SELECT * FROM students WHERE dept = "PHY" AND sex = "f";
```

Equivalent formatted query:

```sql
SELECT *
FROM students
WHERE dept = "PHY"
  AND sex = "f";
```

A row is returned only when both conditions are satisfied:

```text
dept = "PHY"
AND
sex = "f"
```

> **AND requires every connected condition to be true.**

### 4.2 Combining Conditions with `OR`

The `OR` operator is used when **at least one condition must be true**.

For example, to find female students or students belonging to the `COM` department:

```sql
mysql> SELECT * FROM students WHERE sex = "f" OR dept = "COM";
```

Equivalent formatted query:

```sql
SELECT *
FROM students
WHERE sex = "f"
   OR dept = "COM";
```

A row is returned when either condition is true, or when both conditions are true.

> **OR requires at least one connected condition to be true.**

### 4.3 `AND` vs `OR`

| Operator | Requirement                         |
| -------- | ----------------------------------- |
| `AND`    | All conditions must be true         |
| `OR`     | At least one condition must be true |

---

## Module 5: Selecting Particular Columns (Column Projection)

Sometimes you do not want to retrieve every column from a table.

Instead, you can specify only the columns that you need.

This is called **column projection**.

### 5.1 Selecting Specific Columns

For example:

```sql
mysql> SELECT fname, birth_date FROM students;
```

Equivalent formatted query:

```sql
SELECT fname, birth_date
FROM students;
```

Only the `fname` and `birth_date` columns are returned.

### 5.2 Selecting Multiple Columns

Multiple columns are separated using commas:

```sql
SELECT fname, lname, dept
FROM students;
```

Another example:

```sql
SELECT index_no, fname, birth_date
FROM students;
```

### 5.3 Projection vs `SELECT *`

Using:

```sql
SELECT *
FROM students;
```

retrieves all columns.

Using:

```sql
SELECT fname, birth_date
FROM students;
```

retrieves only the selected columns.

> **Projection controls which columns appear in the result.**

---

## Module 6: Example Output for Column Projection

The following query:

```sql
SELECT fname, birth_date
FROM students;
```

produces output similar to:

```text
+---------------+------------+
| fname         | birth_date |
+---------------+------------+
| Mohan         | 1990-01-01 |
| Malith        | 1991-03-02 |
| Utpala        | 1992-04-12 |
| Barath        | 1992-05-04 |
| Darmarathna   | 1993-05-05 |
| Rukzana       | 1990-03-06 |
| Yuhatharshana | 1990-05-07 |
| Shirmal       | 1993-02-08 |
| Mithujan      | 1990-12-09 |
| Thuvarakan    | 1990-11-10 |
+---------------+------------+
10 rows in set (0.00 sec)
```

---

## Module 7: Combining Projection and Filtering

Projection and filtering can be used together.

For example:

```sql
SELECT fname, birth_date
FROM students
WHERE birth_date >= "1991-01-01";
```

This query performs two operations.

### Projection

```sql
SELECT fname, birth_date
```

determines which columns are displayed.

### Filtering

```sql
WHERE birth_date >= "1991-01-01"
```

determines which rows are displayed.

> **Projection controls columns, while filtering controls rows.**

### Example: Female Students

```sql
SELECT fname, sex
FROM students
WHERE sex = "f";
```

### Example: PHY Students

```sql
SELECT fname, dept
FROM students
WHERE dept = "PHY";
```

### Example: Female PHY Students

```sql
SELECT fname, dept, sex
FROM students
WHERE dept = "PHY"
  AND sex = "f";
```

---

## Module 8: Practical Query Examples

### Example 1: Retrieve Every Column and Row

```sql
SELECT *
FROM students;
```

### Example 2: Find a Student by Name

```sql
SELECT *
FROM students
WHERE fname = "Barath";
```

### Example 3: Find Students Born on or After a Date

```sql
SELECT *
FROM students
WHERE birth_date >= "1991-01-01";
```

### Example 4: Find Female PHY Students

```sql
SELECT *
FROM students
WHERE dept = "PHY"
  AND sex = "f";
```

### Example 5: Find Female or COM Students

```sql
SELECT *
FROM students
WHERE sex = "f"
   OR dept = "COM";
```

### Example 6: Display Only Names and Birth Dates

```sql
SELECT fname, birth_date
FROM students;
```

### Example 7: Display Selected Columns with Filtering

```sql
SELECT fname, birth_date
FROM students
WHERE birth_date >= "1991-01-01";
```

### Example 8: Display Female Students from PHY

```sql
SELECT fname, lname, dept, sex
FROM students
WHERE dept = "PHY"
  AND sex = "f";
```

---

## Module 9: Understanding Rows and Columns

A very important concept in SQL is the difference between **row filtering** and **column projection**.

### Row Filtering

The `WHERE` clause controls which rows are returned.

```sql
SELECT *
FROM students
WHERE sex = "f";
```

This may return fewer rows than the original table.

### Column Projection

The column list after `SELECT` controls which columns are returned.

```sql
SELECT fname, birth_date
FROM students;
```

This returns fewer columns than the original table.

### Both Together

```sql
SELECT fname, birth_date
FROM students
WHERE sex = "f";
```

This query:

- selects only `fname` and `birth_date`;
- returns only rows where `sex = "f"`.

### Easy Way to Remember

```text
SELECT → Which columns?
WHERE  → Which rows?
FROM   → Which table?
```

---

## Module 10: Important SQL Syntax Rules

### Rule 1: `SELECT` comes before `FROM`

Correct:

```sql
SELECT fname
FROM students;
```

### Rule 2: `FROM` specifies the table

```sql
SELECT *
FROM students;
```

### Rule 3: `WHERE` comes after `FROM`

Correct:

```sql
SELECT *
FROM students
WHERE sex = "f";
```

### Rule 4: Separate multiple columns using commas

Correct:

```sql
SELECT fname, lname, dept
FROM students;
```

### Rule 5: Use `AND` when every condition is required

```sql
SELECT *
FROM students
WHERE dept = "PHY"
  AND sex = "f";
```

### Rule 6: Use `OR` when either condition can satisfy the query

```sql
SELECT *
FROM students
WHERE dept = "PHY"
   OR dept = "COM";
```

### Rule 7: End SQL statements with a semicolon

```sql
SELECT *
FROM students;
```

---

## Module 11: Common Query Patterns

### Pattern 1: All Columns

```sql
SELECT *
FROM table_name;
```

### Pattern 2: Specific Columns

```sql
SELECT column1, column2
FROM table_name;
```

### Pattern 3: Filter by Equality

```sql
SELECT *
FROM table_name
WHERE column1 = value;
```

### Pattern 4: Filter Using Comparison

```sql
SELECT *
FROM table_name
WHERE column1 >= value;
```

### Pattern 5: Combine Conditions with `AND`

```sql
SELECT *
FROM table_name
WHERE condition1
  AND condition2;
```

### Pattern 6: Combine Conditions with `OR`

```sql
SELECT *
FROM table_name
WHERE condition1
   OR condition2;
```

### Pattern 7: Projection + Filtering

```sql
SELECT column1, column2
FROM table_name
WHERE condition;
```

---

## Module 12: Exam-Focused Key Concepts

### What is `SELECT`?

`SELECT` is the SQL statement used to retrieve data from database tables.

### What is `FROM`?

`FROM` specifies the table from which the data should be retrieved.

### What is `WHERE`?

`WHERE` filters rows based on one or more conditions.

### What does `*` mean?

`*` represents all columns.

### What does `=` mean?

`=` tests whether two values are equal.

### What does `>=` mean?

`>=` means greater than or equal to.

### What is `AND`?

`AND` requires all specified conditions to be true.

### What is `OR`?

`OR` requires at least one specified condition to be true.

### What is column projection?

Column projection means selecting only the required columns instead of retrieving every column.

Example:

```sql
SELECT fname, birth_date
FROM students;
```

---

## Module 13: Complete Practical Workflow

The basic workflow for retrieving information from the `students` table is:

```text
1. Select the database
        ↓
2. Identify the table
        ↓
3. Decide which columns are required
        ↓
4. Write the SELECT statement
        ↓
5. Add WHERE if filtering is required
        ↓
6. Combine conditions using AND/OR when necessary
        ↓
7. Execute the query
        ↓
8. Examine the result
```

Example:

```sql
USE tceusl;

SELECT fname, birth_date
FROM students
WHERE birth_date >= "1991-01-01";
```

---

## Module 14: Common Mistakes and Troubleshooting

### Problem 1: Forgetting the `FROM` Clause

Incorrect:

```sql
SELECT fname;
```

Correct:

```sql
SELECT fname
FROM students;
```

### Problem 2: Forgetting `WHERE`

If you want to filter rows but omit `WHERE`:

```sql
SELECT *
FROM students;
```

the query retrieves every row.

Correct:

```sql
SELECT *
FROM students
WHERE sex = "f";
```

### Problem 3: Using `AND` When `OR` Is Required

This query:

```sql
SELECT *
FROM students
WHERE sex = "f"
  AND dept = "COM";
```

requires both conditions to be true.

If the requirement is:

> Female students **or** COM students

use:

```sql
SELECT *
FROM students
WHERE sex = "f"
   OR dept = "COM";
```

### Problem 4: Selecting Too Many Columns

Instead of:

```sql
SELECT *
FROM students;
```

if only the name and birth date are needed, use:

```sql
SELECT fname, birth_date
FROM students;
```

### Problem 5: Incorrect Comparison Operator

For "on or after January 1, 1991":

Correct:

```sql
WHERE birth_date >= "1991-01-01";
```

Using only:

```sql
WHERE birth_date > "1991-01-01";
```

would exclude exactly January 1, 1991.

---

## Module 15: Important SQL Commands

### Retrieve All Data

```sql
SELECT *
FROM students;
```

### Retrieve a Specific Student

```sql
SELECT *
FROM students
WHERE fname = "Barath";
```

### Retrieve Students by Date

```sql
SELECT *
FROM students
WHERE birth_date >= "1991-01-01";
```

### Retrieve Female PHY Students

```sql
SELECT *
FROM students
WHERE dept = "PHY"
  AND sex = "f";
```

### Retrieve Female or COM Students

```sql
SELECT *
FROM students
WHERE sex = "f"
   OR dept = "COM";
```

### Retrieve Specific Columns

```sql
SELECT fname, birth_date
FROM students;
```

### Retrieve Specific Columns with a Condition

```sql
SELECT fname, birth_date
FROM students
WHERE birth_date >= "1991-01-01";
```

---

## Module 16: Quick Study Summary

The most important concepts from Lecture 05 are:

| Concept                         | SQL               |
| ------------------------------- | ----------------- |
| Retrieve data                   | `SELECT`          |
| Specify table                   | `FROM`            |
| Filter rows                     | `WHERE`           |
| All columns                     | `*`               |
| Equality                        | `=`               |
| Greater than or equal           | `>=`              |
| All conditions required         | `AND`             |
| At least one condition required | `OR`              |
| Select specific columns         | Column projection |

### Essential Query Structure

```sql
SELECT columns
FROM table
WHERE condition;
```

### Retrieve Everything

```sql
SELECT *
FROM students;
```

### Filter Rows

```sql
SELECT *
FROM students
WHERE condition;
```

### Use `AND`

```sql
SELECT *
FROM students
WHERE condition1
  AND condition2;
```

### Use `OR`

```sql
SELECT *
FROM students
WHERE condition1
   OR condition2;
```

### Project Specific Columns

```sql
SELECT column1, column2
FROM students;
```

### Project and Filter

```sql
SELECT column1, column2
FROM students
WHERE condition;
```

---

## Module 17: Final Revision Checklist

- [ ] Understand the purpose of the `SELECT` statement.
- [ ] Understand the role of the `FROM` clause.
- [ ] Understand the role of the `WHERE` clause.
- [ ] Know that `*` represents all columns.
- [ ] Know how to retrieve all rows and columns.
- [ ] Know how to filter rows using `=`.
- [ ] Know how to filter dates using `>=`.
- [ ] Understand the comparison operators.
- [ ] Understand the difference between `AND` and `OR`.
- [ ] Know that `AND` requires all conditions to be true.
- [ ] Know that `OR` requires at least one condition to be true.
- [ ] Understand column projection.
- [ ] Know how to select multiple columns using commas.
- [ ] Know how to combine projection and filtering.
- [ ] Know the difference between row filtering and column projection.
- [ ] Remember to terminate SQL statements with `;`.

---

## Final Exam Revision

Remember these core patterns:

> **`SELECT * FROM students;` = Retrieve all columns and all rows**

> **`SELECT ... FROM ... WHERE ...;` = Retrieve data that satisfies a condition**

> **`=` = Equal to**

> **`>=` = Greater than or equal to**

> **`AND` = Every condition must be true**

> **`OR` = At least one condition must be true**

> **Column projection = Select only the columns you need**

### The Three Most Important Questions

When writing a `SELECT` query, ask:

```text
1. FROM which table?
        ↓
2. SELECT which columns?
        ↓
3. WHERE which rows?
```

For example:

```sql
SELECT fname, birth_date
FROM students
WHERE birth_date >= "1991-01-01";
```

This means:

```text
FROM students
        ↓
SELECT fname and birth_date
        ↓
WHERE birth_date is 1991-01-01 or later
```

### Final Key Takeaway

The SQL `SELECT` statement is the foundation of database querying.

By mastering:

```sql
SELECT
FROM
WHERE
=
>=
AND
OR
*
```

you can retrieve specific information from a database efficiently.

The fundamental query patterns are:

```sql
SELECT *
FROM students;
```

```sql
SELECT *
FROM students
WHERE fname = "Barath";
```

```sql
SELECT *
FROM students
WHERE birth_date >= "1991-01-01";
```

```sql
SELECT *
FROM students
WHERE dept = "PHY"
  AND sex = "f";
```

```sql
SELECT *
FROM students
WHERE sex = "f"
   OR dept = "COM";
```

```sql
SELECT fname, birth_date
FROM students;
```

```sql
SELECT fname, birth_date
FROM students
WHERE birth_date >= "1991-01-01";
```

> **Master these query patterns first. They form the foundation for more advanced SQL topics such as `ORDER BY`, `GROUP BY`, aggregate functions, joins, subqueries, and database reporting.**

