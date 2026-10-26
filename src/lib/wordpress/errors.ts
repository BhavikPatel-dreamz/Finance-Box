export class GraphQLConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GraphQLConfigError";
  }
}

export class GraphQLRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GraphQLRequestError";
  }
}
