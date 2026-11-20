export class NotConnectedError extends Error {
  constructor(endpoint: string) {
    super(`HTTP adapter endpoint '${endpoint}' is not connected in this phase.`);
    this.name = 'NotConnectedError';
  }
}

export class SimulationError extends Error {
  constructor(reason: 'failed' | 'offline' | 'limit') {
    super(`Simulated API error: ${reason}`);
    this.name = 'SimulationError';
  }
}
