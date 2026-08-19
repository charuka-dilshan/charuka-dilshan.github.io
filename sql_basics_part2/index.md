# Managing Databases Using MySQL in Local Servers  (SQL Part 02)


<!--more-->

> **Academic Note:** This master study guide covers Lecture 02 notes, detailing the three primary methods for managing MySQL databases within a local development stack (WAMP/XAMPP).

---

## Module 1: Three Ways to Manage Databases in MySQL

When working with a local server stack like WAMP, administrators and developers can interact with the MySQL database engine through three distinct interfaces:

1. **Local MySQL Console** (Command Line Interface)
2. **Remotely via PuTTY** (SSH / Network Terminal)
3. **phpMyAdmin on Localhost** (Web-based Graphical User Interface)

---

## Module 2: Method 1 - Using the Local MySQL Console

The MySQL console is a command-line monitor tool used to execute direct SQL queries and administrative commands.

### 2.1 Launching the Console

1. Click the **WAMP / XAMPP** icon in your system notification area.
2. Navigate through the menu and select **MySQL console** or open the terminal shell directly from your control panel.

### 2.2 Authentication

- **Password Prompt:** When the console opens:

```text
c:\wamp64\bin\mysql\mysql5.7.14\bin\mysql.exe
```

it will display:

```text
Enter password:
```

- **Default Login:** By default in standard local development installs, there may be no password set for the root user. If the root account has no password, simply **press the Enter key** to bypass the prompt.

> **Security Note:** Never assume that the root account has a blank password on every installation. Production and secured development environments should use a strong password and appropriate user privileges.

### 2.3 Successful Connection Output

Once authenticated, you may see the MySQL monitor greeting and connection details similar to:

```text
Welcome to the MySQL monitor. Commands end with ; or \g.
Your MySQL connection id is 2
Server version: 5.7.14 MySQL Community Server (GPL)

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```

### 2.4 Basic Console Commands

To view all existing databases stored on the MySQL server, execute:

```sql
SHOW DATABASES;
```

Example output:

```text
mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.08 sec)

mysql>
```

> **Important Rule:** Every SQL command in the console must be terminated with a semicolon (`;`) or `\g`.

---

## Module 3: Method 2 - Managing Remotely via PuTTY

- **Purpose:** PuTTY is an SSH/Telnet client used to connect remotely to a server over a network.
- **Usage:** It is commonly used when the database server or development environment is hosted on a remote virtual machine, cloud instance, or separate test server rather than on your local machine.
- **SSH Access:** After connecting to the remote server through SSH, database administration commands can be executed through the server's terminal.
- **Security:** SSH is generally preferred over unencrypted Telnet for remote administration.

---

## Module 4: Method 3 - phpMyAdmin on Localhost (GUI)

`phpMyAdmin` is a free, web-based software tool written in PHP that is designed to handle the administration of MySQL and MariaDB databases through a web browser.

### 4.1 Launching phpMyAdmin

1. Start Apache and MySQL from the WAMP/XAMPP control panel.
2. Open a web browser.
3. Navigate to:

```text
http://localhost/phpmyadmin/
```

4. If prompted for credentials, enter the username configured for your local MySQL installation.

For a default development installation where the root account has no password:

```text
Username: root
Password: [blank]
```

> **Security Note:** The default credentials vary between installations. Always use the credentials configured for your own MySQL server.

### 4.2 Features of the phpMyAdmin Dashboard

The graphical interface provides point-and-click database management capabilities, allowing users to:

- **CREATE DATABASE** and **DROP DATABASE**
- **CREATE TABLE** and **DROP TABLE**
- Insert, update, and delete records
- Execute raw SQL queries through the **SQL** tab
- Browse database tables and records
- Search table data
- Create and modify table structures
- Manage user accounts
- Manage privileges
- Export databases and tables
- Import SQL files
- View server variables
- Monitor database information

---

## Module 5: Comparing the Three Management Methods

| Method        | Interface       | Main Advantage         | Typical Usage                             |
| ------------- | --------------- | ---------------------- | ----------------------------------------- |
| MySQL Console | Command Line    | Fast and powerful      | Local administration and SQL practice     |
| PuTTY         | Remote Terminal | Remote server access   | Server and database administration        |
| phpMyAdmin    | Web GUI         | Easy visual management | Local development and database management |

### Local MySQL Console

Best when:

- Learning SQL commands
- Practicing database administration
- Working directly on the local machine
- Running commands quickly

### PuTTY

Best when:

- Accessing a remote server
- Managing a remote development environment
- Working with a Linux server through SSH
- Performing server-side administration

### phpMyAdmin

Best when:

- Learning database structures visually
- Creating databases and tables through a GUI
- Browsing records
- Importing and exporting databases
- Managing MySQL/MariaDB through a browser

---

## Module 6: Important MySQL Console Commands

### Display Available Databases

```sql
SHOW DATABASES;
```

### Select a Database

```sql
USE database_name;
```

### Display Tables

```sql
SHOW TABLES;
```

### Display Table Structure

```sql
DESCRIBE table_name;
```

or:

```sql
DESC table_name;
```

### Create a Database

```sql
CREATE DATABASE database_name;
```

### Delete a Database

```sql
DROP DATABASE database_name;
```

> **Warning:** `DROP DATABASE` permanently removes the selected database and its tables. Use it carefully.

### Create a Table

Example:

```sql
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(150)
);
```

### Insert Data

```sql
INSERT INTO students (name, email)
VALUES ('John', 'john@example.com');
```

### View Data

```sql
SELECT * FROM students;
```

### Update Data

```sql
UPDATE students
SET email = 'newemail@example.com'
WHERE id = 1;
```

### Delete Data

```sql
DELETE FROM students
WHERE id = 1;
```

---

## Module 7: Understanding SQL Command Termination

In the MySQL console, SQL statements are normally terminated using a semicolon:

```sql
SHOW DATABASES;
```

The semicolon tells the MySQL client that the current SQL statement has ended.

The `\g` command can also be used to execute the current statement:

```text
SHOW DATABASES\g
```

If the semicolon is omitted, the MySQL console may continue waiting for additional input.

For example:

```text
mysql> SELECT *
    -> FROM students
    -> WHERE id = 1;
```

The `->` prompt indicates that MySQL is waiting for the remainder of the statement.

---

## Module 8: Understanding the MySQL Prompt

When the MySQL console is ready to receive a command, you will normally see:

```text
mysql>
```

Example:

```text
mysql> SHOW DATABASES;
```

If a statement is incomplete, the prompt can change to:

```text
->
```

For example:

```text
mysql> SELECT *
    -> FROM students
    -> WHERE id = 1;
```

### Cancelling an Incomplete Statement

Use:

```text
\c
```

Example:

```text
mysql> SELECT *
    -> FROM students
    -> \c
mysql>
```

This clears the current unfinished SQL statement.

---

## Module 9: Basic Database Management Workflow

A common database creation workflow is:

```text
1. Start MySQL
2. Open MySQL Console
3. Authenticate
4. Display existing databases
5. Create a new database
6. Select the database
7. Create tables
8. Insert records
9. Query records
10. Update or delete records when required
```

Example:

```sql
CREATE DATABASE college;

USE college;

CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(150)
);

INSERT INTO students (name, email)
VALUES ('John', 'john@example.com');

SELECT * FROM students;
```

---

## Module 10: Common Problems and Troubleshooting

### Problem 1: Access Denied

If you receive an error such as:

```text
ERROR 1045 (28000): Access denied for user
```

Possible causes include:

- Incorrect username
- Incorrect password
- Root account authentication configuration
- MySQL user privileges
- Connecting to a different MySQL server than expected

Check the configured credentials and verify which MySQL server instance is running.

### Problem 2: Unknown Database

If you see:

```text
ERROR 1049 (42000): Unknown database
```

The specified database does not exist.

Check the available databases:

```sql
SHOW DATABASES;
```

Then select an existing database:

```sql
USE database_name;
```

### Problem 3: Table Does Not Exist

If you see an error indicating that a table does not exist:

1. Check the selected database.
2. Run:

```sql
SHOW TABLES;
```

3. Verify the table name.
4. Check whether the table was created successfully.

### Problem 4: MySQL Server Is Not Running

If the console cannot connect to MySQL:

1. Open WAMP/XAMPP.
2. Check the MySQL service status.
3. Start MySQL.
4. Try connecting again.

---

## Module 11: Exam-Focused Key Concepts

### MySQL Console

A command-line interface used to communicate directly with the MySQL server.

### PuTTY

A terminal and SSH client commonly used to access remote servers.

### phpMyAdmin

A web-based graphical interface for administering MySQL/MariaDB databases.

### `SHOW DATABASES;`

Displays databases available to the currently connected MySQL user.

### `USE database_name;`

Selects a database for subsequent SQL operations.

### `SHOW TABLES;`

Displays the tables available in the currently selected database.

### `DESCRIBE table_name;`

Displays the structure of a table.

### `CREATE DATABASE`

Creates a new database.

### `DROP DATABASE`

Deletes a database and its contents.

### `CREATE TABLE`

Creates a new table.

### `INSERT`

Adds new records to a table.

### `SELECT`

Retrieves data from a table.

### `UPDATE`

Modifies existing records.

### `DELETE`

Removes records from a table.

---

## Quick Study Summary Checklist

- [ ] Know the **3 primary ways** to manage MySQL:
  - [ ] Local MySQL Console
  - [ ] PuTTY / SSH remote terminal
  - [ ] phpMyAdmin on Localhost

- [ ] Understand MySQL console authentication.
- [ ] Know that local root passwords depend on the installation configuration.
- [ ] Memorize:

```sql
SHOW DATABASES;
```

- [ ] Memorize:

```sql
USE database_name;
```

- [ ] Memorize:

```sql
SHOW TABLES;
```

- [ ] Understand:

```sql
DESCRIBE table_name;
```

- [ ] Understand the difference between:
  - [ ] `CREATE`
  - [ ] `INSERT`
  - [ ] `SELECT`
  - [ ] `UPDATE`
  - [ ] `DELETE`
  - [ ] `DROP`

- [ ] Remember the phpMyAdmin URL:

```text
http://localhost/phpmyadmin/
```

- [ ] Remember that SQL statements normally end with `;`.
- [ ] Understand the purpose of PuTTY and SSH for remote server access.
- [ ] Understand how to troubleshoot basic MySQL connection problems.

---

## Final Exam Revision

Remember the following:

> **MySQL Console = Command-Line Database Management**

> **PuTTY = Remote Terminal / SSH Access**

> **phpMyAdmin = Web-Based Database Management GUI**

> **`SHOW DATABASES;` = Display Databases**

> **`USE database_name;` = Select Database**

> **`SHOW TABLES;` = Display Tables**

> **`DESCRIBE table_name;` = Display Table Structure**

> **`CREATE DATABASE` = Create Database**

> **`DROP DATABASE` = Delete Database**

> **`INSERT` = Add Records**

> **`SELECT` = Retrieve Records**

> **`UPDATE` = Modify Records**

> **`DELETE` = Remove Records**

> **`;` = Terminates a SQL Statement**

The basic practical workflow is:

```text
1. Start MySQL
2. Open the MySQL Console
3. Authenticate
4. Run SHOW DATABASES;
5. Create or select a database
6. Create tables
7. Insert records
8. Query records
9. Update or delete records when necessary
10. Use phpMyAdmin when a graphical interface is preferred
11. Use PuTTY/SSH when remote server access is required
```

If these concepts and commands are understood, you have the fundamental knowledge required to manage MySQL databases using both command-line and graphical tools in a local development environment.

