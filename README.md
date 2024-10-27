# Apify FE developer interview task

## Getting started

This project was created assuming you use NodeJS version 20 (it was created with v20.10.0).
To run the project, you first need to install all dependencies:

```bash
npm install
cd ./frontend
npm install
cd ../backend
npm install
```

Then, you can run the project with:

```bash
npm run backend
```

```bash
npm run frontend
```

## Other available commands

Both the frontend and backend have tests and eslint.
To run eslint on the whole project, you can run:

```bash
npm run lint
```

To run tests on the backend, call:

```bash
npm run test:backend
```

To run tests on the frontend, there are two options.
For E2E testing you need to have both frontend and backend running and then call:

```bash
npm run test:frontend:e2e
```

For component testing, you should not have the application running and then call:

```bash
npm run test:frontend:components
```

## How to complete the task

1. Clone this repository.
2. Create branch named using your name and year and month like `jaroslavhejlek202112`
3. Switch to the branch and install all dependencies (make sure to use Node 20).
4. __Read this README thoroughly__ :)
5. Read through the existing code and note any work that needs to be done.
6. Plan your work.
7. Start your timer and start working. __Only start your timer when you actually start working on the task__, not when you are reading the code or planning.
8. Once you finish, or if you run out time, create a pull request and mark @gippy as a reviewer.
    - The title should be `<Your name> - <Date>`.
    - In the description, write how long it took you to finish and optionally how long did you spent planning. Also, add whether you got stuck anywhere and any other information that you feel is important and not clear from the code.

## Requirements

- The task should be completed in 4 hours. If you do not finish in time, you can still create a pull request and let us know what you couldn't finish in time.
- __You can only install one additional package, either by adding a new package or when replacing package you wont use.__
- All TODOs in the code should be completed.
- The code should be clean and readable.
- The code should pass all tests and eslint, including the tests which you create yourself.

## Task description

This task is loosely based on the data from Advent of Code 2023 Day 3 challenge, which you can find [here](https://adventofcode.com/2023/day/3) if you are interested.
The main goal of this task is to create an app which will visualize data that is very similar to the data from the challenge.

You can check the recording `example.mp4` to see how the final result should approximately work like. You can style the app any way you want - the recording is just an example.

The whole process is supposed to look like this:

1. When the frontend app mounts, it uses the `generateInputData` function to generate a random square grid of 200x200 cells.

    The grid looks like this (but much larger):

    ```text
    . 6 * . 4 .
    1 . 9 . 0 #
    $ 7 . 9 % 4
    . 2 3 1 5 .
    $ 7 @ 9 % 4
    . 1 # 3 5 *
    ```

2. The app then sends this data to the backend, where the data is processed.
3. The processing works like this:
    1. The matrix is rotated counter-clockwise by 90 degrees.
    2. All numbers in the matrix are increased by 1. If the number is 9, it's changed to 0.
    3. The matrix is then processed into neighborhoods. A neighborhood is a group of 9 cells, where the middle cell is a symbol and the other 8 cells can be anything, but are around the middle cell.
4. When the list of all neighborhoods is calculated, it's sent as a response back to the frontend.

    So for example if we apply this logic to the last `*` symbol in the grid above in the bottom-right corner, the final neighborhood would look like this:

    ```text
    undefined undefined undefined
    5 * undefined
    % 6 undefined
    ```

    This is because we rotate the matrix counter-clockwise by 90 degrees, so the `*` symbol is now in the top-right corner. Then we increase all numbers by 1, so the 4 becomes 5. Then we take the 3x3 square around the `*` symbol and that's our neighborhood. But because it's in top corner, there are no cells above it and to the right of it, so those are undefined.

5. The frontend then displays the data (it's up to you how it looks). Each item should always contain an __icon__ that represents the symbol and __value__ which represents the sum of all numbers in the neighborhood.
    - The icon representing the symbol must be colored. The color is based on the value of the neighborhood as gradient of white to green. The minimum value of the neighborhood is 0 and the maximum value is 72. So, 0 means the icon is white, 72 means it's green, and everything in between is calculated based on the value.
6. When you click on the neighborhood, you should see a popover displaying the full neighborhood (all 9 cells), with the middle cell having the symbol replaced with the icon.
7. Additionally, the UI has control panel above the display. The panel includes the following:
    - A group of buttons with icons for each symbol. Clicking on the button will select it and highlight it. The list of neighborhoods is then filtered only to show neighborhoods with the selected symbol. Only one button can be enabled at a time.
    - A date and time indicator that shows current time and refreshes every second.
    - A checkbox that allows the user to enable/disable automatic filtering of data based on time period. When the checkbox is checked, the list of neighborhoods is filtered to only show neighborhoods with a value in the current 10s interval.
        - For example: If current time is 10:25:01, only neighborhoods with values between 0 and 9 will be shown. If the time is 10:25:11, only neighborhoods with value between 10 - 19 will be shown. The only difference is when the time is 10:25:50 - 10:25:59. In this case, the allowed values are 50 - 72.

Additional notes about expected behavior:

- All colors except for the icon color are up to you, but the base color for the icon is white.
- The color of the icon inside the popover does not need to be calculated, it can be white.
- When the popover is displayed, the user can close it by clicking on the button again. Optionally, it can also be closed by clicking outside of the popover, but that is for bonus points.
- When the popover is displayed, the automatic filtering by time period is disabled.
- The processing on backend should be done in the most optimized way you can think of. The data is supposed to be processed as fast as possible.
- Styling of the app is up to you, nice looking UI with good UX is a bonus (the example is very basic in this regard).

Good luck! :)
