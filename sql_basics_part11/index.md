# Advanced Table Creation, Constraints, and the ALTER Statement (SQL Master Guide)


<!--more-->

> **Academic Note:** This master study guide focuses on advanced Data Definition Language (DDL) concepts, exploring robust table creation techniques, relational constraint enforcement, and schema modifications using the `ALTER TABLE` statement.

---

## Module 1: Core Table Creation Techniques & Key Syntaxes

When designing a relational database, enforcing data integrity through keys is crucial. Keys dictate how rows are uniquely identified and how tables relate to one another.

### 1.1 Column-Level vs. Table-Level Constraints

- **Column-Level Constraints:** Applied directly inline after a column's data type (best for simple single-column keys).
- **Table-Level Constraints:** Defined at the bottom of the `CREATE TABLE` statement (mandatory for **composite keys** consisting of two or more columns).

### 1.2 Primary Key (`PRIMARY KEY`)

A primary key uniquely identifies each record in a table. It cannot contain `NULL` values, and all values must be unique.

**Example (Column-Level):**

```sql
CREATE TABLE Guest (
    GuestNo INT PRIMARY KEY,
    GuestName VARCHAR(50)
);
```

**Example (Table-Level):**

```sql
CREATE TABLE Guest (
    GuestNo INT,
    GuestName VARCHAR(50),
    CONSTRAINT pk_guest PRIMARY KEY (GuestNo)
);
```

### 1.3 Composite Primary Keys

When a single column is insufficient to uniquely identify a row, a combination of two or more columns forms a composite primary key. _(As seen in Lecture 08 with Room and Booking tables)._

**Syntax Example:**

```sql
CREATE TABLE Room (
    RoomNo INT,
    HotelNo VARCHAR(10),
    Type VARCHAR(20),
    Price DECIMAL(6,2),
    PRIMARY KEY (RoomNo, HotelNo)
);
```

### 1.4 Foreign Key (`FOREIGN KEY`)

A foreign key is a field (or collection of fields) in one table that references a key in another table, establishing a parent-child relationship and ensuring referential integrity.

**Syntax Example:**

```sql
CREATE TABLE Booking (
    HotelNo VARCHAR(10),
    GuestNo INT,
    DateFrom DATE,
    RoomNo INT,
    PRIMARY KEY (HotelNo, GuestNo, DateFrom),
    FOREIGN KEY (HotelNo) REFERENCES Hotel(HotelNo),
    FOREIGN KEY (GuestNo) REFERENCES Guest(GuestNo)
);
```

---

## Module 2: Modifying Existing Tables Using `ALTER TABLE`

The `ALTER TABLE` statement is used to add, delete, or modify columns and constraints in an existing table without dropping and recreating it.

### 2.1 Adding a New Column (`ADD COLUMN`)

To add a new column (e.g., `email` to the `Guest` table):

```sql
ALTER TABLE Guest
ADD COLUMN email VARCHAR(100);
```

### 2.2 Dropping a Column (`DROP COLUMN`)

To remove an unwanted column from a table:

```sql
ALTER TABLE Guest
DROP COLUMN email;
```

### 2.3 Modifying Column Data Types (`MODIFY` or `CHANGE`)

To change a column's data type or constraints:

```sql
ALTER TABLE Guest
MODIFY COLUMN GuestName VARCHAR(100) NOT NULL;
```

### 2.4 Adding a Primary Key Constraint via `ALTER`

If a table was created without a primary key, you can add it afterward:

```sql
ALTER TABLE students
ADD PRIMARY KEY (index_no);
```

### 2.5 Adding a Foreign Key Constraint via `ALTER`

To establish a foreign key relationship on an existing table:

```sql
ALTER TABLE Room
ADD CONSTRAINT fk_hotel_room
FOREIGN KEY (HotelNo) REFERENCES Hotel(HotelNo);
```

### 2.6 Dropping Constraints (`DROP FOREIGN KEY` / `DROP PRIMARY KEY`)

To remove a foreign key constraint, you usually reference its constraint name:

```sql
ALTER TABLE Room
DROP FOREIGN KEY fk_hotel_room;
```

To remove a primary key:

```sql
ALTER TABLE students
DROP PRIMARY KEY;
```

---

## Quick Study Summary Checklist

- [ ] Primary key rule: Must be unique and cannot contain `NULL`.
- [ ] Composite key rule: Must be defined at the table-level when using multiple columns.
- [ ] Foreign key rule: Links child table columns to parent table keys to maintain referential integrity.
- [ ] `ALTER TABLE ADD`: Used to insert new columns or apply constraints post-creation.
- [ ] `ALTER TABLE DROP`: Used to remove columns or constraints safely.
- [ ] `ALTER TABLE MODIFY`: Used to update data types or column rules.

I have successfully generated your study guide on table creation and the `ALTER` statement at `content/posts/sql-alter-and-table-creation-master-guide.md`.

Run your terminal build command:

```bash
hugo server --cleanDestinationDir
```

Refresh your browser at `http://localhost:1313/` to view your new post live!

