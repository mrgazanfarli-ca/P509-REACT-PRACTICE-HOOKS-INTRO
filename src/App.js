import React from 'react';

import './App.css';
import { Input } from "./components/Input";
import Button from "./components/Button";
import { DQuestionAndAnswers } from './consts';

const ENumberInputType = {
  FIRST: 'first',
  SECOND: 'second'
}

function App() {
  const [numberValues, setNumberValues] = React.useState(({
    firstNumber: 1,
    secondNumber: 1
  }));

  const [result, setResult] = React.useState('');
  const [correctAnswers, setCorrectAnswers] = React.useState();
  const [quizAnswers, setQuizAnswers] = React.useState({});
  // const [test, setTest] = React.useState('');

  // const stateChanger = prevState => ({ ...prevState, firstNumber: 5 });
  // function stateChanger2(prevState) {
  //   return ({
  //     ...prevState, firstNumber: 5
  //   })
  // }

  // React.useEffect(() => {
  //   // setTest(test + 'test');
  // }, []);

  const handleNumberChange = ({ target: { value } }, which) => {
    if (!isNaN(value) && Boolean(value)) {
      switch (which) {
        case ENumberInputType.FIRST: {
          setNumberValues(prevState => ({ ...prevState, firstNumber: value }));
          setResult(value % numberValues.secondNumber);
          break;
        }
        case ENumberInputType.SECOND: {
          setNumberValues(prevState => ({ ...prevState, secondNumber: value }));
          setResult(numberValues.firstNumber % value);
          break;
        }
        default:
          break;
      }
    }
  }

  const handleSubmit = () => {
    // let counter = 0;
    // DQuestionAndAnswers.forEach((item) => {
    //   if (quizAnswers[item.id] === item.correctAnswer) {
    //     counter++;
    //   }
    // });

    const correctlyAnsweredQuestions = DQuestionAndAnswers.filter(item => quizAnswers[item.id] === item.correctAnswer);
    setCorrectAnswers(correctlyAnsweredQuestions);
  }

  const handleRadioSelect = (event, questionId) => {
    setQuizAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: event.target.value
    }));
  }

  const handleQuizReset = () => {
    setCorrectAnswers(undefined);
    setQuizAnswers({});
  }

  return (
    <div className="App">
      <header className="App-header">
        {/*<div className="input-container">*/}
        {/*  <Input*/}
        {/*      value={numberValues.firstNumber}*/}
        {/*      onChange={(event) => handleNumberChange(event, ENumberInputType.FIRST)}*/}
        {/*  />*/}
        {/*  <div className="d-flex flex-column">*/}
        {/*    <Input readOnly value={result} />*/}
        {/*    /!*<Button onClick={handleCalculateClick} className="mt-2">Calculate</Button>*!/*/}
        {/*  </div>*/}
        {/*  <Input*/}
        {/*      value={numberValues.secondNumber}*/}
        {/*      onChange={(event) => handleNumberChange(event, ENumberInputType.SECOND)}*/}
        {/*  />*/}
        {/*</div>*/}
        <div className="question-container">
          {DQuestionAndAnswers.map((item, index) => {
            const isAnsweredCorrectly = correctAnswers?.some(answer => answer.id === item.id);

            return (
                <div
                    key={item.id}
                    className={`question-card ${isAnsweredCorrectly ? 'question-card--correct' : Boolean(correctAnswers) ? 'question-card--wrong' : ''}`}
                >
                  <p>{index + 1}. {item.question}</p>
                  {Object.keys(item.answerList).map((key, index) => {
                    const itemKey = `${item.answerList[key]}${index}`;
                    return (
                        <div className="answer-container" key={itemKey}>
                          <input
                              onChange={(event) => handleRadioSelect(event, item.id)}
                              value={item.answerList[key]}
                              type="radio"
                              id={itemKey}
                              name={item.question}
                          />
                          <label htmlFor={itemKey}>{key}. {item.answerList[key]}</label>
                        </div>
                    )
                  })}
                </div>
            )
          })}
        </div>
        <Button className="mb-2" onClick={handleQuizReset}>Reset</Button>
        <Button className="mb-2" onClick={handleSubmit}>Submit</Button>
      </header>
    </div>
  );
}

export default App;
