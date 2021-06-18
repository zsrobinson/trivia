# Random Trivia Game

Visit Project: https://zsrobinson.github.io/trivia/

## About This Project

Hi, thanks for showing interest in my project!

This is just a little fun game to play that I started developing in March 2021. It's intended to be used on a video call, with one person (let's call them the host) sharing their screen and interacting with the website. However, this could be used in a variety of settings. This is my first time putting something out there on GitHub.

## Tutorial

After entering team names and pressing "Start", a random trivia question will appear on screen. At first, a random team is selected to go first. Whichever team with the larger box and more opauqe background is the team that is meant to answer the current question on team. After the current team agrees upon on an answer, the host will click the "Reveal Answer" button to show the correct answer. At this point, the host presses the check button if they got it correct, the x button if they got it wrong, or the arrow if they don't believe it was a fair question and would like to skip it and try again.  The game will continue like this forever, but of course the players will determine an end point ahead of time.

## How I Developed This Project

There are several trivia databases out there, but one of the best websites that I found for trivia was [Random Trivia Generator](https://randomtriviagenerator.com). After doing some digging around on the Network tab of the Inspect Element screen on that website, I noticed a request to a website with the URL of "https://www.randomtriviagenerator.com/questions?limit=6&page=1". This looked like many of the URLs I have seen while working with APIs for another project I was working on. I realized that I could get trivia questions from this website pretty easy just by making a request to this API (at least I think it's an API, I'm not too sure what to call it to be honest). Then, I added some gameplay elements around it to work well on a video call with one person sharing their screen. This person in control (the host) can reveal the answer and mark questions as being answered correctly or incorrectly.

I recently redesigned this project, making many fundamental changes. First, I started using the Fetch API to get questions, and now questions are requested in blocks of 256 which reduces the number of requests to the trivia source. Next, I implimented a feature that allows the project to automatically use a predefined set of questions if it is not able to fetch questions from the trivia source. I used a python script to generate 256 files with 256 questions in them from the trivia source. Finally, I am now using a CSS Grid for the layout instead of absolute values, making formatting and adding new features down the line MUCH easier.

## What I Could Improve

- More options to customize the game
- A win state, right now it just goes on forever
- Support for multiple trivia databases
- Crown next to the team with more points

## Credits

- Created by Zachary Robinson
- Trivia Questions from [Random Trivia Generator](https://randomtriviagenerator.com)
- Icons from [Font Awesome](https://fontawesome.com/)
- Lato font from [Google Fonts](https://fonts.google.com/specimen/Lato)
- Scrolling background gradient generated with [Gradient-Animator.com](https://www.gradient-animator.com)
- Conversion from Hex Color Values to SVG Filters generated with [CSS Filter Generator](https://codepen.io/sosuke/pen/Pjoqqp)
- Favicon sizes and code generated with [Favicon.io](https://favicon.io/favicon-converter)
