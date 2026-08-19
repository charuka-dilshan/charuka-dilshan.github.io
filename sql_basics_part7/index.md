# SQL Pattern Matching & Regular Expressions (Lecture 07)


<!--more-->

> **Academic Note:** This master study guide covers Lecture 07 notes, focusing on standard SQL pattern matching (`LIKE`) and advanced regular expressions (`REGEXP`) for string filtering.

---

## Module 1: Overview of Pattern Matching in MySQL

MySQL provides two primary approaches for matching patterns within string data:

1. **Standard SQL Pattern Matching** using the `LIKE` operator and wildcards.
2. **Regular Expression Pattern Matching** using the `REGEXP` operator.

Pattern matching is useful when you want to search for records based on partial text instead of requiring an exact match.

For example, instead of searching for one specific name:

```sql
SELECT *
FROM students
WHERE fname = 'Mohan';
```

you can search for names that begin with, end with, or contain particular characters.

---

## Module 2: Standard SQL Pattern Matching with `LIKE`

The `LIKE` operator is used to compare a string against a specified pattern.

MySQL provides two important wildcards for `LIKE`:

- **`%` (Percent sign):** Matches zero or more characters.
- **`_` (Underscore):** Matches exactly one character.

### 2.1 General Syntax

```sql
SELECT columns
FROM table_name
WHERE column_name LIKE 'pattern';
```

---

### 2.2 Finding Names Beginning with a Specific Letter

To display all student records where the first name begins with the letter `M`:

```sql
SELECT *
FROM students
WHERE fname LIKE 'M%';
```

The pattern:

```text
M%
```

means:

```text
M + zero or more characters
```

Therefore, names such as:

```text
Mohan
Malith
Mithujan
```

can match the pattern if they exist in the table.

---

### 2.3 Finding Names Ending with Specific Characters

To display all student records where the first name ends with `na`:

```sql
SELECT *
FROM students
WHERE fname LIKE '%na';
```

The pattern:

```text
%na
```

means:

```text
zero or more characters + na
```

---

### 2.4 Finding Names Containing Specific Characters

To find names containing `an` anywhere in the string:

```sql
SELECT *
FROM students
WHERE fname LIKE '%an%';
```

The `%` wildcard can appear before and after the search text.

---

## Module 3: The `%` Wildcard

The percent sign `%` represents zero or more characters.

For example:

```sql
SELECT *
FROM students
WHERE fname LIKE 'M%';
```

The pattern can match:

```text
M
Mohan
Malith
Mithujan
```

depending on the actual data.

### Important Rule

```text
% = zero or more characters
```

Therefore:

```text
M%
```

means the string must begin with `M`, but there is no restriction on how many characters follow it.

---

## Module 4: The `_` Wildcard

The underscore `_` represents exactly one character.

For example:

```sql
SELECT *
FROM students
WHERE fname LIKE '_ohan';
```

The pattern:

```text
_ohan
```

means:

```text
one character + ohan
```

Therefore, a five-character value such as:

```text
Mohan
```

can match the pattern.

---

### 4.1 Matching Exactly Six Characters

To find names containing exactly six characters, use six underscore characters:

```sql
SELECT *
FROM students
WHERE fname LIKE '______';
```

The six underscores represent:

```text
_ _ _ _ _ _
1 2 3 4 5 6
```

Therefore:

```text
______ = exactly six characters
```

---

## Module 5: Comparing `%` and `_`

| Symbol   | Meaning                 | Example  |
| -------- | ----------------------- | -------- |
| `%`      | Zero or more characters | `M%`     |
| `_`      | Exactly one character   | `_ohan`  |
| `______` | Exactly six characters  | `______` |

### Example

```sql
SELECT *
FROM students
WHERE fname LIKE 'M%';
```

means:

> Find names beginning with `M`, followed by zero or more characters.

Whereas:

```sql
SELECT *
FROM students
WHERE fname LIKE 'M____';
```

means:

> Find names beginning with `M` followed by exactly four characters.

Therefore, the complete name must contain exactly five characters.

---

## Module 6: Common `LIKE` Patterns

### Names Beginning with `M`

```sql
SELECT *
FROM students
WHERE fname LIKE 'M%';
```

### Names Ending with `na`

```sql
SELECT *
FROM students
WHERE fname LIKE '%na';
```

### Names Containing `an`

```sql
SELECT *
FROM students
WHERE fname LIKE '%an%';
```

### Names with Exactly Six Characters

```sql
SELECT *
FROM students
WHERE fname LIKE '______';
```

---

## Module 7: Regular Expression Pattern Matching with `REGEXP`

Regular expressions provide a more powerful method for searching text patterns.

MySQL supports regular expression matching using the `REGEXP` operator.

### General Syntax

```sql
SELECT columns
FROM table_name
WHERE column_name REGEXP 'pattern';
```

For example:

```sql
SELECT *
FROM students
WHERE fname REGEXP '^M';
```

This searches for names beginning with `M`.

---

## Module 8: Regular Expression Anchors

Two important regular expression anchors are:

| Symbol | Meaning               |
| ------ | --------------------- |
| `^`    | Beginning of a string |
| `$`    | End of a string       |

These anchors allow you to specify where a pattern must occur.

---

### 8.1 Caret (`^`)

The caret `^` represents the beginning of a string.

Example:

```sql
SELECT *
FROM students
WHERE fname REGEXP '^M';
```

The pattern:

```text
^M
```

means:

> The string must begin with `M`.

---

### 8.2 Dollar Sign (`$`)

The dollar sign `$` represents the end of a string.

Example:

```sql
SELECT *
FROM students
WHERE fname REGEXP 'na$';
```

The pattern:

```text
na$
```

means:

> The string must end with `na`.

---

## Module 9: Equivalent `LIKE` and `REGEXP` Queries

### Names Beginning with `M`

Using `LIKE`:

```sql
SELECT *
FROM students
WHERE fname LIKE 'M%';
```

Using `REGEXP`:

```sql
SELECT *
FROM students
WHERE fname REGEXP '^M';
```

---

### Names Ending with `na`

Using `LIKE`:

```sql
SELECT *
FROM students
WHERE fname LIKE '%na';
```

Using `REGEXP`:

```sql
SELECT *
FROM students
WHERE fname REGEXP 'na$';
```

Both approaches can be used for simple beginning-of-string and end-of-string searches.

---

## Module 10: Matching Exact Lengths with `REGEXP`

Regular expressions can also be used to match strings containing an exact number of characters.

To find names containing exactly six characters:

```sql
SELECT *
FROM students
WHERE fname REGEXP '^......$';
```

The pattern contains:

```text
^
......
$
```

where:

- `^` means beginning of the string.
- Each `.` represents one character.
- `$` means end of the string.

Therefore:

```text
^......$
```

means:

> The complete string must contain exactly six characters.

---

## Module 11: Exact Length Using a Quantifier

A shorter regular expression can be written using the `{n}` quantifier.

For six characters:

```sql
SELECT *
FROM students
WHERE fname REGEXP '^.{6}$';
```

The expression:

```text
.{6}
```

means six occurrences of the preceding expression.

The complete pattern:

```text
^.{6}$
```

means:

```text
Beginning
   ↓
Any character repeated exactly 6 times
   ↓
End
```

---

## Module 12: Comparing Exact-Length Techniques

There are several ways to search for six-character names.

### Using `LIKE`

```sql
SELECT *
FROM students
WHERE fname LIKE '______';
```

### Using `REGEXP` with six dots

```sql
SELECT *
FROM students
WHERE fname REGEXP '^......$';
```

### Using `REGEXP` with a quantifier

```sql
SELECT *
FROM students
WHERE fname REGEXP '^.{6}$';
```

| Technique           | Meaning                |
| ------------------- | ---------------------- |
| `LIKE '______'`     | Exactly six characters |
| `REGEXP '^......$'` | Exactly six characters |
| `REGEXP '^.{6}$'`   | Exactly six characters |

---

## Module 13: `LIKE` vs `REGEXP`

| Feature                       | `LIKE`         | `REGEXP`    |
| ----------------------------- | -------------- | ----------- |
| Standard SQL pattern matching | Yes            | No          |
| `%` wildcard                  | Yes            | No          |
| `_` wildcard                  | Yes            | No          |
| Regular expressions           | No             | Yes         |
| Beginning-of-string matching  | Yes            | Yes         |
| End-of-string matching        | Yes            | Yes         |
| Complex patterns              | Limited        | Powerful    |
| Exact character length        | `_` repetition | Quantifiers |

### Use `LIKE` for Simple Patterns

```sql
SELECT *
FROM students
WHERE fname LIKE 'M%';
```

### Use `REGEXP` for More Complex Patterns

```sql
SELECT *
FROM students
WHERE fname REGEXP '^M';
```

> **Exam Tip:** Remember that `LIKE` uses `%` and `_`, while `REGEXP` uses regular expression syntax.

---

## Module 14: Pattern Matching with Column Projection

Pattern matching can be combined with column projection.

For example:

```sql
SELECT fname, birth_date
FROM students
WHERE fname LIKE 'M%';
```

This returns only the `fname` and `birth_date` columns for matching records.

Using `REGEXP`:

```sql
SELECT fname, dept
FROM students
WHERE fname REGEXP '^M';
```

This returns only `fname` and `dept` for students whose names begin with `M`.

---

## Module 15: Pattern Matching with `ORDER BY`

Pattern matching can also be combined with sorting.

Example:

```sql
SELECT fname, birth_date
FROM students
WHERE fname LIKE 'M%'
ORDER BY birth_date ASC;
```

This query performs three operations:

1. Selects `fname` and `birth_date`.
2. Filters names beginning with `M`.
3. Sorts the matching records by birth date in ascending order.

Using `REGEXP`:

```sql
SELECT fname, birth_date
FROM students
WHERE fname REGEXP '^M'
ORDER BY birth_date ASC;
```

---

## Module 16: Pattern Matching with `IS NULL`

Pattern matching is normally applied to string values.

Missing values should be tested using `IS NULL` rather than `LIKE`.

For example:

```sql
SELECT fname
FROM students
WHERE tp_no IS NULL;
```

To search for telephone numbers beginning with `07`:

```sql
SELECT fname, tp_no
FROM students
WHERE tp_no LIKE '07%';
```

Remember:

```text
LIKE
 ↓
Pattern matching

IS NULL
 ↓
Missing-value testing
```

---

## Module 17: Common Mistakes

### Mistake 1: Forgetting `%`

Incorrect:

```sql
SELECT *
FROM students
WHERE fname LIKE 'M';
```

This searches for the exact value `M`.

Correct:

```sql
SELECT *
FROM students
WHERE fname LIKE 'M%';
```

This searches for names beginning with `M`.

---

### Mistake 2: Confusing `%` and `_`

Remember:

```text
% = zero or more characters
_ = exactly one character
```

Therefore:

```sql
WHERE fname LIKE 'M%'
```

and:

```sql
WHERE fname LIKE 'M____'
```

do not mean the same thing.

---

### Mistake 3: Using `%` for Exact Length

This:

```sql
WHERE fname LIKE '%'
```

does not mean a specific length.

It means zero or more characters.

For exactly six characters:

```sql
WHERE fname LIKE '______'
```

---

### Mistake 4: Forgetting Regex Anchors

This:

```sql
WHERE fname REGEXP 'M'
```

searches for `M` anywhere in the string.

To require `M` at the beginning:

```sql
WHERE fname REGEXP '^M'
```

To require `M` at the end:

```sql
WHERE fname REGEXP 'M$'
```

---

### Mistake 5: Mixing `LIKE` and `REGEXP` Syntax

Do not assume that `%` works as the regular-expression equivalent of "zero or more characters."

For example:

```sql
WHERE fname REGEXP 'M%'
```

does not represent the normal `REGEXP` syntax for names beginning with `M`.

Use:

```sql
WHERE fname REGEXP '^M'
```

instead.

---

## Module 18: Practical Query Reference

### Find Names Beginning with `M`

```sql
SELECT *
FROM students
WHERE fname LIKE 'M%';
```

### Find Names Ending with `na`

```sql
SELECT *
FROM students
WHERE fname LIKE '%na';
```

### Find Names Containing `an`

```sql
SELECT *
FROM students
WHERE fname LIKE '%an%';
```

### Find Six-Character Names

```sql
SELECT *
FROM students
WHERE fname LIKE '______';
```

### Regex: Names Beginning with `M`

```sql
SELECT *
FROM students
WHERE fname REGEXP '^M';
```

### Regex: Names Ending with `na`

```sql
SELECT *
FROM students
WHERE fname REGEXP 'na$';
```

### Regex: Exactly Six Characters

```sql
SELECT *
FROM students
WHERE fname REGEXP '^......$';
```

### Regex: Exactly Six Characters Using `{6}`

```sql
SELECT *
FROM students
WHERE fname REGEXP '^.{6}$';
```

---

## Module 19: Important Pattern Matching Reference

| Pattern    | Operator | Meaning                |
| ---------- | -------- | ---------------------- |
| `M%`       | `LIKE`   | Starts with `M`        |
| `%na`      | `LIKE`   | Ends with `na`         |
| `%an%`     | `LIKE`   | Contains `an`          |
| `_`        | `LIKE`   | Exactly one character  |
| `______`   | `LIKE`   | Exactly six characters |
| `^M`       | `REGEXP` | Starts with `M`        |
| `na$`      | `REGEXP` | Ends with `na`         |
| `^......$` | `REGEXP` | Exactly six characters |
| `^.{6}$`   | `REGEXP` | Exactly six characters |

---

## Module 20: Exam-Focused Key Concepts

### `LIKE`

`LIKE` is an SQL operator used for standard pattern matching.

```sql
WHERE fname LIKE 'M%';
```

### `%`

Matches zero or more characters.

```text
%
```

### `_`

Matches exactly one character.

```text
_
```

### `REGEXP`

Used for regular expression pattern matching.

```sql
WHERE fname REGEXP '^M';
```

### `^`

Represents the beginning of a string.

```text
^M
```

means the string starts with `M`.

### `$`

Represents the end of a string.

```text
na$
```

means the string ends with `na`.

### Exact Length with `LIKE`

```sql
SELECT *
FROM students
WHERE fname LIKE '______';
```

### Exact Length with `REGEXP`

```sql
SELECT *
FROM students
WHERE fname REGEXP '^.{6}$';
```

---

## Module 21: Complete Practical Workflow

```text
1. Identify the column to search
        ↓
2. Decide whether the pattern is simple or complex
        ↓
3. Use LIKE for standard SQL patterns
        ↓
4. Use % for zero or more characters
        ↓
5. Use _ for exactly one character
        ↓
6. Use REGEXP for regular-expression patterns
        ↓
7. Use ^ for the beginning of a string
        ↓
8. Use $ for the end of a string
        ↓
9. Use quantifiers when required
        ↓
10. Execute and verify the result
```

---

## Module 22: Quick Study Summary Checklist

- [ ] Understand the purpose of pattern matching.
- [ ] Know the `LIKE` operator.
- [ ] Know that `%` matches zero or more characters.
- [ ] Know that `_` matches exactly one character.
- [ ] Know how to find names beginning with a specific character.
- [ ] Know how to find names ending with specific characters.
- [ ] Know how to find names containing specific characters.
- [ ] Know how to find names with an exact character length.
- [ ] Understand the `REGEXP` operator.
- [ ] Understand the `^` regex anchor.
- [ ] Understand the `$` regex anchor.
- [ ] Know how to match strings beginning with a pattern using `REGEXP`.
- [ ] Know how to match strings ending with a pattern using `REGEXP`.
- [ ] Know how to use `.` in regular expressions.
- [ ] Understand the `{n}` quantifier.
- [ ] Understand the difference between `LIKE` and `REGEXP`.
- [ ] Know when to use `%`.
- [ ] Know when to use `_`.
- [ ] Understand that `%` and `_` are `LIKE` wildcards.
- [ ] Understand that regular expressions use different pattern syntax.
- [ ] Understand how pattern matching works with `WHERE`.
- [ ] Understand how pattern matching can be combined with `ORDER BY`.

---

## Module 23: Final Exam Revision

Remember:

> **`LIKE` = Standard SQL pattern matching**

> **`%` = Zero or more characters**

> **`_` = Exactly one character**

> **`REGEXP` = Regular expression pattern matching**

> **`^` = Beginning of string**

> **`$` = End of string**

### Core `LIKE` Examples

```sql
SELECT *
FROM students
WHERE fname LIKE 'M%';
```

> Finds names beginning with `M`.

```sql
SELECT *
FROM students
WHERE fname LIKE '%na';
```

> Finds names ending with `na`.

```sql
SELECT *
FROM students
WHERE fname LIKE '%an%';
```

> Finds names containing `an`.

```sql
SELECT *
FROM students
WHERE fname LIKE '______';
```

> Finds names containing exactly six characters.

### Core `REGEXP` Examples

```sql
SELECT *
FROM students
WHERE fname REGEXP '^M';
```

> Finds names beginning with `M`.

```sql
SELECT *
FROM students
WHERE fname REGEXP 'na$';
```

> Finds names ending with `na`.

```sql
SELECT *
FROM students
WHERE fname REGEXP '^......$';
```

> Finds names containing exactly six characters.

```sql
SELECT *
FROM students
WHERE fname REGEXP '^.{6}$';
```

> Finds names containing exactly six characters using a quantifier.

---

## Final Pattern-Matching Map

```text
LIKE
 │
 ├── %  → zero or more characters
 │
 └── _  → exactly one character

REGEXP
 │
 ├── ^  → beginning of string
 │
 ├── $  → end of string
 │
 ├── .  → any character
 │
 └── {n} → repeat n times
```

> **Final Key Takeaway:** Master `LIKE`, `%`, `_`, `REGEXP`, `^`, `$`, and `{n}`. These pattern-matching concepts provide the foundation for searching and filtering text data efficiently in MySQL.

