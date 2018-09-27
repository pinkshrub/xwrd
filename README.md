# XWRDR - A Crossword Application

xwrdr is a project to help me build crosswords. The part that I want xwrdr to handle is letting me know if a grid is a solveable shape and to generate some solutions. Ideally, I could even have themes and get multiple solutions, which would allow me to focus on developing clues. This will not take words and generate a grid that uses them, it is specifically for seeing if a grid is solveable with a given word list.


Key Features:
- Determine wether a grid is solveable with a given word list.
- Provide solution(s) for a given grid

Neat things to check out:
- Implementation of Trie
    - currently not particulary fancy
- Solving algorithm
    - not optimized for speed (have some ideas on that, just want to focus elsewhere)

Current Status:
- There is some code that can solve some basic grids.

Using Xwrdr:
Currently, Xwrdr isn't set up to be particularly useful. I'd like to change that, but initial goals is to just get some of my work out and about on the web. If you did want to use Xwrdr, here are the steps:
- 1 Clone the repo so you have access to the Solver and Trie classes
- 2 Build a word list you'd like to use, make sure it is something you can turn into a JS array. JSON would be lovely.
- 3 Build a grid, '*' is what represents a dark square currently.
- 4 Go ahead and run the biz using whatever JS magic tool you'd like

To-Dos:
- Tidy up basic interface
- Smoother interface for different use cases
    - Use as an API
    - Use as an application
    - Use as function
    - packagification would be lovely
- Deploy as usable tool
- Add Persistent Tries to reduce start-up time
- Allow more flexible solutions
    - Weighted words
    - Phrases
    - fancier crossword features such as Rebus clues

Technologies Used:
- Currently, its all JS
- Eventually:
    - REACT front-end
    - express on the backend

Contributing:
I'm not exactly looking for contributions as this is more of a solo project, but feel to for/clone this for your own use. If you do have suggestions/ideas feel free to comment or make a pull request anyways, because why not!
