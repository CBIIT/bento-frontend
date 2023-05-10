# StatsBar

The StatsBar component shows a list of numeric values and their labels.

## Usage

To import the components from LocalFind, use the following:

```javascript
import StatsBar from 'path/to/bento-core/StatsBar';
...
<StatsBar stats={stats} styles={styles} />
```

### Options

The StatsBar component accepts two props:

- `stats` - A list of numerical values, each paired with a string name of the value
- `styles` - Global styles defined in the host application

## Bento Reference Implementation

The StatsBar component can be found at the top of the [dashboard page](https://bento-tools.org/#/explore), where it displays the number of programs, the number of arms, and more.

The reference implementation does not use icons in the StatsBar.
