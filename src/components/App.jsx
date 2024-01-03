import { Component } from 'react';
import css from './App.module.css';

import { Feedback } from './Feetback/feetback';
import { Notification } from './Notification/Notification';
import { Section } from './Section/Section';
import { Statistic } from './Statistic/Statistic';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  }
  countTotalFeedback = () => {
    return this.state.good + this.state.neutral + this.state.bad;
  };

  countPositiveFeedbackPercentage = () => {
    return Math.round(
      (this.state.good /
        (this.state.good + this.state.neutral + this.state.bad)) *
        100
    );
  };

  handleIncrement = event => {
    event.preventDefault();
    this.setState(prevState => {
      return { [event.target.name]: prevState[event.target.name] + 1 };
    });
  };
  render() {
    const totalFeedback = this.countTotalFeedback();
    return (
      <section className={css.wrapper}>
        <Section title="Please save feedback">
          <Feedback
            options={Object.keys(this.state)}
            onLeaveFeedback={this.handleIncrement}
          />
        </Section>

        {totalFeedback ? (
          <Section title="Statistic">
            <Statistic
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          </Section>
        ) : (
          <Notification message="There is no feedback" />
        )}
      </section>
    );
  }
}