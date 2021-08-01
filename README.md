# soona challenges

## word count
Given a phrase, count the occurrences of each word in that phrase.

For the purposes of this exercise you can expect that a word will always be one of:

- A number composed of one or more ASCII digits (ie "0" or "1234") OR
- A simple word composed of one or more ASCII letters (ie "a" or "they") OR
- A contraction of two simple words joined by a single apostrophe (ie "it's" or "they're")
- When counting words you can assume the following rules:
  - The count is case insensitive (ie "You", "you", and "YOU" are 3 uses of the same word)
  - The count is unordered; the tests will ignore how words and counts are ordered
  - Other than the apostrophe in a contraction all forms of punctuation are ignored
  - The words can be separated by any form of whitespace (ie "\t", "\n", " ")

## mineswepper
Add the mine counts to a completed Minesweeper board.

Minesweeper is a popular game where the user has to find the mines using numeric hints that indicate how many mines are directly adjacent (horizontally, vertically, diagonally) to a square.

In this exercise you have to create some code that counts the number of mines adjacent to a given empty square and replaces that square with the count.
The board is a rectangle composed of blank space (' ') characters. A mine is represented by an asterisk ('*') character.
If a given space has no adjacent mines at all, leave that square blank.
