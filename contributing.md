# Contributing

Here are all of the steps you should follow whenever
contributing to this repo!

## Making Changes

1. Before you start making changes, always make sure you're on
   the main branch, then `git pull` and `npm i` to make sure
   your code is up to date
2. Create a branch `git checkout -b <name-of-branch>`
3. Make changes to the code
4. `npm run format` to run prettier to format code and
   `npm run lint` to run ESlint

## Commiting Changes

When interacting with Git/GitHub, feel free to use the command
line, VSCode extension, or Github desktop. These steps assume
you have already made a branch using
`git checkout -b <branch-name>` and you have made all neccessary
code changes for the provided task.

1. View diffs of each file you changed using the VSCode Github
   extension (3rd icon on far left bar of VSCode) or GitHub
   Desktop
2. `git add .` (to stage all files) or `git add <file-name>` (to
   stage specific file)
3. `git commit -m "<type>[optional scope]: <description>"` or
   `git commit -m "<type>[optional scope]: <description>" -m "[optional body]"`
   or `git commit` to get a message prompt
4. `git push -u origin <name-of-branch>`
