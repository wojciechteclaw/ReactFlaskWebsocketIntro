from flask import Flask
from flask_socketio import SocketIO, emit, send

# https://flask-socketio.readthedocs.io/en/latest/getting_started.html#rooms
app = Flask(__name__)
app.config["SECTET_KEY"] = 'dawdawdawd'
app.debug = True

socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('connect')
def test_connect():
    emit('connection', 'ok')
    print('New client connected')
    # event, message
    # emit('event', 'message')

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')
    
@socketio.on("message")
def handleMessage(msg):
    print(msg)
    # emit('message', msg)
    send(msg, broadcast=True)
    return None

@socketio.event
def click():
    print("---click---")
    send("done a click")
    return None

if __name__ == "__main__":
    socketio.run(app, port = 5000, host="0.0.0.0")