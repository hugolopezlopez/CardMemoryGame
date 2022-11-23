# Card Memory Game

I developed this game for a tech test, and I took the chance to make a game for my child. I had a look at the level selector screen of the famous <a target="_blank" href="https://en.wikipedia.org/wiki/Lemmings_(video_game)">Lemmings</a> game to create a retro style and a simple interface.

## Technology

The game is done in React and using **clean**, **maintainable** and **well-designed** code. Using tests to have a more stable and confident base code. Also using a linter and a prettifier.

About the project architecture, the file structure is divided into routes, components, assets, config and redux folders. The tests are kept in each component folder, good practice to avoid forgetting its use.

From the config file all the parameters of the game can be set.

To start the project, clone the repository, run ```npm install``` and ```npm start```.

## Changing the game settings

Use the config file to change the time the cards are displayed, the limit time to resolve the board, the flipping card time, or to add or remove difficulty levels.

The game has two colors, primary and secondary, also configurable from css custom properties.

The images used are PNGs with transparent background and they are resized automatically, regardless of its size, so they can be replaced by any other.

## Play the game <a target="_blank" href="https://fluffy-blancmange-28cb7b.netlify.app/">here!</a>