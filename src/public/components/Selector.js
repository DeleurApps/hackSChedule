import React from 'react';
import emoji from 'random-unicode-emoji';
import classNames from 'classnames';

const emojis = emoji.random({ count: 100 });

const Selector = ({ index, active, score, disabled, ...other }) => (
  <li key={index} {...other}
    className={classNames({
			active: (index === active),
			disabled: disabled
		})}>
    <b>#{index + 1}</b> {emojis[index % 100]}
  </li>
);

Selector.propTypes = {
  index: React.PropTypes.number,
  active: React.PropTypes.number,
  score: React.PropTypes.number
}

export default Selector;
