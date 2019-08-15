import { Component } from '@angular/core';


enum PageState {
  init,
  inputFirstVal,
  inputSecondVal,
  sumDisplay
}

enum Operator {
  multiply = 'x',
  minus = '-',
  add = '+',
  equal = '=',
  division = '÷',
  none = 'none'
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})



export class HomePage {

  pageStates = PageState;
  activePageState = PageState.init;

  activeOperator = Operator.none;
  firstValue = ''; // need to use tring to combine number
  secondValue = '';

  // tslint:disable-next-line:ban-types
  displayValue: String | number = 0;
  keys = [
    [1, 2, 3, Operator.multiply],
    [4, 5, 6, Operator.minus],
    [7, 8, 9, Operator.add],
  ];

  constructor() { }

  onKeyPress(key) {
    switch (key) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        this.numberPressed(key);
        break;
      case Operator.add:
      case Operator.division:
      case Operator.minus:
      case Operator.multiply:
        this.operatorPressed(key);
        break;
      case Operator.equal:
        this.equalToPressed();
        break;
      default:
        break;
    }

  }

  numberPressed(num: number) {
    if (this.activePageState === PageState.init) {
      this.firstValue += num.toString();
      this.displayValue = this.firstValue;
    } else if (this.activePageState === PageState.inputSecondVal) {
      this.secondValue += num.toString();
      this.displayValue = this.secondValue;
    } else if (this.activePageState === PageState.sumDisplay) {
      // TODO:Implement cont adding features
    }
  }

  operatorPressed(key) {
    if (key !== this.activeOperator) {
      if (this.activePageState === PageState.sumDisplay) {
        this.secondValue = '';
        this.activePageState = PageState.inputSecondVal;
      } else if (this.activePageState === PageState.init) {
        this.activePageState = PageState.inputSecondVal;
      } else if (this.activePageState === PageState.inputSecondVal) {
        this.anotherOperatorPressed();
      }
      this.activeOperator = key;
    }
  }

  anotherOperatorPressed() {
    const result = this.calculate(parseInt(this.firstValue, 10), parseInt(this.secondValue, 10), this.activeOperator);
    this.displayValue = result;
    this.firstValue = result;
    this.secondValue = '';
    this.activePageState = PageState.inputSecondVal;
  }

  equalToPressed() {
    const result = this.calculate(parseInt(this.firstValue, 10), parseInt(this.secondValue, 10), this.activeOperator);
    this.firstValue = result;
    this.displayValue = result;
    this.activePageState = PageState.sumDisplay;
  }

  calculate(firstValue, secondValue, operation: Operator) {
    switch (operation) {
      case Operator.add:
        return firstValue + secondValue;
      case Operator.minus:
        return firstValue - secondValue;
      case Operator.multiply:
        return firstValue * secondValue;
      case Operator.division:
        return firstValue / secondValue;
    }
  }

  onResetClick() {
    this.activeOperator = Operator.none;
    this.activePageState = PageState.init;
    this.firstValue = '';
    this.secondValue = '';
    this.displayValue = 0;
  }
}
