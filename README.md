# Random Trivia Game

Visit Project: https://zsrobinson.github.io/trivia/

## About This Project

Hi, thanks for showing interest in my project!

This is just a little fun game to play that I developed in March 2021. It's intended to be used on a video call, with one person (let's call them the host) sharing their screen and interacting with the website. However, this could be used in a variety of settings. This is my first time putting something out there on GitHub.

## Tutorial

After entering team names, random trivia question will appear on screen. According to whichever team's scoreboard is bolded with > < surrounding it will answer. After answering the question, the host will click the question to reveal the answer. At this point, the host presses the check if they got it correct, the x if they got it wrong, or the arrow if they don't believe it was a fair question and would like to skip it.

## How It Works

There are several trivia databases out there, but one of the best websites that I found for trivia was [Random Trivia Generator](https://randomtriviagenerator.com). After doing some digging around on the Network tab of the Inspect Element screen on that website, I noticed a request to a website with the URL of https://www.randomtriviagenerator.com/questions?limit=6&page=1. This looked like many of the URLs I have seen while working with APIs for another project I was working on. I realized that I could get trivia questions from this website pretty easy just by making a request to this API (at least I think it's an API, I'm not too sure what to call it to be honest).

Anyways after finding that out, I added some gameplay elements around it to work well on a video call with one person sharing their screen. This person in controll (the host) can reveal the answer and mark questions as being answered correctly or incorrectly. For the buttons to do this and for icons for trivia categories, I used icons from [Material Design](https://fonts.google.com/icons). Right now, I have all of the icons, as well as the font Lato imported from Google Fonts. Finally, I'm also using sound effects from [freesound](https://freesound.org) to enhance the experience a little bit more.

## What I Could Improve

- Using .svg files for the icons instead of using Google Fonts for less support on 3rd parties
- A new GUI (I'm not too great at CSS right now)
- A timer in the corner of the screen so people don't spend too long on a question
- More customizability options
- A win state, right now it just goes on forever
- Support for multiple trivia databases

## Credits

- Created by Zachary Robinson
- Trivia Questions from [Random Trivia Generator](https://randomtriviagenerator.com)
- Icons from [Material Design](https://fonts.google.com/icons)
- SFX from Bertrof on [freesound](https://freesound.org)
