## Break Out Game with Rx.js 
🗣 _It is a block breaking game implemented with Rx.js._
> https://rxjs-break-out-game.netlify.app/  

<br/>

### 1. Preview
![rxjs-break-out-game-preview](https://user-images.githubusercontent.com/67793530/172020487-a2490582-cdff-4c8b-90c0-f7c95732c107.gif)

<br/>

### 2. Start on Local
```
% git clone https://github.com/choekko/rxjs-break-out-game.git
% cd rxjs-break-out-game
% yarn install
% yarn start
```
<br/>

### 3. How to Play
```
1. Press 'Start'
2. Move the bar left or right by pressing the arrow keys.
3. Bounce the ball to break the blocks
```
_Each time the game starts, the positions of the blocks are regenerated._

<br/>

### 4. Stack
|<img width="30" alt="react-logo" src="https://user-images.githubusercontent.com/67793530/172109940-97d63c83-b643-47ad-99bb-d71290cb72e4.png">|<img width="30" alt="rxjs-logo" src="https://user-images.githubusercontent.com/67793530/172110248-384ffd66-503e-4d19-b81a-c48d9846e659.png">|<img width="30" alt="rxjs-logo" src="https://user-images.githubusercontent.com/67793530/172107578-24931e75-4a5d-4e4d-b7d4-f898510df811.png">|<img width="30" alt="rxjs-logo" src="https://user-images.githubusercontent.com/67793530/172110242-b2991ba6-bd49-4f76-b957-91b055118d10.png">|
|:-:|:-:|:-:|:-:|
|[React.js](https://ko.reactjs.org/)|[Typescript](https://www.typescriptlang.org/)|[Rx.js](https://rxjs.dev/)|[React-Rxjs](https://react-rxjs.org/)|

<br/>

### 5. Folder Structure
```js
src/
ㄴ constants/    // Common Constants
ㄴ features/     // Main Features
  ㄴ display/    // Components for Displaying 
    ㄴ vacs/     // View Asset Components (tsx + style)
  ㄴ physics/    // Logics or Streams for Game Physics 
ㄴ pages/        // Page Components 
ㄴ styles/       // Common Styles (for Emotion)
ㄴ types/        // Common Types
ㄴ utils/        // Common Utils
```
