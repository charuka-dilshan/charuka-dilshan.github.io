# SQL Joins: Comprehensive Guide to Combining Tables (Lecture 09)


<!--more-->

> **Academic Note:** This master study guide covers Lecture 09 notes, detailing how to combine data from two or more tables using various types of SQL Joins.

---

## Module 1: What is an SQL Join?

A **JOIN** clause is used to combine rows from two or more tables based on a related column between them, creating a temporary result set of rows.

Joins are one of the most important concepts in relational databases because information is normally distributed across multiple related tables.

### 1.1 Why Are Joins Needed?

Consider a hotel database containing separate tables such as:

- `Hotel`
- `Room`
- `Guest`
- `Booking`

The `Hotel` table may contain hotel information, while the `Room` table contains room information. To display a hotel name together with its rooms, information from both tables must be combined.

For example:

```sql
SELECT Hotel.HotelName, Room.RoomNo, Room.Type
FROM Hotel
INNER JOIN Room
ON Hotel.HotelNo = Room.HotelNo;
```

The `JOIN` operation allows related records from different tables to be displayed together.

---

### 1.2 Classifications of Joins

SQL joins can be classified according to the condition used to match rows.

#### EQUI JOIN

An **Equi-Join** uses the equality operator (`=`) as the comparison operator.

Example:

```sql
SELECT *
FROM Hotel
JOIN Room
ON Hotel.HotelNo = Room.HotelNo;
```

The rows are matched when:

```text
Hotel.HotelNo = Room.HotelNo
```

#### NON-EQUI JOIN

A **Non-Equi-Join** uses comparison operators other than `=`.

Examples include:

- `>`
- `<`
- `>=`
- `<=`
- `<>`

Example:

```sql
SELECT *
FROM Room R1
JOIN Room R2
ON R1.Price > R2.Price;
```

---

## Module 2: Complete List of SQL Joins

The major SQL join types are:

1. **INNER JOIN**
2. **LEFT JOIN**
3. **RIGHT JOIN**
4. **FULL OUTER JOIN**
5. **NATURAL JOIN**
6. **CROSS JOIN**
7. **SELF JOIN**

The following sections explain each type in detail.

---

## Module 3: INNER JOIN

An **INNER JOIN** returns only rows where a matching record exists in both tables.

### 3.1 Definition

An Inner Join compares related columns from two tables and returns only the matching records.

If a record exists in the first table but has no matching record in the second table, it is excluded from the result.

### 3.2 General Syntax

```sql
SELECT columns
FROM table_A
INNER JOIN table_B
ON table_A.column = table_B.column;
```

### 3.3 Basic Example

```sql
SELECT *
FROM table_A
INNER JOIN table_B
ON table_A.A = table_B.A;
```

### 3.4 Hotel Database Example

To display hotel names together with their rooms:

```sql
SELECT Hotel.HotelName,
       Room.RoomNo,
       Room.Type,
       Room.Price
FROM Hotel
INNER JOIN Room
ON Hotel.HotelNo = Room.HotelNo;
```

This query returns only hotels that have matching records in the `Room` table.

### 3.5 Important Rule

> **INNER JOIN = Return only matching rows from both tables.**

---

## Module 4: LEFT JOIN

A **LEFT JOIN**, also called a **LEFT OUTER JOIN**, returns every row from the left table and matching rows from the right table.

If no matching row exists in the right table, the right-side columns contain `NULL`.

### 4.1 General Syntax

```sql
SELECT columns
FROM table_A
LEFT JOIN table_B
ON table_A.column = table_B.column;
```

### 4.2 Example

```sql
SELECT *
FROM table_A
LEFT JOIN table_B
ON table_A.A = table_B.A;
```

### 4.3 Hotel Example

To display all hotels, including hotels that do not currently have rooms:

```sql
SELECT Hotel.HotelName,
       Room.RoomNo,
       Room.Type
FROM Hotel
LEFT JOIN Room
ON Hotel.HotelNo = Room.HotelNo;
```

This is particularly useful when you want to preserve every record from the left table.

### 4.4 Important Rule

> **LEFT JOIN = Keep all rows from the left table.**

If there is no matching record on the right:

```text
Right-side columns = NULL
```

---

## Module 5: RIGHT JOIN

A **RIGHT JOIN**, also called a **RIGHT OUTER JOIN**, returns every row from the right table and matching rows from the left table.

If there is no matching row in the left table, the left-side columns contain `NULL`.

### 5.1 General Syntax

```sql
SELECT columns
FROM table_A
RIGHT JOIN table_B
ON table_A.column = table_B.column;
```

### 5.2 Example

```sql
SELECT *
FROM table_A
RIGHT JOIN table_B
ON table_A.A = table_B.A;
```

### 5.3 Hotel Example

```sql
SELECT Hotel.HotelName,
       Room.RoomNo,
       Room.Type
FROM Hotel
RIGHT JOIN Room
ON Hotel.HotelNo = Room.HotelNo;
```

This query preserves every row from the `Room` table.

### 5.4 Important Rule

> **RIGHT JOIN = Keep all rows from the right table.**

---

## Module 6: FULL OUTER JOIN

A **FULL OUTER JOIN** returns all matching and non-matching rows from both tables.

It combines the behavior of:

- `LEFT JOIN`
- `RIGHT JOIN`

### 6.1 Concept

A Full Outer Join returns:

```text
Matching rows
+
Unmatched rows from the left table
+
Unmatched rows from the right table
```

Missing values are represented by `NULL`.

### 6.2 Standard SQL Syntax

```sql
SELECT *
FROM table_A
FULL OUTER JOIN table_B
ON table_A.A = table_B.A;
```

### 6.3 Important MySQL Note

MySQL does **not** directly support the `FULL OUTER JOIN` syntax.

A Full Outer Join can instead be simulated using `LEFT JOIN`, `RIGHT JOIN`, and `UNION`.

Example:

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

### 6.4 Important Rule

> **FULL OUTER JOIN = Keep all rows from both tables.**

---

## Module 7: NATURAL JOIN

A **NATURAL JOIN** is a special type of Equi-Join.

It automatically matches columns that have the same name in both tables.

### 7.1 Definition

A Natural Join automatically identifies columns with matching names and compatible data types.

For example, if both tables contain:

```text
HotelNo
```

MySQL can automatically use that column as the joining condition.

### 7.2 Syntax

```sql
SELECT *
FROM table_A
NATURAL JOIN table_B;
```

### 7.3 Hotel Example

```sql
SELECT *
FROM Hotel
NATURAL JOIN Room;
```

If both tables contain a compatible column called `HotelNo`, MySQL automatically uses it to establish the relationship.

### 7.4 Important Rule

Do **not** use an `ON` clause with a Natural Join.

Correct:

```sql
SELECT *
FROM Hotel
NATURAL JOIN Room;
```

Incorrect:

```sql
SELECT *
FROM Hotel
NATURAL JOIN Room
ON Hotel.HotelNo = Room.HotelNo;
```

### 7.5 Important Warning

Natural Joins should be used carefully because adding another column with the same name to either table can change the automatic joining behavior.

---

## Module 8: CROSS JOIN

A **CROSS JOIN** produces a Cartesian product.

Every row from the first table is combined with every row from the second table.

### 8.1 Definition

If:

```text
Table A = 5 rows
Table B = 4 rows
```

then:

```text
CROSS JOIN result = 5 × 4 = 20 rows
```

### 8.2 Syntax

```sql
SELECT *
FROM table_A
CROSS JOIN table_B;
```

### 8.3 Example

```sql
SELECT *
FROM Hotel
CROSS JOIN Room;
```

Every hotel is combined with every room record.

### 8.4 Cartesian Product Formula

```text
Number of result rows =
Rows in Table A × Rows in Table B
```

### 8.5 CROSS JOIN with WHERE

A Cross Join can be combined with a `WHERE` condition.

For example:

```sql
SELECT *
FROM Hotel, Room
WHERE Hotel.HotelNo = Room.HotelNo;
```

This produces results similar to an Inner Join.

### 8.6 Important Rule

> **CROSS JOIN = Every row from Table A × Every row from Table B.**

---

## Module 9: SELF JOIN

A **SELF JOIN** occurs when a table is joined with itself.

The same table is treated as two separate logical instances by using aliases.

### 9.1 Why Use a Self Join?

Self Joins are useful when records within the same table have relationships with other records in that same table.

Common examples include:

- Employee and manager relationships
- Parent and child relationships
- Hierarchical structures
- Comparing records within the same table

### 9.2 Basic Syntax

```sql
SELECT *
FROM table_A X
JOIN table_A Y
ON X.A = Y.A;
```

### 9.3 Example

```sql
SELECT *
FROM table_A X, table_A Y
WHERE X.A = Y.A;
```

Here:

```text
X = first logical copy of table_A
Y = second logical copy of table_A
```

### 9.4 Employee Example

Suppose an employee table contains:

```text
EmployeeID
EmployeeName
ManagerID
```

A Self Join can be used to display employees and their managers:

```sql
SELECT E.EmployeeName AS Employee,
       M.EmployeeName AS Manager
FROM Employee E
LEFT JOIN Employee M
ON E.ManagerID = M.EmployeeID;
```

---

## Module 10: Equi-Join vs Non-Equi-Join

### 10.1 Equi-Join

An Equi-Join uses:

```sql
=
```

Example:

```sql
SELECT *
FROM Hotel
JOIN Room
ON Hotel.HotelNo = Room.HotelNo;
```

### 10.2 Non-Equi-Join

A Non-Equi-Join uses operators such as:

```text
>
<
>=
<=
<>
```

Example:

```sql
SELECT R1.RoomNo,
       R1.Price,
       R2.RoomNo,
       R2.Price
FROM Room R1
JOIN Room R2
ON R1.Price > R2.Price;
```

### 10.3 Comparison

| Join Type     | Condition                  |
| ------------- | -------------------------- |
| Equi-Join     | `=`                        |
| Non-Equi-Join | `>`, `<`, `>=`, `<=`, `<>` |

---

## Module 11: Practical Hotel Database Join Queries

The following examples demonstrate how joins can be applied to the hotel database.

### 11.1 Display Hotels and Their Rooms

```sql
SELECT Hotel.HotelName,
       Room.RoomNo,
       Room.Type,
       Room.Price
FROM Hotel
INNER JOIN Room
ON Hotel.HotelNo = Room.HotelNo;
```

This displays only hotels that have corresponding room records.

---

### 11.2 Display All Hotels Including Hotels Without Rooms

Use a `LEFT JOIN`:

```sql
SELECT Hotel.HotelName,
       Room.RoomNo,
       Room.Type
FROM Hotel
LEFT JOIN Room
ON Hotel.HotelNo = Room.HotelNo;
```

This ensures that hotels without rooms are still displayed.

Their room-related columns will contain:

```text
NULL
```

---

### 11.3 Display All Rooms with Their Hotel Names

```sql
SELECT Room.RoomNo,
       Room.Type,
       Room.Price,
       Hotel.HotelName
FROM Room
INNER JOIN Hotel
ON Room.HotelNo = Hotel.HotelNo;
```

This combines room information with the corresponding hotel name.

---

### 11.4 Display Guests and Their Bookings

To display guests together with their booking information:

```sql
SELECT Guest.GuestName,
       Booking.HotelNo,
       Booking.RoomNo,
       Booking.DateFrom,
       Booking.DateTo
FROM Guest
INNER JOIN Booking
ON Guest.GuestNo = Booking.GuestNo;
```

---

### 11.5 Display Booking Information with Hotel Names

```sql
SELECT Guest.GuestName,
       Hotel.HotelName,
       Booking.RoomNo,
       Booking.DateFrom,
       Booking.DateTo
FROM Booking
INNER JOIN Guest
ON Booking.GuestNo = Guest.GuestNo
INNER JOIN Hotel
ON Booking.HotelNo = Hotel.HotelNo;
```

This query combines information from three tables:

```text
Booking
   ↓
Guest
   ↓
Hotel
```

---

### 11.6 Display Room Information with Hotel and City

```sql
SELECT Hotel.HotelName,
       Hotel.City,
       Room.RoomNo,
       Room.Type,
       Room.Price
FROM Hotel
INNER JOIN Room
ON Hotel.HotelNo = Room.HotelNo;
```

---

### 11.7 Display All Hotels and Their Available Rooms

```sql
SELECT Hotel.HotelName,
       Hotel.City,
       Room.RoomNo,
       Room.Type,
       Room.Price
FROM Hotel
LEFT JOIN Room
ON Hotel.HotelNo = Room.HotelNo
ORDER BY Hotel.HotelName;
```

---

## Module 12: Joining Multiple Tables

SQL allows more than two tables to be joined in a single query.

For example, the hotel database can connect:

```text
Hotel
  ↓
Room

Hotel
  ↓
Booking
  ↓
Guest
```

### 12.1 Three-Table Join

```sql
SELECT Hotel.HotelName,
       Guest.GuestName,
       Booking.RoomNo,
       Booking.DateFrom,
       Booking.DateTo
FROM Booking
INNER JOIN Hotel
ON Booking.HotelNo = Hotel.HotelNo
INNER JOIN Guest
ON Booking.GuestNo = Guest.GuestNo;
```

This query combines:

- `Booking`
- `Hotel`
- `Guest`

---

### 12.2 Four-Table Join

To combine all four hotel database tables:

```sql
SELECT Hotel.HotelName,
       Room.RoomNo,
       Room.Type,
       Guest.GuestName,
       Booking.DateFrom,
       Booking.DateTo
FROM Booking
INNER JOIN Hotel
ON Booking.HotelNo = Hotel.HotelNo
INNER JOIN Room
ON Booking.HotelNo = Room.HotelNo
AND Booking.RoomNo = Room.RoomNo
INNER JOIN Guest
ON Booking.GuestNo = Guest.GuestNo;
```

This demonstrates how multiple relationships can be used in one query.

---

## Module 13: JOIN Conditions and the `ON` Clause

The `ON` clause specifies how two tables are related.

Example:

```sql
SELECT *
FROM Hotel
INNER JOIN Room
ON Hotel.HotelNo = Room.HotelNo;
```

The condition:

```sql
Hotel.HotelNo = Room.HotelNo
```

tells MySQL which records should be matched.

### 13.1 Why Is `ON` Important?

Without an appropriate join condition, the query may produce incorrect results or a Cartesian product.

Always identify the relationship between the tables before writing the Join condition.

---

## Module 14: Table Aliases

Table aliases make complex Join queries shorter and easier to read.

Instead of:

```sql
SELECT Hotel.HotelName,
       Room.RoomNo,
       Room.Price
FROM Hotel
INNER JOIN Room
ON Hotel.HotelNo = Room.HotelNo;
```

we can write:

```sql
SELECT H.HotelName,
       R.RoomNo,
       R.Price
FROM Hotel H
INNER JOIN Room R
ON H.HotelNo = R.HotelNo;
```

Here:

```text
H = Hotel
R = Room
```

### 14.1 Alias Syntax

```sql
FROM Hotel H
```

means:

```text
Hotel → H
```

and:

```sql
FROM Room R
```

means:

```text
Room → R
```

---

## Module 15: INNER JOIN vs OUTER JOIN

### INNER JOIN

Returns only matching records.

```text
Table A     Table B
   ○─────────○
    Matching
```

### LEFT JOIN

Returns all records from the left table.

```text
LEFT TABLE + matching RIGHT TABLE
```

### RIGHT JOIN

Returns all records from the right table.

```text
RIGHT TABLE + matching LEFT TABLE
```

### FULL OUTER JOIN

Returns all records from both tables.

```text
LEFT TABLE + RIGHT TABLE
```

### Quick Comparison

| Join            | Matching Rows | Unmatched Left | Unmatched Right |
| --------------- | ------------: | -------------: | --------------: |
| INNER JOIN      |           Yes |             No |              No |
| LEFT JOIN       |           Yes |            Yes |              No |
| RIGHT JOIN      |           Yes |             No |             Yes |
| FULL OUTER JOIN |           Yes |            Yes |             Yes |

---

## Module 16: NULL Values in Outer Joins

Outer Joins commonly produce `NULL` values.

For example:

```sql
SELECT Hotel.HotelName,
       Room.RoomNo
FROM Hotel
LEFT JOIN Room
ON Hotel.HotelNo = Room.HotelNo;
```

If a hotel does not have a matching room:

```text
HotelName      RoomNo
-------------  ------
Some Hotel     NULL
```

The `NULL` does not mean that the hotel does not exist.

It means that no matching record was found in the `Room` table.

---

## Module 17: Common JOIN Errors

### Problem 1: Missing JOIN Condition

Incorrect:

```sql
SELECT *
FROM Hotel
JOIN Room;
```

A Join normally requires a condition unless a Cartesian product is intentionally required.

Correct:

```sql
SELECT *
FROM Hotel
JOIN Room
ON Hotel.HotelNo = Room.HotelNo;
```

---

### Problem 2: Incorrect Join Columns

Incorrect:

```sql
SELECT *
FROM Hotel
JOIN Room
ON Hotel.City = Room.Price;
```

The columns being compared must represent a meaningful relationship.

Correct:

```sql
SELECT *
FROM Hotel
JOIN Room
ON Hotel.HotelNo = Room.HotelNo;
```

---

### Problem 3: Ambiguous Column Names

When multiple tables contain columns with the same name, specify the table name or alias.

Instead of:

```sql
SELECT HotelNo
FROM Hotel
JOIN Room
ON Hotel.HotelNo = Room.HotelNo;
```

use:

```sql
SELECT Hotel.HotelNo
FROM Hotel
JOIN Room
ON Hotel.HotelNo = Room.HotelNo;
```

---

### Problem 4: Forgetting the Relationship

Before creating a Join, identify:

```text
Which table?
       ↓
Which related column?
       ↓
What type of Join?
       ↓
What output is required?
```

---

## Module 18: Join Selection Guide

Use an **INNER JOIN** when:

> You only want matching records.

Use a **LEFT JOIN** when:

> You want every record from the left table, even when no match exists.

Use a **RIGHT JOIN** when:

> You want every record from the right table, even when no match exists.

Use a **FULL OUTER JOIN** when:

> You want every record from both tables.

Use a **NATURAL JOIN** when:

> Tables have appropriately named common columns and automatic matching is desired.

Use a **CROSS JOIN** when:

> You intentionally need every possible combination of rows.

Use a **SELF JOIN** when:

> A table needs to be compared or related to itself.

---

## Module 19: Exam-Focused JOIN Examples

### Example 1: Inner Join

```sql
SELECT Hotel.HotelName,
       Room.RoomNo
FROM Hotel
INNER JOIN Room
ON Hotel.HotelNo = Room.HotelNo;
```

**Purpose:** Display hotels that have matching rooms.

---

### Example 2: Left Join

```sql
SELECT Hotel.HotelName,
       Room.RoomNo
FROM Hotel
LEFT JOIN Room
ON Hotel.HotelNo = Room.HotelNo;
```

**Purpose:** Display all hotels, including hotels without rooms.

---

### Example 3: Right Join

```sql
SELECT Hotel.HotelName,
       Room.RoomNo
FROM Hotel
RIGHT JOIN Room
ON Hotel.HotelNo = Room.HotelNo;
```

**Purpose:** Display all rooms, including any rooms without a matching hotel.

---

### Example 4: Natural Join

```sql
SELECT *
FROM Hotel
NATURAL JOIN Room;
```

**Purpose:** Automatically join tables using identically named compatible columns.

---

### Example 5: Cross Join

```sql
SELECT *
FROM Hotel
CROSS JOIN Room;
```

**Purpose:** Generate every possible hotel-room combination.

---

### Example 6: Self Join

```sql
SELECT X.A,
       Y.A
FROM table_A X
JOIN table_A Y
ON X.A = Y.A;
```

**Purpose:** Compare or relate records within the same table.

---

## Module 20: JOIN Syntax Summary

### INNER JOIN

```sql
SELECT columns
FROM table_A
INNER JOIN table_B
ON table_A.key = table_B.key;
```

### LEFT JOIN

```sql
SELECT columns
FROM table_A
LEFT JOIN table_B
ON table_A.key = table_B.key;
```

### RIGHT JOIN

```sql
SELECT columns
FROM table_A
RIGHT JOIN table_B
ON table_A.key = table_B.key;
```

### FULL OUTER JOIN

Standard SQL:

```sql
SELECT columns
FROM table_A
FULL OUTER JOIN table_B
ON table_A.key = table_B.key;
```

MySQL alternative:

```sql
SELECT *
FROM table_A
LEFT JOIN table_B
ON table_A.key = table_B.key

UNION

SELECT *
FROM table_A
RIGHT JOIN table_B
ON table_A.key = table_B.key;
```

### NATURAL JOIN

```sql
SELECT *
FROM table_A
NATURAL JOIN table_B;
```

### CROSS JOIN

```sql
SELECT *
FROM table_A
CROSS JOIN table_B;
```

### SELF JOIN

```sql
SELECT *
FROM table_A X
JOIN table_A Y
ON X.key = Y.key;
```

---

## Module 21: Quick Study Summary Checklist

- [ ] Understand that a `JOIN` combines rows from multiple related tables.
- [ ] Understand the difference between Equi-Joins and Non-Equi-Joins.
- [ ] Know that Equi-Joins use `=`.
- [ ] Know that Non-Equi-Joins use operators such as `>`, `<`, `>=`, `<=`, and `<>`.
- [ ] Understand that `INNER JOIN` returns only matching rows.
- [ ] Understand that `LEFT JOIN` preserves all rows from the left table.
- [ ] Understand that `RIGHT JOIN` preserves all rows from the right table.
- [ ] Understand that `FULL OUTER JOIN` preserves rows from both tables.
- [ ] Remember that MySQL does not directly support `FULL OUTER JOIN`.
- [ ] Know how `UNION` can be used to simulate a Full Outer Join in MySQL.
- [ ] Understand that `NATURAL JOIN` automatically matches columns with the same name.
- [ ] Remember that a Natural Join does not use an `ON` clause.
- [ ] Understand that `CROSS JOIN` creates a Cartesian product.
- [ ] Remember the formula:

```text
Rows(A) × Rows(B)
```

- [ ] Understand the purpose of a `SELF JOIN`.
- [ ] Know how to use table aliases.
- [ ] Understand the purpose of the `ON` clause.
- [ ] Know how to join three or more tables.
- [ ] Understand why outer joins can produce `NULL` values.

---

## Final Exam Revision

Remember these definitions:

> **INNER JOIN** = Only matching rows.

> **LEFT JOIN** = All left rows + matching right rows.

> **RIGHT JOIN** = All right rows + matching left rows.

> **FULL OUTER JOIN** = All rows from both tables.

> **NATURAL JOIN** = Automatically joins same-named compatible columns.

> **CROSS JOIN** = Cartesian product of two tables.

> **SELF JOIN** = A table joined with itself.

> **EQUI JOIN** = Join condition uses `=`.

> **NON-EQUI JOIN** = Join condition uses operators other than `=`.

---

## Complete JOIN Workflow

```text
Identify Tables
       ↓
Identify Related Columns
       ↓
Choose JOIN Type
       ↓
Write FROM Clause
       ↓
Write JOIN Clause
       ↓
Write ON Condition
       ↓
Select Required Columns
       ↓
Add WHERE / ORDER BY if Required
       ↓
Execute Query
       ↓
Verify Results
```

---

## Core JOIN Examples to Memorize

### INNER JOIN

```sql
SELECT Hotel.HotelName,
       Room.RoomNo
FROM Hotel
INNER JOIN Room
ON Hotel.HotelNo = Room.HotelNo;
```

### LEFT JOIN

```sql
SELECT Hotel.HotelName,
       Room.RoomNo
FROM Hotel
LEFT JOIN Room
ON Hotel.HotelNo = Room.HotelNo;
```

### RIGHT JOIN

```sql
SELECT Hotel.HotelName,
       Room.RoomNo
FROM Hotel
RIGHT JOIN Room
ON Hotel.HotelNo = Room.HotelNo;
```

### NATURAL JOIN

```sql
SELECT *
FROM Hotel
NATURAL JOIN Room;
```

### CROSS JOIN

```sql
SELECT *
FROM Hotel
CROSS JOIN Room;
```

### SELF JOIN

```sql
SELECT X.A,
       Y.A
FROM table_A X
JOIN table_A Y
ON X.A = Y.A;
```

### Multiple Table JOIN

```sql
SELECT Hotel.HotelName,
       Guest.GuestName,
       Booking.RoomNo,
       Booking.DateFrom
FROM Booking
INNER JOIN Hotel
ON Booking.HotelNo = Hotel.HotelNo
INNER JOIN Guest
ON Booking.GuestNo = Guest.GuestNo;
```

---

## Final Reminder

The most important concept in SQL Joins is understanding **how tables are related**.

For the hotel database:

```text
Hotel
  │
  │ HotelNo
  ↓
Room
```

and:

```text
Hotel
  │
  │ HotelNo
  ↓
Booking
  │
  │ GuestNo
  ↓
Guest
```

Once the relationships between tables are understood, selecting the appropriate Join becomes much easier.

The key rules to remember are:

> **INNER JOIN → Matching records only**

> **LEFT JOIN → Everything from the left**

> **RIGHT JOIN → Everything from the right**

> **FULL OUTER JOIN → Everything from both**

> **NATURAL JOIN → Automatic matching by common column names**

> **CROSS JOIN → Every possible combination**

> **SELF JOIN → Table joined with itself**

Understanding these Join types provides the foundation for writing complex relational database queries in MySQL.

