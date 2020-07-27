//The state machine used in the game. Credit to Nathan (I believe)

class StateMachine {
    constructor(initialState, possibleStates, stateArgs=[]) {
        this.initialState = initialState;
        this.possibleStates = possibleStates;
        this.stateArgs = stateArgs;
        this.state = null;

        for (const state of Object.values(this.possibleStates)){
            this.StateMachine = this;
        }
    }

    step() {
        if (this.state === null) {
            this.state = this.initialState
            this.possibleStates[this.state].enter(...this.stateArgs);
        }

        this.possibleStates[this.state].execute(...this.stateArgs);
    }

    transition(newState, ...enterArgs) {
        this.state = newState;
        this.possibleStates[this.state].enter(...this.stateArgs, ...enterArgs);
    }
}

class State {
    enter() {}
    execute() {}
}