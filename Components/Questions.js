// questions.js
export const MonthQuestions = [
    {
      question: "En el último mes, ¿con qué frecuencia te has sentido afectado por algo que ocurrió inesperadamente? ",
      options: [
        { text: "Nunca", score: 0 },
        { text: "Casi nunca", score: 1 },
        { text: "Algunas veces", score: 2 },
        { text: "A menudo", score: 3 },
        { text: "Muy a menudo", score: 4 },
      ],
    },
    {
      question: "En el último mes, ¿con qué frecuencia te has sentido incapaz de controlar las cosas importantes en tu vida? ",
      options: [
        { text: "Nunca", score: 0 },
        { text: "Casi nunca", score: 1 },
        { text: "Algunas veces", score: 2 },
        { text: "A menudo", score: 3 },
        { text: "Muy a menudo", score: 4 },
      ],
    },
    {
        question: "En el último mes, ¿con qué frecuencia te has sentido nervioso o estresado? ",
        options: [
          { text: "Nunca", score: 0 },
          { text: "Casi nunca", score: 1 },
          { text: "Algunas veces", score: 2 },
          { text: "A menudo", score: 3 },
          { text: "Muy a menudo", score: 4 },
        ],
      },
      {
        question: "En el último mes, ¿con qué frecuencia has manejado con éxito los pequeños problemas irritantes de la vida? ",
        options: [
          { text: "Nunca", score: 0 },
          { text: "Casi nunca", score: 1 },
          { text: "Algunas veces", score: 2 },
          { text: "A menudo", score: 3 },
          { text: "Muy a menudo", score: 4 },
        ],
      },
      {
        question: "En el último mes, ¿con qué frecuencia has sentido que has afrontado efectivamente los cambios importantes que han estado ocurriendo en tu vida? ",
        options: [
          { text: "Nunca", score: 0 },
          { text: "Casi nunca", score: 1 },
          { text: "Algunas veces", score: 2 },
          { text: "A menudo", score: 3 },
          { text: "Muy a menudo", score: 4 },
        ],
      },
      {
        question: "En el último mes, ¿con qué frecuencia has estado seguro sobre tu capacidad para manejar tus problemas personales? ",
        options: [
          { text: "Nunca", score: 0 },
          { text: "Casi nunca", score: 1 },
          { text: "Algunas veces", score: 2 },
          { text: "A menudo", score: 3 },
          { text: "Muy a menudo", score: 4 },
        ],
      },
      {
        question: " En el último mes, ¿con qué frecuencia has sentido que las cosas van bien?  ",
        options: [
          { text: "Nunca", score: 0 },
          { text: "Casi nunca", score: 1 },
          { text: "Algunas veces", score: 2 },
          { text: "A menudo", score: 3 },
          { text: "Muy a menudo", score: 4 },
        ],
      },
      {
        question: "En el último mes, ¿con qué frecuencia has sentido que no podías afrontar todas las cosas que tenías que hacer? ",
        options: [
          { text: "Nunca", score: 0 },
          { text: "Casi nunca", score: 1 },
          { text: "Algunas veces", score: 2 },
          { text: "A menudo", score: 3 },
          { text: "Muy a menudo", score: 4 },
        ],
      },
      {
        question: "En el último mes, ¿con qué frecuencia has podido controlar las dificultades de tu vida? ",
        options: [
          { text: "Nunca", score: 0 },
          { text: "Casi nunca", score: 1 },
          { text: "Algunas veces", score: 2 },
          { text: "A menudo", score: 3 },
          { text: "Muy a menudo", score: 4 },
        ],
      },
      {
        question: "En el último mes, ¿con qué frecuencia has sentido que tenías todo bajo control? ",
        options: [
          { text: "Nunca", score: 0 },
          { text: "Casi nunca", score: 1 },
          { text: "Algunas veces", score: 2 },
          { text: "A menudo", score: 3 },
          { text: "Muy a menudo", score: 4 },
        ],
      },
      {
        question: "En el último mes, ¿con qué frecuencia has estado enfadado porque las cosas que te han ocurrido estaban fuera de tu control? ",
        options: [
          { text: "Nunca", score: 0 },
          { text: "Casi nunca", score: 1 },
          { text: "Algunas veces", score: 2 },
          { text: "A menudo", score: 3 },
          { text: "Muy a menudo", score: 4 },
        ],
      },
      {
        question: "¿En el último mes, ¿con qué frecuencia has pensado sobre las cosas que te faltan por hacer? ",
        options: [
          { text: "Nunca", score: 0 },
          { text: "Casi nunca", score: 1 },
          { text: "Algunas veces", score: 2 },
          { text: "A menudo", score: 3 },
          { text: "Muy a menudo", score: 4 },
        ],
      },
      {
        question: "En el último mes, ¿con qué frecuencia has podido controlar la forma de pasar el tiempo?",
        options: [
          { text: "Nunca", score: 0 },
          { text: "Casi nunca", score: 1 },
          { text: "Algunas veces", score: 2 },
          { text: "A menudo", score: 3 },
          { text: "Muy a menudo", score: 4 },
        ],
      },
      {
        question: "En el último mes, ¿con qué frecuencia has sentido que las dificultades se acumulan tanto que no puedes superarlas? ",
        options: [
          { text: "Nunca", score: 0 },
          { text: "Casi nunca", score: 1 },
          { text: "Algunas veces", score: 2 },
          { text: "A menudo", score: 3 },
          { text: "Muy a menudo", score: 4 },
        ],
      },
  ];  

  export const DailyQuestions = [
  {
    question: "¿Cómo te sentiste en control de tu vida hoy?",
    options: [
      {text: "Nada en control", score: 4},
      {text: "Casi nada en control", score: 3},
      {text: "Algo en control", score: 2},
      {text: "Bastante en control", score: 1},
      {text: "Totalmente en control", score: 0}
    ]
  },
  {
    question: "¿Cuánto te preocupaste por cosas fuera de tu control hoy?",
    options: [
      {text: "Me preocupe mucho", score: 4},
      {text: "Me preocupe de mas", score: 3},
      {text: "Me preocupe un poco", score: 2},
      {text: "Me preocupe muy poco", score: 1},
      {text: "No me preocupe", score: 0}
    ]
  },
{
  question: "¿Qué tan capaz te sentiste para manejar las demandas de hoy?",
  options: [
    {text: "Nada capaz", score: 4},
    {text: "Muy poco capaz", score: 3},
    {text: "Algo capaz", score: 2},
    {text: "Un poco capaz", score: 1},
    {text: "Muy capaz", score: 0}
  ]
},
{
  question: "¿Qué tan irritado o frustrado te sentiste durante el día?",
  options: [
    {text: "Muy irritado", score: 4},
    {text: "Bastante irritado", score: 3},
    {text: "Un poco irritado", score: 2},
    {text: "Casi nada irritado", score: 1},
    {text: "Nada irritado", score: 0}
  ]
},
{
  question: "¿Sentiste que las cosas te abrumaron hoy?",
  options: [
    {text: "Demasiado", score: 4},
    {text: "Bastante", score: 3},
    {text: "Un poco", score: 2},
    {text: "Casi nada", score: 1},
    {text: "Nada", score: 0}
  ]
},

]