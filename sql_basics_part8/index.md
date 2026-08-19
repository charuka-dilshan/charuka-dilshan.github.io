# Creating & Handling Multiple Tables in a Database (Lecture 08)


<!--more-->

> **Academic Note:** This master study guide covers Lecture 08 notes, focusing on relational database design, multiple table structures, primary and foreign keys, composite keys, aggregate functions, filtering, sorting, pattern matching, NULL handling, and practical SQL queries.

---

## Module 1: Introduction to Relational Database Design

A relational database organizes information into multiple tables that are connected through relationships.

Instead of storing all information in one large table, related information is separated into different tables.

For the hotel management system, the database contains four main tables:

1. **`Hotel`** — Stores information about hotels.
2. **`Room`** — Stores information about rooms belonging to hotels.
3. **`Guest`** — Stores information about hotel guests.
4. **`Booking`** — Stores information about room bookings.

The relationships between these tables are established using **primary keys** and **foreign keys**.

---

## Module 2: Understanding the Database Schema

The hotel database contains the following structure:

```text
Hotel
 │
 ├── HotelNo (Primary Key)
 ├── HotelName
 └── City
       │
       │
       └──────────────┐
                      ↓
                    Room
                      │
                      ├── RoomNo
                      ├── HotelNo (Foreign Key)
                      ├── Type
                      └── Price

Guest
 │
 ├── GuestNo (Primary Key)
 ├── GuestName
 └── GuestAddress
       │
       │
       └──────────────┐
                      ↓
                   Booking
                      │
                      ├── HotelNo (Foreign Key)
                      ├── GuestNo (Foreign Key)
                      ├── DateFrom
                      ├── DateTo
                      └── RoomNo
```

### Main Keys

| Table     | Primary Key                      |
| --------- | -------------------------------- |
| `Hotel`   | `HotelNo`                        |
| `Room`    | `RoomNo`, `HotelNo`              |
| `Guest`   | `GuestNo`                        |
| `Booking` | `HotelNo`, `GuestNo`, `DateFrom` |

---

## Module 3: Primary Keys

A **primary key** is a column, or combination of columns, that uniquely identifies each row in a table.

A primary key:

- Must uniquely identify records.
- Cannot contain duplicate values.
- Cannot contain `NULL` values.
- Helps establish relationships between tables.

### Example

The `Hotel` table uses `HotelNo` as its primary key:

```sql
CREATE TABLE Hotel (
    HotelNo VARCHAR(10) PRIMARY KEY,
    HotelName VARCHAR(50),
    City VARCHAR(30)
);
```

Each hotel must have a unique `HotelNo`.

Example values:

```text
ch01
ch02
dc01
fb01
fb02
```

---

## Module 4: Composite Primary Keys

A **composite primary key** consists of two or more columns.

The `Room` table uses:

```text
RoomNo + HotelNo
```

as its composite primary key.

This is necessary because the same room number can exist in different hotels.

For example:

```text
RoomNo = 1001, HotelNo = ch01
RoomNo = 1001, HotelNo = dc01
RoomNo = 1001, HotelNo = fb02
```

Although the `RoomNo` is the same, the combination of `RoomNo` and `HotelNo` is unique.

The table definition is:

```sql
CREATE TABLE Room (
    RoomNo INT,
    HotelNo VARCHAR(10),
    Type VARCHAR(20),
    Price DECIMAL(6,2),
    PRIMARY KEY (RoomNo, HotelNo)
);
```

---

## Module 5: Foreign Keys

A **foreign key** is a column that refers to a primary key in another table.

Foreign keys establish relationships between tables.

For example, `Room.HotelNo` refers to `Hotel.HotelNo`:

```sql
FOREIGN KEY (HotelNo) REFERENCES Hotel(HotelNo)
```

Similarly, the `Booking` table contains foreign keys referencing the `Hotel` and `Guest` tables.

```sql
FOREIGN KEY (HotelNo) REFERENCES Hotel(HotelNo),
FOREIGN KEY (GuestNo) REFERENCES Guest(GuestNo)
```

### Relationship Summary

```text
Hotel.HotelNo
      ↑
      │
Room.HotelNo
```

and:

```text
Hotel.HotelNo
      ↑
      │
Booking.HotelNo
```

```text
Guest.GuestNo
      ↑
      │
Booking.GuestNo
```

---

## Module 6: Creating the Database

First, create the hotel database:

```sql
CREATE DATABASE hotel_db;
```

Then select it:

```sql
USE hotel_db;
```

The `USE` statement tells MySQL that subsequent table operations should be performed inside `hotel_db`.

---

## Module 7: Creating the `Hotel` Table

The `Hotel` table stores basic information about hotels.

```sql
CREATE TABLE Hotel (
    HotelNo VARCHAR(10) PRIMARY KEY,
    HotelName VARCHAR(50),
    City VARCHAR(30)
);
```

### Column Explanation

| Column      | Data Type     | Purpose                 |
| ----------- | ------------- | ----------------------- |
| `HotelNo`   | `VARCHAR(10)` | Unique hotel identifier |
| `HotelName` | `VARCHAR(50)` | Hotel name              |
| `City`      | `VARCHAR(30)` | Location of the hotel   |

`HotelNo` is the primary key.

---

## Module 8: Creating the `Room` Table

The `Room` table stores information about rooms in each hotel.

```sql
CREATE TABLE Room (
    RoomNo INT,
    HotelNo VARCHAR(10),
    Type VARCHAR(20),
    Price DECIMAL(6,2),
    PRIMARY KEY (RoomNo, HotelNo),
    FOREIGN KEY (HotelNo) REFERENCES Hotel(HotelNo)
);
```

### Column Explanation

| Column    | Data Type      | Purpose          |
| --------- | -------------- | ---------------- |
| `RoomNo`  | `INT`          | Room number      |
| `HotelNo` | `VARCHAR(10)`  | Associated hotel |
| `Type`    | `VARCHAR(20)`  | Room type        |
| `Price`   | `DECIMAL(6,2)` | Price per night  |

The combination of:

```text
RoomNo + HotelNo
```

forms the primary key.

---

## Module 9: Creating the `Guest` Table

The `Guest` table stores information about hotel guests.

```sql
CREATE TABLE Guest (
    GuestNo INT PRIMARY KEY,
    GuestName VARCHAR(50),
    GuestAddress VARCHAR(100)
);
```

### Column Explanation

| Column         | Data Type      | Purpose                 |
| -------------- | -------------- | ----------------------- |
| `GuestNo`      | `INT`          | Unique guest identifier |
| `GuestName`    | `VARCHAR(50)`  | Guest name              |
| `GuestAddress` | `VARCHAR(100)` | Guest address           |

`GuestNo` is the primary key.

---

## Module 10: Creating the `Booking` Table

The `Booking` table stores booking information.

```sql
CREATE TABLE Booking (
    HotelNo VARCHAR(10),
    GuestNo INT,
    DateFrom DATE,
    DateTo DATE,
    RoomNo INT,
    PRIMARY KEY (HotelNo, GuestNo, DateFrom),
    FOREIGN KEY (HotelNo) REFERENCES Hotel(HotelNo),
    FOREIGN KEY (GuestNo) REFERENCES Guest(GuestNo)
);
```

### Column Explanation

| Column     | Purpose              |
| ---------- | -------------------- |
| `HotelNo`  | Identifies the hotel |
| `GuestNo`  | Identifies the guest |
| `DateFrom` | Booking start date   |
| `DateTo`   | Booking end date     |
| `RoomNo`   | Booked room          |

The composite primary key is:

```text
HotelNo + GuestNo + DateFrom
```

---

## Module 11: Complete Table Creation Script

The four tables can be created using the following SQL:

```sql
CREATE DATABASE hotel_db;

USE hotel_db;

CREATE TABLE Hotel (
    HotelNo VARCHAR(10) PRIMARY KEY,
    HotelName VARCHAR(50),
    City VARCHAR(30)
);

CREATE TABLE Room (
    RoomNo INT,
    HotelNo VARCHAR(10),
    Type VARCHAR(20),
    Price DECIMAL(6,2),
    PRIMARY KEY (RoomNo, HotelNo),
    FOREIGN KEY (HotelNo) REFERENCES Hotel(HotelNo)
);

CREATE TABLE Guest (
    GuestNo INT PRIMARY KEY,
    GuestName VARCHAR(50),
    GuestAddress VARCHAR(100)
);

CREATE TABLE Booking (
    HotelNo VARCHAR(10),
    GuestNo INT,
    DateFrom DATE,
    DateTo DATE,
    RoomNo INT,
    PRIMARY KEY (HotelNo, GuestNo, DateFrom),
    FOREIGN KEY (HotelNo) REFERENCES Hotel(HotelNo),
    FOREIGN KEY (GuestNo) REFERENCES Guest(GuestNo)
);
```

---

## Module 12: Inserting Hotel Data

The following records can be inserted into the `Hotel` table:

```sql
INSERT INTO Hotel
VALUES ('ch01', 'Omni Shoreham', 'London');

INSERT INTO Hotel
VALUES ('ch02', 'Phoenix Park', 'London');

INSERT INTO Hotel
VALUES ('dc01', 'Latham', 'Berlin');

INSERT INTO Hotel
VALUES ('fb01', 'Grosvenor', 'London');

INSERT INTO Hotel
VALUES ('fb02', 'Watergate', 'Paris');
```

The resulting hotel data includes:

| HotelNo | HotelName     | City   |
| ------- | ------------- | ------ |
| `ch01`  | Omni Shoreham | London |
| `ch02`  | Phoenix Park  | London |
| `dc01`  | Latham        | Berlin |
| `fb01`  | Grosvenor     | London |
| `fb02`  | Watergate     | Paris  |

---

## Module 13: Inserting Guest Data

Guest records can be inserted as follows:

```sql
INSERT INTO Guest
VALUES (10001, 'John Kay', '56 High St, London');

INSERT INTO Guest
VALUES (10002, 'Mike Ritchie', '18 Tain St, London');

INSERT INTO Guest
VALUES (10003, 'Mary Tregear', '5 Tarbot Rd, Aberdeen');

INSERT INTO Guest
VALUES (10004, 'Joe Keogh', '2 Fergus Dr, Aberdeen');

INSERT INTO Guest
VALUES (10005, 'Carol Farrel', '6 Achray St, Glasgow');

INSERT INTO Guest
VALUES (10006, 'Tine Murphy', '63 Well St, Glasgow');

INSERT INTO Guest
VALUES (10007, 'Tony Shaw', '12 Park Pl, Glasgow');
```

---

## Module 14: Inserting Room Data

Room records:

```sql
INSERT INTO Room
VALUES (501, 'fb01', 'single', 19.00);

INSERT INTO Room
VALUES (601, 'fb01', 'double', 29.00);

INSERT INTO Room
VALUES (701, 'ch02', 'single', 10.00);

INSERT INTO Room
VALUES (701, 'fb01', 'family', 39.00);

INSERT INTO Room
VALUES (801, 'ch02', 'double', 15.00);

INSERT INTO Room
VALUES (901, 'dc01', 'single', 18.00);

INSERT INTO Room
VALUES (1001, 'ch01', 'single', 29.99);

INSERT INTO Room
VALUES (1001, 'dc01', 'double', 30.00);

INSERT INTO Room
VALUES (1001, 'fb02', 'single', 58.00);

INSERT INTO Room
VALUES (1101, 'ch01', 'family', 59.99);

INSERT INTO Room
VALUES (1101, 'dc01', 'family', 35.00);

INSERT INTO Room
VALUES (1101, 'fb02', 'double', 86.00);
```

---

## Module 15: Understanding Aggregate Functions

Aggregate functions perform calculations across multiple rows.

Important MySQL aggregate functions include:

- `COUNT()`
- `AVG()`
- `SUM()`
- `MIN()`
- `MAX()`

In this lecture, the main functions are:

```text
COUNT()
AVG()
SUM()
```

---

## Module 16: `COUNT()` Function

`COUNT()` counts rows or values.

To find the number of hotels:

```sql
SELECT COUNT(*) AS TotalHotels
FROM Hotel;
```

The alias:

```sql
AS TotalHotels
```

gives the calculated column a meaningful name.

### General Syntax

```sql
SELECT COUNT(*)
FROM table_name;
```

---

## Module 17: `AVG()` Function

`AVG()` calculates the average value of a numeric column.

To calculate the average room price:

```sql
SELECT AVG(Price) AS AveragePrice
FROM Room;
```

This calculates:

```text
Sum of room prices
------------------
Number of room records
```

### General Syntax

```sql
SELECT AVG(column_name)
FROM table_name;
```

---

## Module 18: `SUM()` Function

`SUM()` calculates the total of numeric values.

To calculate the total nightly revenue from all double rooms:

```sql
SELECT SUM(Price) AS TotalDoubleRevenue
FROM Room
WHERE Type = 'double';
```

The `WHERE` clause first filters the rows to only double rooms.

Then `SUM()` adds their prices.

---

## Module 19: Aggregate Functions with `WHERE`

Aggregate functions can be combined with filtering conditions.

For example:

```sql
SELECT COUNT(*)
FROM Room
WHERE Type = 'double';
```

This counts only double rooms.

Another example:

```sql
SELECT AVG(Price)
FROM Room
WHERE Type = 'single';
```

This calculates the average price of single rooms.

Another example:

```sql
SELECT SUM(Price)
FROM Room
WHERE Type = 'family';
```

This calculates the total price of family rooms.

---

## Module 20: Viewing Database Tables

To display all tables in the selected database:

```sql
SHOW TABLES;
```

The result should contain:

```text
Hotel
Room
Guest
Booking
```

---

## Module 21: Inspecting Table Definitions

Use `DESCRIBE` to inspect the structure of each table.

```sql
DESCRIBE Hotel;

DESCRIBE Room;

DESCRIBE Guest;

DESCRIBE Booking;
```

You can also use:

```sql
DESC Hotel;
```

as a shorter form of:

```sql
DESCRIBE Hotel;
```

---

## Module 22: Listing All Hotels

To display all information from the `Hotel` table:

```sql
SELECT *
FROM Hotel;
```

The `*` wildcard means all columns.

---

## Module 23: Finding Hotels in London

To display hotels located in London:

```sql
SELECT *
FROM Hotel
WHERE City = 'London';
```

The `WHERE` clause filters the records.

Only records where:

```text
City = London
```

are returned.

---

## Module 24: Finding Guests in London

To list guest names and addresses for guests in London:

```sql
SELECT GuestName, GuestAddress
FROM Guest
WHERE GuestAddress LIKE '%London'
ORDER BY GuestName ASC;
```

This query performs three operations:

1. Selects `GuestName` and `GuestAddress`.
2. Filters addresses ending with `London`.
3. Sorts guest names alphabetically.

---

## Module 25: Understanding `LIKE '%London'`

The pattern:

```text
%London
```

means:

```text
zero or more characters + London
```

Therefore, values such as:

```text
56 High St, London
18 Tain St, London
```

can match the pattern.

The `%` wildcard allows any number of characters before `London`.

---

## Module 26: Sorting Results with `ORDER BY`

The `ORDER BY` clause is used to organize query results.

For alphabetical sorting by guest name:

```sql
SELECT GuestName, GuestAddress
FROM Guest
WHERE GuestAddress LIKE '%London'
ORDER BY GuestName ASC;
```

`ASC` means ascending order.

Descending order can be specified using:

```sql
ORDER BY GuestName DESC;
```

### Sorting Summary

```text
ASC  → Ascending order
DESC → Descending order
```

---

## Module 27: Filtering Multiple Room Types

The following query finds double or family rooms below £40 per night:

```sql
SELECT *
FROM Room
WHERE (Type = 'double' OR Type = 'family')
  AND Price < 40.00
ORDER BY Price ASC;
```

This query contains multiple logical conditions.

### Condition 1

```sql
Type = 'double'
```

### Condition 2

```sql
Type = 'family'
```

### Condition 3

```sql
Price < 40.00
```

The parentheses ensure that the `OR` conditions are evaluated together.

---

## Module 28: Understanding `AND` and `OR`

### `AND`

`AND` requires all connected conditions to be true.

Example:

```sql
SELECT *
FROM Room
WHERE Type = 'double'
  AND Price < 40.00;
```

This means:

> Find double rooms whose price is below £40.

### `OR`

`OR` requires at least one condition to be true.

Example:

```sql
SELECT *
FROM Room
WHERE Type = 'double'
   OR Type = 'family';
```

This finds either double rooms or family rooms.

### Combining `AND` and `OR`

```sql
SELECT *
FROM Room
WHERE (Type = 'double' OR Type = 'family')
  AND Price < 40.00;
```

This means:

> Find rooms that are either double or family and cost less than £40.

---

## Module 29: Handling `NULL` Values

`NULL` represents missing or unknown data.

It does not mean:

```text
0
```

and it does not mean:

```text
empty string
```

For example, if `DateTo` is unknown because a booking has not ended, it may contain:

```text
NULL
```

---

## Module 30: Checking for `NULL`

You should use `IS NULL` to find missing values.

```sql
SELECT *
FROM Booking
WHERE DateTo IS NULL;
```

To find values that are not missing:

```sql
SELECT *
FROM Booking
WHERE DateTo IS NOT NULL;
```

### Important Rule

Do not write:

```sql
WHERE DateTo = NULL;
```

Instead, use:

```sql
WHERE DateTo IS NULL;
```

---

## Module 31: Why `= NULL` Is Incorrect

`NULL` represents an unknown value.

SQL does not evaluate:

```sql
NULL = NULL
```

as true.

Therefore:

```sql
SELECT *
FROM Booking
WHERE DateTo = NULL;
```

will not correctly find missing dates.

The correct syntax is:

```sql
SELECT *
FROM Booking
WHERE DateTo IS NULL;
```

---

## Module 32: Complete Query Exercise Set

### Question 1: How Many Hotels Are There?

```sql
SELECT COUNT(*) AS TotalHotels
FROM Hotel;
```

### Question 2: What Is the Average Price of a Room?

```sql
SELECT AVG(Price) AS AveragePrice
FROM Room;
```

### Question 3: What Is the Total Revenue Per Night from Double Rooms?

```sql
SELECT SUM(Price) AS TotalDoubleRevenue
FROM Room
WHERE Type = 'double';
```

### Question 4: List the Table Definitions

```sql
SHOW TABLES;

DESCRIBE Hotel;
DESCRIBE Room;
DESCRIBE Guest;
DESCRIBE Booking;
```

### Question 5: List Full Details of All Hotels

```sql
SELECT *
FROM Hotel;
```

### Question 6: List Hotels in London

```sql
SELECT *
FROM Hotel
WHERE City = 'London';
```

### Question 7: List London Guests Alphabetically

```sql
SELECT GuestName, GuestAddress
FROM Guest
WHERE GuestAddress LIKE '%London'
ORDER BY GuestName ASC;
```

### Question 8: Find Double or Family Rooms Below £40

```sql
SELECT *
FROM Room
WHERE (Type = 'double' OR Type = 'family')
  AND Price < 40.00
ORDER BY Price ASC;
```

### Question 9: Find Bookings Without an End Date

```sql
SELECT *
FROM Booking
WHERE DateTo IS NULL;
```

---

## Module 33: Understanding the Complete Query Structure

A typical SQL query can contain several clauses:

```sql
SELECT columns
FROM table
WHERE conditions
ORDER BY column;
```

For example:

```sql
SELECT GuestName, GuestAddress
FROM Guest
WHERE GuestAddress LIKE '%London'
ORDER BY GuestName ASC;
```

The logical workflow is:

```text
FROM
 ↓
WHERE
 ↓
SELECT
 ↓
ORDER BY
```

The exact internal SQL processing order is more nuanced, but this is a useful conceptual workflow for understanding a basic query.

---

## Module 34: Relational Database Relationships

The four tables can be understood as follows:

```text
                    HOTEL
                      │
                 HotelNo (PK)
                      │
             ┌────────┴────────┐
             │                 │
             ↓                 ↓
           ROOM             BOOKING
       HotelNo (FK)       HotelNo (FK)
                              │
                              │
                              ↓
                            GUEST
                         GuestNo (PK)
```

### Key Relationships

```text
Hotel 1 ────< Room
```

One hotel can have multiple rooms.

```text
Hotel 1 ────< Booking
```

A hotel can have multiple bookings.

```text
Guest 1 ────< Booking
```

A guest can have multiple bookings.

---

## Module 35: Primary Key vs Foreign Key

| Feature                  | Primary Key               | Foreign Key                            |
| ------------------------ | ------------------------- | -------------------------------------- |
| Purpose                  | Uniquely identifies a row | Creates a relationship                 |
| Duplicate values         | Not allowed               | May be allowed                         |
| `NULL`                   | Not allowed               | May be allowed depending on definition |
| References another table | Usually no                | Yes                                    |
| Example                  | `Hotel.HotelNo`           | `Room.HotelNo`                         |

### Example

Primary key:

```sql
HotelNo VARCHAR(10) PRIMARY KEY
```

Foreign key:

```sql
HotelNo VARCHAR(10),
FOREIGN KEY (HotelNo) REFERENCES Hotel(HotelNo)
```

---

## Module 36: Data Types Used in the Schema

### `VARCHAR`

Used for variable-length text.

Example:

```sql
HotelName VARCHAR(50)
```

### `INT`

Used for integer values.

Example:

```sql
RoomNo INT
```

### `DECIMAL`

Used for precise numeric values, especially prices.

Example:

```sql
Price DECIMAL(6,2)
```

### `DATE`

Used for calendar dates.

Example:

```sql
DateFrom DATE
```

---

## Module 37: Why `DECIMAL(6,2)` Is Used for Price

The definition:

```sql
Price DECIMAL(6,2)
```

means:

- `6` = maximum total number of digits.
- `2` = number of digits after the decimal point.

For example:

```text
19.00
29.00
59.99
86.00
```

are suitable values.

Using `DECIMAL` is appropriate for monetary values because it provides exact decimal representation.

---

## Module 38: Common Mistakes

### Mistake 1: Creating a Foreign Key Before the Referenced Table

The referenced table should exist before creating the table containing the foreign key.

Correct order:

```text
Create Hotel
     ↓
Create Room
```

because:

```text
Room.HotelNo
```

references:

```text
Hotel.HotelNo
```

---

### Mistake 2: Forgetting the Composite Key

The `Room` table does not use only `RoomNo` as its primary key.

Correct:

```sql
PRIMARY KEY (RoomNo, HotelNo)
```

This allows the same room number to appear in different hotels.

---

### Mistake 3: Using `= NULL`

Incorrect:

```sql
WHERE DateTo = NULL;
```

Correct:

```sql
WHERE DateTo IS NULL;
```

---

### Mistake 4: Forgetting Parentheses

When combining `AND` and `OR`, use parentheses when necessary:

```sql
WHERE (Type = 'double' OR Type = 'family')
  AND Price < 40.00;
```

This makes the intended logic clear.

---

### Mistake 5: Forgetting `ORDER BY`

If the question asks for alphabetical or numerical ordering, include:

```sql
ORDER BY column_name;
```

For example:

```sql
ORDER BY GuestName ASC;
```

---

## Module 39: Important SQL Commands

### Create Database

```sql
CREATE DATABASE hotel_db;
```

### Select Database

```sql
USE hotel_db;
```

### Show Tables

```sql
SHOW TABLES;
```

### Describe a Table

```sql
DESCRIBE Hotel;
```

### Count Rows

```sql
SELECT COUNT(*)
FROM Hotel;
```

### Calculate Average

```sql
SELECT AVG(Price)
FROM Room;
```

### Calculate Total

```sql
SELECT SUM(Price)
FROM Room;
```

### Filter Rows

```sql
SELECT *
FROM Hotel
WHERE City = 'London';
```

### Pattern Matching

```sql
SELECT *
FROM Guest
WHERE GuestAddress LIKE '%London';
```

### Sorting

```sql
SELECT *
FROM Guest
ORDER BY GuestName ASC;
```

### Check `NULL`

```sql
SELECT *
FROM Booking
WHERE DateTo IS NULL;
```

---

## Module 40: Exam-Focused Key Concepts

### Primary Key

Uniquely identifies each record.

```sql
PRIMARY KEY (HotelNo)
```

### Composite Primary Key

Uses multiple columns together as a unique identifier.

```sql
PRIMARY KEY (RoomNo, HotelNo)
```

### Foreign Key

Creates a relationship between tables.

```sql
FOREIGN KEY (HotelNo)
REFERENCES Hotel(HotelNo)
```

### `COUNT()`

Counts records.

```sql
SELECT COUNT(*)
FROM Hotel;
```

### `AVG()`

Calculates an average.

```sql
SELECT AVG(Price)
FROM Room;
```

### `SUM()`

Calculates a total.

```sql
SELECT SUM(Price)
FROM Room;
```

### `LIKE`

Performs pattern matching.

```sql
WHERE GuestAddress LIKE '%London'
```

### `ORDER BY`

Sorts query results.

```sql
ORDER BY GuestName ASC;
```

### `IS NULL`

Checks for missing values.

```sql
WHERE DateTo IS NULL;
```

### `IS NOT NULL`

Checks for values that are not missing.

```sql
WHERE DateTo IS NOT NULL;
```

---

## Module 41: Complete Practical Workflow

```text
1. Create the database
        ↓
2. Select the database
        ↓
3. Create the parent table
        ↓
4. Create related tables
        ↓
5. Define primary keys
        ↓
6. Define foreign keys
        ↓
7. Insert parent-table records
        ↓
8. Insert related records
        ↓
9. Inspect table structures
        ↓
10. Query individual tables
        ↓
11. Apply WHERE filtering
        ↓
12. Apply LIKE pattern matching
        ↓
13. Use aggregate functions
        ↓
14. Sort results with ORDER BY
        ↓
15. Handle NULL values correctly
```

---

## Module 42: Quick Study Summary Checklist

- [ ] Understand the concept of a relational database.
- [ ] Know why data is divided into multiple tables.
- [ ] Understand the purpose of a primary key.
- [ ] Understand the purpose of a foreign key.
- [ ] Understand composite primary keys.
- [ ] Know why `RoomNo` alone cannot uniquely identify a room across multiple hotels.
- [ ] Know how to create the `Hotel` table.
- [ ] Know how to create the `Room` table.
- [ ] Know how to create the `Guest` table.
- [ ] Know how to create the `Booking` table.
- [ ] Understand foreign-key relationships.
- [ ] Know how to insert records.
- [ ] Know how to use `SHOW TABLES`.
- [ ] Know how to use `DESCRIBE`.
- [ ] Understand `COUNT()`.
- [ ] Understand `AVG()`.
- [ ] Understand `SUM()`.
- [ ] Know how to use aggregate functions with `WHERE`.
- [ ] Know how to filter records using `WHERE`.
- [ ] Know how to use `LIKE`.
- [ ] Understand `%` as a wildcard.
- [ ] Know how to sort results using `ORDER BY`.
- [ ] Understand `ASC` and `DESC`.
- [ ] Know how to combine `AND` and `OR`.
- [ ] Know how to check `NULL` using `IS NULL`.
- [ ] Know how to check non-NULL values using `IS NOT NULL`.
- [ ] Never use `= NULL` to test for missing values.

---

## Module 43: Final Exam Revision

Remember these core concepts:

> **Primary Key = Uniquely identifies a record**

> **Foreign Key = Connects one table to another**

> **Composite Primary Key = Primary key made from multiple columns**

> **`COUNT()` = Counts records**

> **`AVG()` = Calculates an average**

> **`SUM()` = Calculates a total**

> **`WHERE` = Filters records**

> **`LIKE` = Performs pattern matching**

> **`%` = Matches zero or more characters**

> **`ORDER BY` = Sorts query results**

> **`ASC` = Ascending order**

> **`DESC` = Descending order**

> **`IS NULL` = Finds missing values**

> **`IS NOT NULL` = Finds non-missing values**

### Core Queries

Count all hotels:

```sql
SELECT COUNT(*) AS TotalHotels
FROM Hotel;
```

Average room price:

```sql
SELECT AVG(Price) AS AveragePrice
FROM Room;
```

Total revenue from double rooms:

```sql
SELECT SUM(Price) AS TotalDoubleRevenue
FROM Room
WHERE Type = 'double';
```

Hotels in London:

```sql
SELECT *
FROM Hotel
WHERE City = 'London';
```

London guests sorted alphabetically:

```sql
SELECT GuestName, GuestAddress
FROM Guest
WHERE GuestAddress LIKE '%London'
ORDER BY GuestName ASC;
```

Affordable double or family rooms:

```sql
SELECT *
FROM Room
WHERE (Type = 'double' OR Type = 'family')
  AND Price < 40.00
ORDER BY Price ASC;
```

Bookings without an end date:

```sql
SELECT *
FROM Booking
WHERE DateTo IS NULL;
```

---

## Final Relational Database Map

```text
                    hotel_db
                       │
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
      Hotel           Room           Guest
        │              │              │
        │              │              │
        └──────────────┼──────────────┘
                       ↓
                    Booking
```

### Key Relationships

```text
Hotel
  │
  └── HotelNo
          ↓
        Room
```

```text
Hotel
  │
  └── HotelNo
          ↓
       Booking
```

```text
Guest
  │
  └── GuestNo
          ↓
       Booking
```

### Complete SQL Learning Flow

```text
DATABASE
    ↓
TABLES
    ↓
PRIMARY KEYS
    ↓
FOREIGN KEYS
    ↓
INSERT DATA
    ↓
SELECT DATA
    ↓
WHERE FILTERING
    ↓
LIKE PATTERN MATCHING
    ↓
AND / OR CONDITIONS
    ↓
ORDER BY SORTING
    ↓
COUNT / AVG / SUM
    ↓
IS NULL / IS NOT NULL
```

> **Final Key Takeaway:** A relational database becomes powerful when information is divided into related tables and connected using primary and foreign keys. Once the schema is created, SQL allows you to retrieve, filter, sort, aggregate, and analyze information using commands such as `SELECT`, `WHERE`, `LIKE`, `ORDER BY`, `COUNT()`, `AVG()`, `SUM()`, `IS NULL`, and `IS NOT NULL`.

