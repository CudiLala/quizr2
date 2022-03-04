export class SignUpError extends Error {
  message: string;
  constructor(name: string, message: string) {
    super();
    this.message = message;
    this.name = name;
  }
}
