import React from 'react';
import './App.css';


const testParams: Param[] = [
  {
    id: 1,
    name: 'Назначение',
    type: 'string'
  },
  {
    id: 2,
    name: 'Длина',
    type: 'string'
  }
];

const testModel: Model = {
  paramValues: [
    {
      paramId: 1,
      value: 'повседневное'
    },
    {
      paramId: 2,
      value: 'макси'
    },
  ],
  colors: []
};

type ParamType = 'string'; // Здесь можем расширить типы параметров c помощью Union Types.
type Color = string; // Не особо понял для чего массив colors в Model,
// поэтому оставил просто строкой, потом можно так же расширять с помощью Union Types.

interface Param {
  id: number;
  name: string;
  type: ParamType;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  model: Model;
}

class ParamEditor extends React.Component<Props, State> {
  state = {model: this.props.model};

  getModel(): Model {
    return this.state.model;
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>, id: number) {
    this.setState((prevState) => {
      return {
        model: {
          ...prevState.model,
          paramValues: prevState.model.paramValues.map(val => {
            if (id === val.paramId) {
              return {
                ...val,
                value: e.target.value
              };
            }

            return val;
          })
        }
      };
    });
  }

  render() {
    return (
      <div className='wrapper'>
        <div className="param-editor">
          <div className="param-titles">
            {this.props.params.map(param => <span key={param.id}>{param.name}</span>)}
          </div>
          <div className="param-values">
            {this.state.model.paramValues.map(val =>
              <input key={val.paramId} value={val.value}
                     onChange={(e) => this.onChange(e, val.paramId)}
              />)}
          </div>
        </div>
        <h3>Актуальное состояние модели:</h3>
        <span>{JSON.stringify(this.getModel())}</span>
      </div>
    );
  }
}


function App() {
  return (
    <div className="App">
      <ParamEditor params={testParams} model={testModel}/>
    </div>
  );
}

export default App;
