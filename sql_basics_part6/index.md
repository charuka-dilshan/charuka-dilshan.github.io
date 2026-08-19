# Sorting Data and Working with NULL in MySQL (Lecture 06)


<!--more-->

> **Academic Note:** This master study guide covers Lecture 06 notes, focusing on how to organize query results using the `ORDER BY` clause and how to correctly query missing or unknown data using `NULL` operators.

---

## Module 1: Sorting Data with `ORDER BY`

When retrieving data using a `SELECT` statement, rows are not guaranteed to appear in a particular order unless an explicit sorting rule is specified.

The `ORDER BY` clause is used to organize the rows returned by a query.

### 1.1 General Syntax

The basic syntax is:

```sql
SELECT column1, column2
FROM table_name
ORDER BY column_name;
```

The `ORDER BY` clause specifies the column that should be used to sort the result.

### 1.2 Ascending Sort

Ascending order is the default sorting direction.

For example, to display students' first names and birth dates ordered from the earliest birth date to the latest:

```sql
mysql> SELECT fname, birth_date
    -> FROM students
    -> ORDER BY birth_date;
```

Example output:

```text
+---------------+------------+
| fname         | birth_date |
+---------------+------------+
| Mohan         | 1990-01-01 |
| Rukzana       | 1990-03-06 |
| Yuhatharshana | 1990-05-07 |
| Thuvarakan    | 1990-11-10 |
| Mithujan      | 1990-12-09 |
| Malith        | 1991-03-02 |
| Utpala        | 1992-04-12 |
| Barath        | 1992-05-04 |
| Shirmal       | 1993-02-08 |
| Darmarathna   | 1993-05-05 |
+---------------+------------+
10 rows in set (0.00 sec)
```

The query:

```sql
SELECT fname, birth_date
FROM students
ORDER BY birth_date;
```

sorts the records according to `birth_date` in ascending order.

> **Important:** `ASC` is the default sorting direction, so it does not have to be written explicitly.

---

## Module 2: Ascending Sorting with `ASC`

Although ascending order is the default, you can explicitly specify it using the `ASC` keyword.

```sql
SELECT fname, birth_date
FROM students
ORDER BY birth_date ASC;
```

This produces the same ordering as:

```sql
SELECT fname, birth_date
FROM students
ORDER BY birth_date;
```

### Meaning of `ASC`

`ASC` means:

> **Ascending order**

For numerical values, ascending means smallest to largest.

For dates, ascending means earliest to latest.

For text, ascending generally means alphabetical order.

### Examples

Numerical values:

```text
10
20
30
40
50
```

Dates:

```text
1990-01-01
1991-03-02
1992-04-12
1993-05-05
```

Names:

```text
Barath
Malith
Mohan
Rukzana
```

---

## Module 3: Descending Sorting with `DESC`

To sort results in reverse order, use the `DESC` keyword.

`DESC` means:

> **Descending order**

For example:

```sql
mysql> SELECT fname, birth_date
    -> FROM students
    -> ORDER BY birth_date DESC;
```

Example output:

```text
+---------------+------------+
| fname         | birth_date |
+---------------+------------+
| Darmarathna   | 1993-05-05 |
| Shirmal       | 1993-02-08 |
| Barath        | 1992-05-04 |
| Utpala        | 1992-04-12 |
| Malith        | 1991-03-02 |
| Mithujan      | 1990-12-09 |
| Thuvarakan    | 1990-11-10 |
| Yuhatharshana | 1990-05-07 |
| Rukzana       | 1990-03-06 |
| Mohan         | 1990-01-01 |
+---------------+------------+
10 rows in set (0.00 sec)
```

The query:

```sql
SELECT fname, birth_date
FROM students
ORDER BY birth_date DESC;
```

returns the latest birth date first and the earliest birth date last.

---

## Module 4: `ASC` vs `DESC`

The two main sorting directions are:

| Keyword | Meaning    | Example            |
| ------- | ---------- | ------------------ |
| `ASC`   | Ascending  | Smallest → Largest |
| `DESC`  | Descending | Largest → Smallest |

### Ascending

```sql
SELECT *
FROM students
ORDER BY birth_date ASC;
```

Result conceptually:

```text
Oldest date
    ↓
Newest date
```

### Descending

```sql
SELECT *
FROM students
ORDER BY birth_date DESC;
```

Result conceptually:

```text
Newest date
    ↓
Oldest date
```

### Easy Way to Remember

> **ASC = Ascending**

> **DESC = Descending**

---

## Module 5: Sorting Different Types of Data

`ORDER BY` can be used with different types of columns.

### 5.1 Sorting Names

```sql
SELECT fname
FROM students
ORDER BY fname ASC;
```

This sorts first names alphabetically.

### 5.2 Sorting Names in Reverse

```sql
SELECT fname
FROM students
ORDER BY fname DESC;
```

This sorts names in reverse alphabetical order.

### 5.3 Sorting Dates

```sql
SELECT fname, birth_date
FROM students
ORDER BY birth_date ASC;
```

### 5.4 Sorting Dates in Reverse

```sql
SELECT fname, birth_date
FROM students
ORDER BY birth_date DESC;
```

---

## Module 6: Combining `ORDER BY` with `WHERE`

`ORDER BY` can be combined with the `WHERE` clause.

For example, to find female students and sort them by birth date:

```sql
SELECT fname, birth_date
FROM students
WHERE sex = "f"
ORDER BY birth_date;
```

The query performs two operations:

1. `WHERE` filters the rows.
2. `ORDER BY` sorts the filtered result.

### Query Processing Concept

```text
students table
      ↓
WHERE sex = "f"
      ↓
filtered rows
      ↓
ORDER BY birth_date
      ↓
sorted result
```

---

## Module 7: Combining `ORDER BY` with Column Projection

You can also select only the columns that you need.

For example:

```sql
SELECT fname, birth_date
FROM students
ORDER BY birth_date DESC;
```

Here:

```sql
SELECT fname, birth_date
```

controls the columns displayed.

```sql
ORDER BY birth_date DESC
```

controls the order of the rows.

> **Projection controls columns; `ORDER BY` controls row ordering.**

---

## Module 8: Understanding `NULL` Values

`NULL` is used to represent missing, unknown, or unavailable data.

For example, suppose a student's telephone number is not available:

```text
tp_no = NULL
```

This does not mean that the telephone number is:

```text
0
```

or:

```text
""
```

Instead, `NULL` means that there is no known value.

### 8.1 `NULL` Is Not Zero

These are different:

```text
NULL
0
```

`NULL` means the value is unknown or missing.

`0` is an actual numerical value.

### 8.2 `NULL` Is Not an Empty String

These are also different:

```text
NULL
""
```

An empty string is a string containing zero characters.

`NULL` represents the absence of a known value.

---

## Module 9: The Problem with Comparing `NULL`

A common SQL mistake is attempting to compare `NULL` using the normal equality operator.

For example:

```sql
SELECT *
FROM students
WHERE tp_no = NULL;
```

This is incorrect.

You should **not** use:

```sql
= NULL
```

to test for a `NULL` value.

Similarly, do not use:

```sql
!= NULL
```

or:

```sql
<> NULL
```

to test whether a value is not `NULL`.

### Why?

`NULL` represents an unknown value.

SQL uses special operators for testing whether a value is `NULL`.

These operators are:

```sql
IS NULL
```

and:

```sql
IS NOT NULL
```

---

## Module 10: Using `IS NULL`

The `IS NULL` operator is used to find rows where a column contains a `NULL` value.

### General Syntax

```sql
SELECT columns
FROM table_name
WHERE column_name IS NULL;
```

### Example

To find students who do not have a telephone number:

```sql
mysql> SELECT fname
    -> FROM students
    -> WHERE tp_no IS NULL;
```

This query returns students whose `tp_no` value is missing.

---

## Module 11: Using `IS NOT NULL`

The `IS NOT NULL` operator is used to find rows where a column contains a value.

### General Syntax

```sql
SELECT columns
FROM table_name
WHERE column_name IS NOT NULL;
```

### Example

To find students who have a telephone number:

```sql
mysql> SELECT fname
    -> FROM students
    -> WHERE tp_no IS NOT NULL;
```

This query returns students whose `tp_no` value is not `NULL`.

---

## Module 12: `IS NULL` vs `IS NOT NULL`

| Operator      | Meaning                       |
| ------------- | ----------------------------- |
| `IS NULL`     | Finds missing/unknown values  |
| `IS NOT NULL` | Finds values that are present |

### Find Missing Telephone Numbers

```sql
SELECT fname
FROM students
WHERE tp_no IS NULL;
```

### Find Available Telephone Numbers

```sql
SELECT fname
FROM students
WHERE tp_no IS NOT NULL;
```

### Easy Way to Remember

> **IS NULL → Find missing values**

> **IS NOT NULL → Find existing values**

---

## Module 13: Practical `NULL` Examples

### Example 1: Find Students Without Telephone Numbers

```sql
SELECT fname, tp_no
FROM students
WHERE tp_no IS NULL;
```

### Example 2: Find Students With Telephone Numbers

```sql
SELECT fname, tp_no
FROM students
WHERE tp_no IS NOT NULL;
```

### Example 3: Find Students With Missing Telephone Numbers and Sort by Name

```sql
SELECT fname, tp_no
FROM students
WHERE tp_no IS NULL
ORDER BY fname;
```

### Example 4: Find Students With Telephone Numbers and Sort by Name

```sql
SELECT fname, tp_no
FROM students
WHERE tp_no IS NOT NULL
ORDER BY fname;
```

### Example 5: Find Students With Telephone Numbers and Sort by Name Descending

```sql
SELECT fname, tp_no
FROM students
WHERE tp_no IS NOT NULL
ORDER BY fname DESC;
```

---

## Module 14: Combining `NULL` Handling with `ORDER BY`

`IS NULL` and `IS NOT NULL` can be combined with `ORDER BY`.

For example:

```sql
SELECT fname, tp_no
FROM students
WHERE tp_no IS NOT NULL
ORDER BY fname ASC;
```

This query:

1. selects `fname` and `tp_no`;
2. removes rows where `tp_no` is `NULL`;
3. sorts the remaining records alphabetically by `fname`.

Another example:

```sql
SELECT fname, birth_date
FROM students
WHERE birth_date IS NOT NULL
ORDER BY birth_date DESC;
```

This returns students with known birth dates and sorts them from the latest date to the earliest.

---

## Module 15: SQL Query Processing Order

A useful way to understand these queries is to think about the logical processing sequence.

Consider:

```sql
SELECT fname, birth_date
FROM students
WHERE birth_date IS NOT NULL
ORDER BY birth_date DESC;
```

Conceptually:

```text
FROM
  ↓
Identify the students table
  ↓
WHERE
  ↓
Remove rows with NULL birth_date
  ↓
SELECT
  ↓
Choose fname and birth_date
  ↓
ORDER BY
  ↓
Sort birth_date from newest to oldest
```

This helps explain how filtering and sorting work together.

---

## Module 16: Multiple Sorting Columns

`ORDER BY` can sort using more than one column.

For example:

```sql
SELECT fname, dept, birth_date
FROM students
ORDER BY dept ASC, birth_date ASC;
```

The result is first sorted by:

```text
dept
```

and then by:

```text
birth_date
```

within each department.

### Descending Secondary Sort

```sql
SELECT fname, dept, birth_date
FROM students
ORDER BY dept ASC, birth_date DESC;
```

This means:

1. Sort departments alphabetically.
2. Within each department, sort birth dates from latest to earliest.

> **Important:** When multiple columns are supplied to `ORDER BY`, the first column has the highest sorting priority.

---

## Module 17: Common Mistakes

### Mistake 1: Using `= NULL`

Incorrect:

```sql
SELECT *
FROM students
WHERE tp_no = NULL;
```

Correct:

```sql
SELECT *
FROM students
WHERE tp_no IS NULL;
```

---

### Mistake 2: Using `!= NULL`

Incorrect:

```sql
SELECT *
FROM students
WHERE tp_no != NULL;
```

Correct:

```sql
SELECT *
FROM students
WHERE tp_no IS NOT NULL;
```

---

### Mistake 3: Forgetting `DESC`

If you need reverse ordering:

Incorrect:

```sql
SELECT fname, birth_date
FROM students
ORDER BY birth_date;
```

Correct:

```sql
SELECT fname, birth_date
FROM students
ORDER BY birth_date DESC;
```

---

### Mistake 4: Assuming `ORDER BY` Is Automatically Applied

SQL does not guarantee a particular result order unless an `ORDER BY` clause is specified.

If the order matters, explicitly use:

```sql
ORDER BY column_name;
```

---

### Mistake 5: Confusing `NULL` with an Empty String

These are different:

```text
NULL
""
```

An empty string is a value.

`NULL` represents a missing or unknown value.

---

## Module 18: Common Query Patterns

### Sort Ascending

```sql
SELECT *
FROM students
ORDER BY column_name ASC;
```

### Sort Descending

```sql
SELECT *
FROM students
ORDER BY column_name DESC;
```

### Sort Using Default Ascending Order

```sql
SELECT *
FROM students
ORDER BY column_name;
```

### Find `NULL` Values

```sql
SELECT *
FROM students
WHERE column_name IS NULL;
```

### Find Non-`NULL` Values

```sql
SELECT *
FROM students
WHERE column_name IS NOT NULL;
```

### Filter and Sort

```sql
SELECT *
FROM students
WHERE condition
ORDER BY column_name;
```

### Filter `NULL` Values and Sort

```sql
SELECT *
FROM students
WHERE column_name IS NULL
ORDER BY another_column;
```

### Multiple Column Sorting

```sql
SELECT *
FROM students
ORDER BY column1 ASC, column2 DESC;
```

---

## Module 19: Important SQL Commands

### Ascending Sort

```sql
SELECT fname, birth_date
FROM students
ORDER BY birth_date ASC;
```

### Descending Sort

```sql
SELECT fname, birth_date
FROM students
ORDER BY birth_date DESC;
```

### Find `NULL` Telephone Numbers

```sql
SELECT fname
FROM students
WHERE tp_no IS NULL;
```

### Find Non-`NULL` Telephone Numbers

```sql
SELECT fname
FROM students
WHERE tp_no IS NOT NULL;
```

### Filter and Sort

```sql
SELECT fname, birth_date
FROM students
WHERE birth_date IS NOT NULL
ORDER BY birth_date DESC;
```

---

## Module 20: Exam-Focused Key Concepts

### What is `ORDER BY`?

`ORDER BY` is used to sort the rows returned by a query.

### What is the default sort direction?

The default sort direction is ascending (`ASC`).

### How do you sort in descending order?

Use:

```sql
ORDER BY column_name DESC;
```

### What does `ASC` mean?

`ASC` means ascending order.

### What does `DESC` mean?

`DESC` means descending order.

### What is `NULL`?

`NULL` represents missing, unknown, or unavailable data.

### Can you use `= NULL`?

No.

Incorrect:

```sql
WHERE column_name = NULL;
```

### How do you find `NULL` values?

Use:

```sql
WHERE column_name IS NULL;
```

### How do you find non-`NULL` values?

Use:

```sql
WHERE column_name IS NOT NULL;
```

---

## Module 21: Complete Practical Workflow

A typical query workflow involving sorting and `NULL` values is:

```text
1. Select the required columns
        ↓
2. Select the table
        ↓
3. Filter rows using WHERE if required
        ↓
4. Check NULL values using IS NULL / IS NOT NULL
        ↓
5. Sort the result using ORDER BY
        ↓
6. Choose ASC or DESC
        ↓
7. Execute and examine the result
```

Example:

```sql
SELECT fname, birth_date
FROM students
WHERE birth_date IS NOT NULL
ORDER BY birth_date DESC;
```

This query:

```text
SELECT
    ↓
Choose fname and birth_date

FROM
    ↓
Use students table

WHERE
    ↓
Keep only rows with a known birth date

ORDER BY
    ↓
Sort by birth date

DESC
    ↓
Newest date first
```

---

## Module 22: Quick Comparison Table

| Requirement               | SQL                         |
| ------------------------- | --------------------------- |
| Sort ascending            | `ORDER BY column ASC`       |
| Sort descending           | `ORDER BY column DESC`      |
| Default sorting           | `ORDER BY column`           |
| Find missing values       | `IS NULL`                   |
| Find existing values      | `IS NOT NULL`               |
| Incorrect NULL comparison | `= NULL`                    |
| Multiple sorting columns  | `ORDER BY column1, column2` |

---

## Module 23: Quick Study Summary

Remember these fundamental concepts:

### `ORDER BY`

Used to organize query results.

```sql
ORDER BY column_name;
```

### `ASC`

Sorts in ascending order.

```sql
ORDER BY column_name ASC;
```

### `DESC`

Sorts in descending order.

```sql
ORDER BY column_name DESC;
```

### `NULL`

Represents a missing or unknown value.

### `IS NULL`

Finds rows containing `NULL`.

```sql
WHERE column_name IS NULL;
```

### `IS NOT NULL`

Finds rows that contain a value.

```sql
WHERE column_name IS NOT NULL;
```

### Never Use `= NULL`

Incorrect:

```sql
WHERE column_name = NULL;
```

Correct:

```sql
WHERE column_name IS NULL;
```

---

## Module 24: Revision Checklist

- [ ] Understand the purpose of `ORDER BY`.
- [ ] Know that ascending order is the default.
- [ ] Understand the `ASC` keyword.
- [ ] Understand the `DESC` keyword.
- [ ] Know how to sort dates.
- [ ] Know how to sort text values.
- [ ] Know how to combine `WHERE` with `ORDER BY`.
- [ ] Understand what `NULL` represents.
- [ ] Understand that `NULL` is not zero.
- [ ] Understand that `NULL` is not an empty string.
- [ ] Never use `= NULL`.
- [ ] Never use `!= NULL` to test for `NULL`.
- [ ] Use `IS NULL` to find missing values.
- [ ] Use `IS NOT NULL` to find existing values.
- [ ] Know how to combine `IS NULL` with `ORDER BY`.
- [ ] Know how to combine `IS NOT NULL` with `ORDER BY`.
- [ ] Understand multiple-column sorting.
- [ ] Know that the first `ORDER BY` column has the highest priority.

---

## Module 25: Final Exam Revision

Remember these commands:

> **`ORDER BY column_name;` = Sort query results in ascending order**

> **`ORDER BY column_name ASC;` = Explicit ascending sort**

> **`ORDER BY column_name DESC;` = Descending sort**

> **`IS NULL` = Find missing or unknown values**

> **`IS NOT NULL` = Find values that are present**

> **Never use `= NULL` to test for NULL**

### Core Sorting Examples

```sql
SELECT fname, birth_date
FROM students
ORDER BY birth_date;
```

```sql
SELECT fname, birth_date
FROM students
ORDER BY birth_date ASC;
```

```sql
SELECT fname, birth_date
FROM students
ORDER BY birth_date DESC;
```

### Core NULL Examples

```sql
SELECT fname
FROM students
WHERE tp_no IS NULL;
```

```sql
SELECT fname
FROM students
WHERE tp_no IS NOT NULL;
```

### Combining Filtering, NULL Handling, and Sorting

```sql
SELECT fname, birth_date
FROM students
WHERE birth_date IS NOT NULL
ORDER BY birth_date DESC;
```

This query means:

```text
Select student name and birth date
        ↓
From students
        ↓
Ignore records with missing birth dates
        ↓
Sort remaining records
        ↓
Show newest birth dates first
```

### Final Key Takeaway

The most important concepts from Lecture 06 are:

```text
ORDER BY
    ↓
Controls result ordering

ASC
    ↓
Ascending order

DESC
    ↓
Descending order

NULL
    ↓
Missing / unknown value

IS NULL
    ↓
Find missing values

IS NOT NULL
    ↓
Find existing values
```

The fundamental query patterns are:

```sql
SELECT *
FROM students
ORDER BY birth_date;
```

```sql
SELECT *
FROM students
ORDER BY birth_date DESC;
```

```sql
SELECT *
FROM students
WHERE tp_no IS NULL;
```

```sql
SELECT *
FROM students
WHERE tp_no IS NOT NULL;
```

```sql
SELECT fname, birth_date
FROM students
WHERE birth_date IS NOT NULL
ORDER BY birth_date DESC;
```

> **Master `ORDER BY`, `ASC`, `DESC`, `IS NULL`, and `IS NOT NULL`. These concepts form an important foundation for more advanced SQL querying and data analysis.**

