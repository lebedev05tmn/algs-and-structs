import { readlineInterface } from "../utils/readline";

class Task {
  private bufferSize: number;
  private n: number;
  private maxTime: number | undefined;
  private arrival: Array<number>;
  private duration: Array<number>;
  private result: Array<number | string>;
  private currentTime: number;
  private buffer: Array<{ arrival: number; duration: number }>;

  constructor() {
    this.bufferSize = 0;
    this.maxTime = undefined;
    this.n = 0;
    this.arrival = [];
    this.duration = [];
    this.result = [];
    this.currentTime = 0;
    this.buffer = [];
    
    this.read(); // инициализация таски
  }

  getRandom() {
    return Math.floor(Math.random() * (11)) > 3;
  }

  getAnswer() {
    let index = 0;

    while (index < this.n || this.buffer.length > 0) {
      while (index < this.n && this.arrival[index] <= this.currentTime) {
        if(this.maxTime ? this.getRandom() : true) {
        if (this.buffer.length < this.bufferSize && (this.maxTime ? this.duration[index] <= this.maxTime : true)) {
          this.buffer.push({
            arrival: this.arrival[index],
            duration: this.duration[index],
          });
          this.result[index] = this.currentTime;
        } else {
          this.result[index] = -1;
        }
      }else {
        this.result[index] = 'Упал'
      }
        index++;
      }

      if (this.buffer.length > 0) {
        const packet = this.buffer.shift();
        if (packet) {
          this.currentTime += packet.duration;
        }
      } else {
        if (index < this.n) {
          this.currentTime = this.arrival[index];
        }
      }
    }

    this.result.forEach((start) => {
      console.log(start);
    });
  }

  read() {
    readlineInterface.question("", (length: string) => {
      this.bufferSize = Number(length.split(" ")[0]);
      this.n = Number(length.split(" ")[1]);
      this.maxTime = Number(length.split(" ")[2]);

      if (
        isNaN(this.bufferSize) ||
        this.bufferSize <= 0 ||
        isNaN(this.n) ||
        this.n < 0
      ) {
        console.log("Пожалуйста, введите корректное положительное число.");
        readlineInterface.close();
        return;
      }

      this.arrival = [];
      this.duration = [];

      const readPackets = (count: number) => {
        if (count === 0) {
          this.getAnswer();
          readlineInterface.close();
          return;
        }

        readlineInterface.question("", (packet: string) => {
          const [arrival, duration] = packet.split(" ").map(Number);
          this.arrival.push(arrival);
          this.duration.push(duration);
          readPackets(count - 1);
        });
      };

      readPackets(this.n);
    });
  }
}

export default Task;
