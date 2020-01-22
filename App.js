import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Button from "./src/components/Button";
import Display from "./src/components/Display";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0
};

export default class App extends Component {
  state = { ...initialState };

  addDigit = n => {
    /* 
      Primeiro verifica se o primeiro número digitado é igual a zero.
      Caso seja igual a zero ele irá limpa o display
    */

    //O segundo limpa se um estado estiver dizendo para limpa
    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;

    if (n === "." && !clearDisplay && this.state.displayValue.includes(".")) {
      /*
        Verifica se no display já tem um ponto. 
        Caso já tenha um ponto ele não ira retorna nada e não vai adiciona mais pontos
        */
      return;
    }
    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({ displayValue, clearDisplay: false });

    if (n !== ".") {
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[this.state.current] = newValue;
      this.setState({ values });
    }
  };

  clearMemory = () => {
    this.setState({ ...initialState });
  };

  setOperation = operation => {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      const equals = operation === "=";
      const values = [...this.state.values];
      try {
        /*
        values zero pega o primeiro valor do array que a pessoa digito
        this.state.operation pega o valor da operação digitada pelo usuário. ex: somar
        values um pega o segundo valor do array que o usuário já digitou
        por fim ele soma esses dois valores e salva na primeira posição do array
        */

        //eval avalia os dados e faz a operação

        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.values[0];
      }

      values[1] = 0;
      this.setState({
        displayValue: `${values[0]}`,
        //se operação for = recebe null
        //se tiver uma operação valida ele seta a operação no operation
        operation: equals ? null : operation,
        //se seleciona igual ele vai seta no indice zero do array
        //se ele seta outra operação ex: mais, menos irá seta o valor no indice 1 do array
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          <Button label="AC" triple onClick={this.clearMemory} />
          <Button label="/" operation onClick={this.setOperation} />
          <Button label="7" onClick={this.addDigit} />
          <Button label="8" onClick={this.addDigit} />
          <Button label="9" onClick={this.addDigit} />
          <Button label="*" operation onClick={this.setOperation} />
          <Button label="4" onClick={this.addDigit} />
          <Button label="5" onClick={this.addDigit} />
          <Button label="6" onClick={this.addDigit} />
          <Button label="-" operation onClick={this.setOperation} />
          <Button label="1" onClick={this.addDigit} />
          <Button label="2" onClick={this.addDigit} />
          <Button label="3" onClick={this.addDigit} />
          <Button label="+" operation onClick={this.setOperation} />
          <Button label="0" double onClick={this.addDigit} />
          <Button label="." onClick={this.addDigit} />
          <Button label="=" operation onClick={this.setOperation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
