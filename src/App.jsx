import IconeSwim from "./IconeSwim";
import IconeRun from "./IconeRun";
import IconeLift from "./IconeLift";
import "./style.css";
import { useEffect, useState } from "react";

function App() {
  const exercicios = [
    { nome: "Natação", icone: <IconeSwim /> },
    { nome: "Corrida", icone: <IconeRun /> },
    { nome: "Lift", icone: <IconeLift /> },
  ];

  const [classeTela, setClasseTela] = useState("");
  const [classeCronometro, setClasseCronometro] = useState("");
  const [horario, setHorario] = useState(atualizaHoras());
  const [timer, setTime] = useState(0);
  const [intervaloTimer, setIntervaloTimer] = useState(null);
  const { minutos, segundos, centesimos } = calcularHorario();

  function atualizaHoras() {
    const horas = new Date().getHours().toString().padStart(2, "0");
    const minutos = new Date().getMinutes().toString().padStart(2, "0");

    return horas + ":" + minutos;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setHorario(atualizaHoras());
    }, 5000);
    return function () {
      clearInterval(interval);
    };
  });

  function clicouExercicio() {
    setClasseTela("tela--cronometro");
  }

  function clicouVoltar() {
    setClasseTela("");

    cliclouClouse();
  }

  const cliclouPlay = () => {
    setClasseCronometro("iniciou");

    rodarTime();
  };

  const cliclouPause = () => {
    setClasseCronometro("");

    clearInterval(intervaloTimer);
  };

  const cliclouClouse = () => {
    setClasseCronometro("");

    setTime(0);
    clearInterval(intervaloTimer);
  };

  function rodarTime() {
    setIntervaloTimer(
      setInterval(() => {
        setTime((timerAtual) => timerAtual + 10);
      }, 10)
    );
  }

  function calcularHorario() {
    const minutos = Math.floor(timer / 60000)
      .toString()
      .padStart(2, "0");

    const segundos = Math.floor((timer % 60000) / 1000)
      .toString()
      .padStart(2, "0");

    const centesimos = Math.floor(((timer % 60000) % 1000) / 10)
      .toString()
      .padStart(2, "0");

    return { minutos, segundos, centesimos };
  }

  return (
    <div className="geral">
      <div className={"tela " + classeTela}>
        <div className="cabecalho">
          <h1>Exercício</h1>
          <p>{horario}</p>
        </div>

        <div className="exercicios" onClick={clicouExercicio}>
          {exercicios.map((exercicio) => (
            <div key={exercicio.nome} className="exercicio">
              {exercicio.icone}
              <p className="atividade">{exercicio.nome}</p>
            </div>
          ))}
        </div>

        <div className={"cronometro " + classeCronometro}>
          <div className="tempo">
            <p className="numero">{minutos}</p>
            <p>:</p>
            <p className="numero">{segundos}</p>
            <p>:</p>
            <p className="numero">{centesimos}</p>
          </div>

          <div className="botoes">
            <div className="botao close" onClick={cliclouClouse}>
              <img src="./assets/close.svg" alt="icone de fechar" />
            </div>

            <div className="botao play" onClick={cliclouPlay}>
              <img src="./assets/play.svg" alt="icone de play" />
            </div>

            <div className="botao pause" onClick={cliclouPause}>
              <img src="./assets/pause.svg" alt="icone de pause" />
            </div>
          </div>

          <p className="voltar" onClick={clicouVoltar}>
            Voltar
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
