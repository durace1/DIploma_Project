import { ChallengerService, Heartbeat, ToDosService } from './index';

export class ApiPage {
    constructor(request) {
        this.request = request;
        this.challenger = new ChallengerService(request);
        this.todos = new ToDosService(request);
        this.heartbeat = new Heartbeat(request);
    }
}