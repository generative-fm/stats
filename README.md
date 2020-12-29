# @generative.fm/stats

Used for measuring and loading metrics for Generative.fm generators.

## Usage

```javascript
import { getPlayTime, recordEmission } from '@generative.fm/stats';

getPlayTime().then((playTime) => {
  console.log(playTime['zed']);
});

recordEmission({
  startTime: Date.now() - 1000,
  endTime: Date.now(),
  pieceId: 'zed',
  userId: 'alex',
});
```
