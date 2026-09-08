# Introduction to MySQL (SQL Part 03)


<!--more-->

> **Academic Note:** This master study guide covers Lecture 03 notes, focusing on MySQL architecture, core features, and practical command-line operations inside the MySQL monitor.

---

## Module 1: What is MySQL?

MySQL is an extremely popular, open-source Relational Database Management System (RDBMS).

### 1.1 Pronunciation and Performance

- **Official Pronunciation:** Pronounced _"my Ess Que Ell"_ (not "my sequel").
- **Capabilities:** Handles very large databases with extremely fast performance.

### 1.2 Why Use MySQL in Academic and Enterprise Settings?

1. **Cost:** Free and open-source, making it significantly cheaper than commercial solutions such as Oracle.
2. **Local Installation:** Students can easily install MySQL locally through WAMP or XAMPP.
3. **Usability:** Provides an easy-to-use command-line shell and graphical interfaces for creating and querying tables.
4. **Integration:** Works smoothly with backend technologies such as Java JDBC, PHP, and Python.

---

## Module 2: Connecting and Exiting the MySQL Console

### 2.1 Connecting to the Console

1. Start all required services in your WAMP/XAMPP server stack.
2. Open the **MySQL Console** from the server menu.
3. When prompted with:

```text
Enter password:
```

leave the password blank if no password has been configured and press **Enter**.

> **Security Note:** A blank root password is not required for every MySQL installation. Always use the credentials configured for your own server.

### 2.2 Exiting the Console

To close your session and exit the MySQL monitor, type either `QUIT` or `exit`:

```sql
mysql> QUIT
-- OR --
mysql> exit
```

---

## Module 3: Executing Basic Queries

Once logged into the MySQL monitor, you can execute simple SQL queries to test server functionality.

### 3.1 Syntax Rules and Case Sensitivity

- **Semicolon Termination:** Most MySQL statements must end with a semicolon (`;`) or `\g`. The MySQL client uses the terminator to determine when a statement is complete rather than simply using the end of a line.
- **Case Insensitivity:** SQL keywords are generally case-insensitive. The following queries are equivalent:

```sql
mysql> SELECT VERSION(), CURRENT_DATE;
mysql> select version(), current_date;
mysql> SeLeCt vErSiOn(), current_DATE;
```

### 3.2 Example 1: Checking Version and Current Date

```sql
mysql> SELECT VERSION(), CURRENT_DATE;
+-----------+--------------+
| VERSION() | CURRENT_DATE |
+-----------+--------------+
| 5.7.14    | 2016-11-14   |
+-----------+--------------+
1 row in set (0.07 sec)
```

#### Output Information

MySQL returns information about the query result, including the number of rows returned and the execution time.

> **Note:** The exact version, date, and execution time displayed on your system will depend on your MySQL installation and the current date.

### 3.3 Example 2: Using MySQL as a Calculator

You can perform mathematical operations and invoke functions directly in the MySQL query monitor:

```sql
mysql> SELECT SIN(PI()/4), (4+1)*5;
+--------------------+-------------+
| SIN(PI()/4)        | (4+1)*5     |
+--------------------+-------------+
| 0.7071067811865476 |          25 |
+--------------------+-------------+
1 row in set (0.07 sec)
```

This demonstrates that MySQL can evaluate mathematical expressions and built-in functions without requiring a table.

### 3.4 Example 3: Multiple Statements on a Single Line

You can execute multiple queries on one line when the MySQL client configuration permits multiple statements, with each statement ending with its own semicolon.

Example:

```sql
mysql> SELECT VERSION(); SELECT NOW();
+-----------+
| VERSION() |
+-----------+
| 5.7.14    |
+-----------+
1 row in set (0.00 sec)

+---------------------+
| NOW()               |
+---------------------+
| 2016-11-14 21:22:19 |
+---------------------+
1 row in set (0.00 sec)
```

> **Important:** In some client environments or application APIs, multiple statements may be disabled or require explicit configuration. The interactive MySQL monitor can process separate statements entered sequentially.

---

## Module 4: Multi-Line Commands and Cancellation

### 4.1 Writing Multi-Line Statements

Because MySQL uses the semicolon (`;`) to determine statement boundaries rather than line breaks, a single query can span multiple lines.

Example:

```sql
mysql> SELECT
    -> USER(),
    -> CURRENT_DATE;
+----------------+--------------+
| USER()         | CURRENT_DATE |
+----------------+--------------+
| root@localhost | 2016-11-14   |
+----------------+--------------+
1 row in set (0.05 sec)
```

> **Note:** The `->` prompt indicates that MySQL is waiting for you to complete the current statement.

### 4.2 Canceling an In-Progress Command (`\c`)

If you make a mistake while typing a query or decide to abandon a multi-line statement before executing it, you can cancel the current statement by typing `\c`.

Example:

```text
mysql> SELECT
    -> USER()
    -> \c
mysql>
```

The `\c` command clears the current unfinished statement and returns you to the normal `mysql>` prompt.

---

## Module 5: Understanding the MySQL Monitor Prompt

The MySQL monitor uses different prompts to indicate its current state.

### Normal Prompt

```text
mysql>
```

This means the MySQL client is ready to receive a new command.

### Continuation Prompt

```text
->
```

This means the current statement has not been completed and MySQL is waiting for additional input.

### Cancelling the Current Statement

```text
\c
```

This cancels the current unfinished statement and returns to:

```text
mysql>
```

---

## Module 6: Important MySQL Commands to Remember

### Check MySQL Version

```sql
SELECT VERSION();
```

### Display Current Date

```sql
SELECT CURRENT_DATE;
```

### Display Current Date and Time

```sql
SELECT NOW();
```

### Display Current User

```sql
SELECT USER();
```

### Perform a Calculation

```sql
SELECT (4+1)*5;
```

### Display Available Databases

```sql
SHOW DATABASES;
```

### Exit the MySQL Monitor

```text
QUIT
```

or:

```text
exit
```

### Cancel an Incomplete Statement

```text
\c
```

---

## Module 7: Understanding SQL Statement Termination

The MySQL console normally uses the semicolon (`;`) to identify the end of a SQL statement.

Example:

```sql
SELECT VERSION();
```

The semicolon indicates that the statement is complete and can be executed.

The `\g` command can also be used:

```text
SELECT VERSION()\g
```

### What Happens Without a Terminator?

For example:

```text
mysql> SELECT VERSION()
    ->
```

The MySQL monitor does not execute the statement yet because it is still waiting for the statement terminator.

You can complete it by entering:

```text
;
```

or:

```text
\g
```

Alternatively, cancel it with:

```text
\c
```

---

## Module 8: SQL Keyword Case Sensitivity

SQL keywords in MySQL are generally case-insensitive.

These commands are equivalent:

```sql
SELECT VERSION();
```

```sql
select version();
```

```sql
SeLeCt vErSiOn();
```

However, identifiers such as database names, table names, and column names can have case-sensitivity behavior that depends on the operating system, server configuration, and object type.

For this reason, it is good practice to use a consistent naming convention.

---

## Module 9: MySQL as a Calculator

MySQL can perform calculations directly.

### Addition

```sql
SELECT 10 + 5;
```

### Subtraction

```sql
SELECT 10 - 5;
```

### Multiplication

```sql
SELECT 10 * 5;
```

### Division

```sql
SELECT 10 / 5;
```

### Mathematical Functions

Example:

```sql
SELECT SIN(PI()/4);
```

MySQL provides many mathematical functions that can be used when processing numerical data.

---

## Module 10: Practical MySQL Console Workflow

A basic workflow for using the MySQL console is:

```text
1. Start WAMP/XAMPP
2. Start MySQL
3. Open MySQL Console
4. Enter the configured password
5. Wait for the mysql> prompt
6. Execute SQL statements
7. Check the returned results
8. Use \c if an incomplete statement needs to be cancelled
9. Use QUIT or exit when finished
```

Example session:

```text
mysql> SELECT VERSION();
mysql> SELECT CURRENT_DATE;
mysql> SHOW DATABASES;
mysql> SELECT USER();
mysql> QUIT
```

---

## Module 11: Common Errors and Troubleshooting

### Problem 1: Incorrect Password

If MySQL reports an authentication error, verify:

- Username
- Password
- MySQL server instance
- Authentication configuration

Do not assume that every local installation uses a blank root password.

### Problem 2: Missing Semicolon

If you enter:

```text
mysql> SELECT VERSION()
```

the monitor may display:

```text
->
```

This means it is waiting for the statement to be completed.

Enter:

```text
;
```

to execute it.

### Problem 3: Accidental Incomplete Query

If you start a query and decide not to execute it:

```text
mysql> SELECT
    ->
```

Enter:

```text
\c
```

to cancel it.

### Problem 4: MySQL Console Will Not Open

Check:

- WAMP/XAMPP is installed correctly.
- MySQL is running.
- The MySQL executable exists.
- Required permissions are available.
- The correct MySQL installation is being accessed.

---

## Module 12: Exam-Focused Key Concepts

### MySQL

An open-source relational database management system used to store, manage, and retrieve structured data.

### RDBMS

**Relational Database Management System**

A database management system that organizes information into related tables.

### MySQL Monitor

The command-line interface used to interact directly with the MySQL server.

### `SELECT`

Used to retrieve data or evaluate expressions.

Example:

```sql
SELECT VERSION();
```

### `VERSION()`

Returns the version of the connected MySQL server.

### `CURRENT_DATE`

Returns the current date.

### `NOW()`

Returns the current date and time.

### `USER()`

Returns information about the current MySQL user and connection.

### `QUIT`

Terminates the MySQL monitor session.

### `exit`

Also exits the MySQL monitor.

### `\c`

Cancels the current unfinished SQL statement.

### `\g`

Executes the current SQL statement.

### `mysql>`

Indicates that the MySQL monitor is ready for a new command.

### `->`

Indicates that the MySQL monitor is waiting for additional input to complete the current statement.

---

## Quick Study Summary Checklist

- [ ] Know what MySQL is.
- [ ] Know that MySQL is an open-source RDBMS.
- [ ] Remember the pronunciation: _"my Ess Que Ell"_.
- [ ] Understand why MySQL is commonly used in academic and enterprise environments.
- [ ] Know how to start and access the MySQL console.
- [ ] Understand that local root passwords depend on the installation configuration.
- [ ] Know how to exit the MySQL monitor:
  - [ ] `QUIT`
  - [ ] `exit`
- [ ] Remember that SQL statements normally end with:
  - [ ] `;`
  - [ ] `\g`
- [ ] Understand that SQL keywords are generally case-insensitive.
- [ ] Know how to check the MySQL version:

```sql
SELECT VERSION();
```

- [ ] Know how to display the current date:

```sql
SELECT CURRENT_DATE;
```

- [ ] Know how to display the current date and time:

```sql
SELECT NOW();
```

- [ ] Know how to display the current user:

```sql
SELECT USER();
```

- [ ] Understand that MySQL can perform mathematical calculations.
- [ ] Recognize the `mysql>` prompt.
- [ ] Recognize the `->` continuation prompt.
- [ ] Know how to cancel an unfinished statement using:

```text
\c
```

---

## Final Exam Revision

Remember the following key concepts:

> **MySQL = Open-Source Relational Database Management System**

> **RDBMS = Relational Database Management System**

> **MySQL Monitor = Command-Line Interface for MySQL**

> **`SELECT VERSION();` = Display MySQL Version**

> **`SELECT CURRENT_DATE;` = Display Current Date**

> **`SELECT NOW();` = Display Current Date and Time**

> **`SELECT USER();` = Display Current MySQL User**

> **`;` = SQL Statement Terminator**

> **`\g` = Execute Current Statement**

> **`\c` = Cancel Current Statement**

> **`mysql>` = Ready for a New Command**

> **`->` = Waiting for More Input**

> **`QUIT` / `exit` = Leave the MySQL Monitor**

The basic practical workflow is:

```text
1. Start WAMP/XAMPP
2. Start MySQL
3. Open the MySQL Console
4. Authenticate using the configured credentials
5. Wait for the mysql> prompt
6. Execute SQL commands
7. Use ; or \g to terminate statements
8. Use \c to cancel incomplete statements
9. Use QUIT or exit to leave the console
```

If these concepts and commands are understood, you have the fundamental knowledge required to work with the MySQL command-line monitor and execute basic SQL operations.

