const { Queue, Node, LinkedList, BinarySearchTree } = require("./DS.js");

// Implementar la función countProps: a partir de un objeto en el cual cada propiedad puede contener
// cualquier tipo de dato, determinar la cantidad de propiedades de objetos en cualquier nivel, ya sea el inicial
// u objetos anidados

var countProps = function (obj) {
  // Tu código aca:
  if (typeof obj !== "object") return 0;

  let count = 0;
  for (const key in obj) {
    count++;

    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      count = count + countProps(obj[key]);
    }
  }

  return count;
};

// Ejemplo:

// var obj1 = {
//   a: 1,
//   b: 2,
// };

// var obj2 = {
//   a: {
//     a1: 10,
//     a2: "Franco",
//     a3: { f: "r", a: "n", c: { o: true } },
//   },
//   b: 2,
//   c: [1, { a: 1 }, "Franco"],
// };
// console.log("countProps: ", countProps(obj1)); //2
// console.log("countProps: ", countProps(obj2)); //10

// countProps(obj2)--> Deberia devolver 10 ya que el objeto inicial tiene 3 propiedades, pero a su vez
// dentro de a tenemos 3 propiedades mas, luego a3 tiene otras 3 y por ultimo c tiene una extra.
// Propiedades: a, a1, a2, a3, f, a, c, o, b, c --> 10 en total

// --------------------------------------------------------------------------------------------------------------------

// Implementar el método changeNotNumbers dentro del prototype de LinkedList que deberá cambiar
// aquellos valores que no puedan castearse a numeros por 'Kiricocho' y devolver la cantidad de cambios que hizo
// Aclaracion: si el valor del nodo puede castearse a número NO hay que reemplazarlo
// Ejemplo 1:
//    Suponiendo que la lista actual es: Head --> [1] --> ['2'] --> [false] --> ['Franco']
//    lista.changeNotNumbers();
//    Ahora la lista quedaría: Head --> [1] --> ['2'] --> [false] --> ['Kirikocho'] y la función debería haber devuelto el valor 1

LinkedList.prototype.changeNotNumbers = function () {
  // Tu código aca:
  // si el value no se puede castear (convertir a numero) cambiar por 'Kiricocho' y retornar los cambios que se hicieron
  let current = this.head;
  let count = 0;

  while (current) {
    if (Number.isNaN(Number(current.value))) {
      current.value = "Kiricocho";
      count++;
    }

    current = current.next;
  }

  return count;
};

// var listOne = new LinkedList();
// listOne.add(1);
// listOne.add("2");
// listOne.add(false);
// listOne.add("Franco");
// console.log(
//   "listOne: ",
//   listOne.head.value +
//     " " +
//     listOne.head.next.value +
//     " " +
//     listOne.head.next.next.value +
//     " " +
//     listOne.head.next.next.next.value
// );
// console.log("changeNotNumbers: ", listOne.changeNotNumbers());
// console.log(
//   "listOne: ",
//   listOne.head.value +
//     " " +
//     listOne.head.next.value +
//     " " +
//     listOne.head.next.next.value +
//     " " +
//     listOne.head.next.next.next.value
// );

// var listTwo = new LinkedList();
// listTwo.add("Franco");
// listTwo.add("2a");
// listTwo.add(null);
// listTwo.add({ a: 1 });
// console.log(
//   "listTwo: ",
//   listTwo.head.value +
//     " " +
//     listTwo.head.next.value +
//     " " +
//     listTwo.head.next.next.value +
//     " " +
//     listTwo.head.next.next.next.value
// );
// console.log("changeNotNumbers: ", listTwo.changeNotNumbers());
// console.log(
//   "listTwo: ",
//   listTwo.head.value +
//     " " +
//     listTwo.head.next.value +
//     " " +
//     listTwo.head.next.next.value +
//     " " +
//     listTwo.head.next.next.next.value
// );

// --------------------------------------------------------------------------------------------------------------------

// Implementar la función mergeQueues que a partir de dos queues recibidas por parametro
// debe devolver una nueva Queue que vaya mergeando los nodos de las anteriores.
// Ejemplo:
// - queueOne: [7,3,5]
// - queueTwo: [2,4,6]
// mergeQueues(queueOne, queueTwo) --> [7,2,3,4,5,6]
// IMPORTANTE: NO son arreglos sino que son Queues.

var mergeQueues = function (queueOne, queueTwo) {
  // Tu código aca:
  let queue = new Queue();
  for (let i = 0; i < queueOne.size(); i++) {
    queue.enqueue(queueOne.array[i]);
  }
  for (let i = 0; i < queueTwo.size(); i++) {
    queue.enqueue(queueTwo.array[i]);
  }
  return queue;
};

// let queueOne = new Queue(); //[1,3,5,7,9]
// queueOne.enqueue(1);
// queueOne.enqueue(3);
// queueOne.enqueue(5);
// queueOne.enqueue(7);
// queueOne.enqueue(9);
// let queueTwo = new Queue(); //[2,4,6]
// queueTwo.enqueue(2);
// queueTwo.enqueue(4);
// queueTwo.enqueue(6);

// console.log("mergeQueues: ", mergeQueues(queueOne, queueTwo)); //[1,2,3,4,5,6,7,9]

// --------------------------------------------------------------------------------------------------------------------

// Implementar la funcion closureMult que permita generar nuevas funciones que representen
// las tablas de multiplicación de distintos numeros
// Ejemplo:
// - var multByFour = closureMult(4);
// - multByFour(2) --> 8 (2 * 4)
// - multByFour(5) --> 20
// - var multBySix = closureMult(6);
// - multBySix(4) --> 24

var closureMult = function (x) {
  // Tu código aca:
  return function (y) {
    return x * y;
  };
};

// var multByFour = closureMult(4);
// console.log("multByFour: ", multByFour(2));
// console.log("multByFour: ", multByFour(5));
// var multBySix = closureMult(6);
// console.log("multBySix: ", multBySix(4));

// ----- Closures -----

// Implementar la función closureDetect que recibe como parámetro:
//  - Un array (symptoms) que va a contener en cada posición un string representando un
//    síntoma médico de alguna enfermedad
//  - Un número (min) que va a indicar la cantidad mínima de síntomas que debe tener un
//    paciente para considerar que posee la enfermedad
// Ejemplos:
//   var symptoms = ['fever', 'dry cough', 'tiredness', 'sore throat', 'diarrhoea', 'loss of taste', 'loss of smell'];
//   var covidDetector = closureDetect(symptoms, 3);
//
// var personOne = {
//   name: 'Franco',
//   age: 26,
//   symptoms: ['fever', 'congestion', 'loss of taste', 'tiredness']
// }
//
// var personTwo = {
//   name: 'Toni',
//   age: 30,
//   symptoms: ['congestion', 'tiredness']
// }
//
//   covidDetector(personOne); --> true
//   covidDetector(personTwo); --> false
//  [Observar los tests para otros casos]

function closureDetect(symptoms, min) {
  // Tu código aca:
  function findSymptom(sintoma) {
    return symptoms.find((symptom) => symptom === sintoma);
  }

  return function (person) {
    let countSymptoms = 0;
    for (let i = 0; i < person.symptoms.length; i++) {
      if (findSymptom(person.symptoms[i])) countSymptoms++;
    }
    return countSymptoms >= min;
  };
}

// var symptoms = [
//   "fever",
//   "dry cough",
//   "tiredness",
//   "sore throat",
//   "diarrhoea",
//   "loss of taste",
//   "loss of smell",
// ];

// var covidDetector = closureDetect(symptoms, 3);

// var personOne = {
//   name: "Franco",
//   age: 26,
//   symptoms: ["fever", "congestion", "loss of taste", "tiredness"],
// };

// var personTwo = {
//   name: "Toni",
//   age: 30,
//   symptoms: ["congestion", "tiredness"],
// };

// console.log("person one ", covidDetector(personOne)); //--> true
// console.log("person two ", covidDetector(personTwo)); //--> false
