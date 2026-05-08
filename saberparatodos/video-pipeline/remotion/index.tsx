import { registerRoot } from "remotion";
import React from "react";
import { Composition } from "remotion";
import { HelloWorld } from "./src/HelloWorld/index";
import { VerticalMathTemplate, verticalMathCalculateMetadata } from "./src/vertical-math-template";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          title: "Bienvenido a SaberParaTodos",
          hook: "¿Listo para aprender?",
          steps: [
            "Entra a tu panel de control",
            "Selecciona la materia",
            "Elige las preguntas",
            "Publica tu examen",
          ],
          outro: "Síguenos para más tutoriales",
        }}
      />
      <Composition
        id="VerticalMathTemplate"
        component={VerticalMathTemplate}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        calculateMetadata={verticalMathCalculateMetadata}
        defaultProps={{
          title: "Ecuaciones de Primer Grado",
          topic: "Matemáticas",
          steps: [
            {
              label: "Identificar la ecuación",
              math: "2x + 5 = 13",
              explanation: "Primero, identificalos términos constantes y la variable.",
            },
            {
              label: "Aislar la variable",
              math: "2x = 13 - 5",
              explanation: "Resta 5 de ambos lados para mantener la igualdad.",
            },
            {
              label: "Resolver",
              math: "x = 8 / 2",
              explanation: "Divide ambos lados por el coeficiente de x.",
            },
            {
              label: "Verificar",
              math: "2(4) + 5 = 13",
              explanation: "Sustituye el valor obtenido y verifica que la igualdad se cumple.",
            },
          ],
          timecodes: [30, 90, 150, 210],
          duration: 270,
          audioSrc: null,
        }}
      />
    </>
  );
};

registerRoot(RemotionRoot);
