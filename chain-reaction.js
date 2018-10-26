let socket = io();


function Square(props) {

    let value = props.value;

    if (!value)
        return (
            <div className="square" onClick={props.onClick}>
                {value}
            </div>
        );

    if (value && value.split("-")[0] == 'X')
        return (
            <div className="redSquare" onClick={props.onClick}>
                {value.split("-")[1]}
            </div>
        );
    if (value && value.split("-")[0] == 'O')
        return (
            <div className="greenSquare" onClick={props.onClick}>
                {value.split("-")[1]}
            </div>
        );
}

class Board extends React.Component {
    renderSquare(i, j) {
        return (
            <Square
                value={this.props.squares[i][j]}
                onClick={() => this.props.onClick(i, j)}
            />
        );
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="gametable">
                    <tbody>
                        <tr className="board-row">
                            <td>{this.renderSquare(0, 0)}</td>
                            <td>{this.renderSquare(0, 1)}</td>
                            <td>{this.renderSquare(0, 2)}</td>
                            <td>{this.renderSquare(0, 3)}</td>
                            <td>{this.renderSquare(0, 4)}</td>
                            <td>{this.renderSquare(0, 5)}</td>
                        </tr>
                        <tr className="board-row">
                            <td>{this.renderSquare(1, 0)}</td>
                            <td>{this.renderSquare(1, 1)}</td>
                            <td>{this.renderSquare(1, 2)}</td>
                            <td>{this.renderSquare(1, 3)}</td>
                            <td>{this.renderSquare(1, 4)}</td>
                            <td>{this.renderSquare(1, 5)}</td>
                        </tr>
                        <tr className="board-row">
                            <td>{this.renderSquare(2, 0)}</td>
                            <td>{this.renderSquare(2, 1)}</td>
                            <td>{this.renderSquare(2, 2)}</td>
                            <td>{this.renderSquare(2, 3)}</td>
                            <td>{this.renderSquare(2, 4)}</td>
                            <td>{this.renderSquare(2, 5)}</td>
                        </tr>
                        <tr className="board-row">
                            <td>{this.renderSquare(3, 0)}</td>
                            <td>{this.renderSquare(3, 1)}</td>
                            <td>{this.renderSquare(3, 2)}</td>
                            <td>{this.renderSquare(3, 3)}</td>
                            <td>{this.renderSquare(3, 4)}</td>
                            <td>{this.renderSquare(3, 5)}</td>
                        </tr>
                        <tr className="board-row">
                            <td>{this.renderSquare(4, 0)}</td>
                            <td>{this.renderSquare(4, 1)}</td>
                            <td>{this.renderSquare(4, 2)}</td>
                            <td>{this.renderSquare(4, 3)}</td>
                            <td>{this.renderSquare(4, 4)}</td>
                            <td>{this.renderSquare(4, 5)}</td>
                        </tr>
                        <tr className="board-row">
                            <td>{this.renderSquare(5, 0)}</td>
                            <td>{this.renderSquare(5, 1)}</td>
                            <td>{this.renderSquare(5, 2)}</td>
                            <td>{this.renderSquare(5, 3)}</td>
                            <td>{this.renderSquare(5, 4)}</td>
                            <td>{this.renderSquare(5, 5)}</td>
                        </tr>
                        <tr className="board-row">
                            <td>{this.renderSquare(6, 0)}</td>
                            <td>{this.renderSquare(6, 1)}</td>
                            <td>{this.renderSquare(6, 2)}</td>
                            <td>{this.renderSquare(6, 3)}</td>
                            <td>{this.renderSquare(6, 4)}</td>
                            <td>{this.renderSquare(6, 5)}</td>
                        </tr>
                        <tr className="board-row">
                            <td>{this.renderSquare(7, 0)}</td>
                            <td>{this.renderSquare(7, 1)}</td>
                            <td>{this.renderSquare(7, 2)}</td>
                            <td>{this.renderSquare(7, 3)}</td>
                            <td>{this.renderSquare(7, 4)}</td>
                            <td>{this.renderSquare(7, 5)}</td>
                        </tr>
                        <tr className="board-row">
                            <td>{this.renderSquare(8, 0)}</td>
                            <td>{this.renderSquare(8, 1)}</td>
                            <td>{this.renderSquare(8, 2)}</td>
                            <td>{this.renderSquare(8, 3)}</td>
                            <td>{this.renderSquare(8, 4)}</td>
                            <td>{this.renderSquare(8, 5)}</td>
                        </tr>
                        <tr className="board-row">
                            <td>{this.renderSquare(9, 0)}</td>
                            <td>{this.renderSquare(9, 1)}</td>
                            <td>{this.renderSquare(9, 2)}</td>
                            <td>{this.renderSquare(9, 3)}</td>
                            <td>{this.renderSquare(9, 4)}</td>
                            <td>{this.renderSquare(9, 5)}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        );
    }
}


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(10).fill().map(() => []),
            xIsNext: true,
            myturn: true
        };
    }

    componentWillMount() {


        socket.on('gameon', (newState) => {
            console.log('recevied newstate');
            newState = JSON.parse(newState)
            newState.myturn = true;
            this.setState(newState);
        });

        socket.on('joinroom', (newState) => {
            this.setState({ ...this.state, "participants": newState.participants, "roomNo": newState.roomNo });
        });

        socket.on('createroom', (newState) => {
            this.setState({ ...this.state, "participants": newState.participants, "roomNo": newState.roomNo });
        });

        socket.on('input message', (newState) => {
            console.log('message event received ' + newState);

            var ul = document.getElementById("messages");
            var li = document.createElement("li");
            var children = ul.children.length + 1
            li.setAttribute("id", "element" + children);
            li.setAttribute("class","list-group-item")
            li.appendChild(document.createTextNode(newState));
            ul.appendChild(li)

        });



    }

    handleClick(i, j) {
        console.log('hc Room called');

        let squares = this.state.squares.slice();
        const currentplayer = this.state.xIsNext ? 'X' : 'O';
        //check owner and return if not owner
        if (squares[i][j] && squares[i][j].split("-")[0] !== currentplayer) {
            return;
        }

        if (checkforWinner(squares)) {
            return;
        }

        if (!this.state.myturn) {

            return;
        }

        //Move queued
        if (squares[i][j]) {
            let strArr = squares[i][j].split("-");
            squares[i][j] = strArr[0] + "-" + (Number(strArr[1]) + 1);
        } else {
            squares[i][j] = currentplayer + "-" + "1";
        }

        //Check for explosion and verify winner is handled in componentDidUpdate
        let newSquares = squares;
        let iteration = 0;
        while (newSquares) {
            iteration = iteration + 1;
            newSquares = checkExplosion(this.state.squares);
            if (newSquares)
                squares = newSquares;

            if (iteration > 1000)
                newSquares = null;
        }

        let status = checkforWinner(this.state.squares);


        let newState = {
            squares: squares,
            xIsNext: !this.state.xIsNext,
            status: status
        };

        // let socket = io();

        socket.emit('gameon', JSON.stringify(newState));

        newState.myturn = false;

        this.setState(newState);

    }

    joinRoom() {
        let room = document.getElementById("joinRoomNumber");

        if (room && room.value) {
            socket.emit('joinroom', room.value.trim());
            this.setState({ ...this.state, roomNo: room.value.trim() });
        }
    }

    createRoom() {
        let room = Math.round(Math.random() * 1000000) + "";
        socket.emit('createroom', room);
        this.setState({ ...this.state, roomNo: room });
    }

    sendMessage() {
        let msg = document.getElementById("inputMessage");

        if (msg && msg.value) {
            socket.emit('input message', msg.value);
        }
        msg.value = "";
    }

    enterUsername() {
        let msg = document.getElementById("username");

        if (msg && msg.value) {
            socket.emit('username', msg.value);
            this.setState({ ...this.state, playerName: msg.value });
        }
    }


    render() {

        const current = this.state.squares;

        let status = "";

        if (this.state.myturn) {
            status = 'Your turn'
        } else {
            status = 'Opponents turn'
        }

        status = this.state.status ? this.state.status : status;



        return (


            <div className="container-fluid">

                <div className="row justify-content-center align-items-center">
                    <div className="col-12 col-sm-12 col-md-7 col-lg-6 col-xl-6">
                        <h1 className="text-center">Chain Reaction</h1>
                        <p>Steps to play</p>
                        <ul class="list-group">
                            <li class="list-group-item">Step 1: Enter Player name</li>
                            <li class="list-group-item">Step 2: Joining room ( Click on create room and send the room number to your opponent or if you have a room number enter it to join)</li>
                            <li class="list-group-item">Step 3: Once the both players joined the room you can start the game.</li>
                        </ul>
                    </div>
                </div>

                <div className="row justify-content-center align-items-center">
                    <div className="col-12 col-sm-12 col-md-7 col-lg-5 col-xl-4">

                        {!this.state.playerName &&
                            <div className="form-inline">
                                <label for="PlayerName">Player Name&nbsp;</label>
                                <input className="form-control" type="text" id='username' />
                                <div className="checkbox"> &nbsp;</div>
                                <button className="btn btn-default" id='removebutton' onClick={() => this.enterUsername()}> Enter </button>
                            </div>}
                    </div>
                </div>

                {!this.state.roomNo &&
                    <div className="row" style={{ height: '50px' }} ></div>}

                <div className="row justify-content-center align-items-center">
                    <div className="col-12 col-sm-12 col-md-9 col-lg-7 col-xl-5">

                        {!this.state.roomNo &&
                            <div className="form-inline">
                                <button className="btn btn-default" onClick={() => this.createRoom()}> Create Room </button>
                                <div className="checkbox"> &nbsp;&nbsp;&nbsp; or &nbsp;&nbsp;&nbsp; </div>
                                <input type="text" id='joinRoomNumber' className="form-control" />
                                <div className="checkbox"> &nbsp;</div>
                                <button className="btn btn-default" onClick={() => this.joinRoom()}> Join Room </button>
                            </div>}
                    </div>
                    <p>{this.state.joinRoomStatus} </p>
                </div>

                <div className="row" style={{ height: '50px' }} ></div>

                <div className="row justify-content-center align-items-center">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div className="text-center">
                            <Board
                                squares={current}
                                onClick={(i, j) => this.handleClick(i, j)}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4" >
                        <div className="game-info">

                            <table className=" status table-bordered" >
                                <tbody>
                                    <tr><th colSpan="2" className="text-center">Game Status</th></tr>
                                    <tr><th>Status</th><td>{status}</td></tr>
                                    <tr><th>Player Name</th><td>{this.state.playerName}</td></tr>
                                    <tr><th>Room</th><td>{this.state.roomNo}</td></tr>
                                    <tr><th>Participants</th><td>{this.state.participants}</td></tr>
                                </tbody>
                            </table>
                            <div className="chatArea">
                            <h3 className="text-center">Chat</h3>
                                <ul id="messages" className="list-group list-group-flush"></ul>

                            </div>
                            <div className="input-group">
                            <input type="text" id='inputMessage'  className="form-control" /> 
                            <button className="btn btn-default" onClick={() => this.sendMessage()}> Send </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}


ReactDOM.render(
    <Game />, document.getElementById('root')
);